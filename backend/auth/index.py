import json
import os
import hashlib
import secrets
import psycopg
from psycopg import ClientCursor

SCHEMA = "t_p80067751_orange_thunder_crmp_"

def get_conn():
    return psycopg.connect(os.environ["DATABASE_URL"], cursor_factory=ClientCursor)

def hash_password(password: str) -> str:
    return hashlib.sha256(password.encode()).hexdigest()

def handler(event: dict, context) -> dict:
    """Регистрация и вход игроков ГРОЗА МОБАЙЛ"""
    headers = {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type, X-Session-Token",
    }

    if event.get("httpMethod") == "OPTIONS":
        return {"statusCode": 200, "headers": headers, "body": ""}

    method = event.get("httpMethod", "GET")
    body = json.loads(event.get("body") or "{}")
    action = body.get("action")

    conn = get_conn()
    cur = conn.cursor()

    # Регистрация
    if method == "POST" and action == "register":
        nickname = (body.get("nickname") or "").strip()
        password = body.get("password") or ""

        if not nickname or len(nickname) < 3:
            cur.close(); conn.close()
            return {"statusCode": 400, "headers": headers, "body": json.dumps({"error": "Никнейм должен быть не менее 3 символов"})}
        if len(password) < 6:
            cur.close(); conn.close()
            return {"statusCode": 400, "headers": headers, "body": json.dumps({"error": "Пароль должен быть не менее 6 символов"})}

        cur.execute(f"SELECT id FROM {SCHEMA}.users WHERE nickname = %s", (nickname,))
        if cur.fetchone():
            cur.close(); conn.close()
            return {"statusCode": 409, "headers": headers, "body": json.dumps({"error": "Такой никнейм уже занят"})}

        token = secrets.token_hex(32)
        pw_hash = hash_password(password)
        cur.execute(
            f"INSERT INTO {SCHEMA}.users (nickname, password_hash, session_token) VALUES (%s, %s, %s) RETURNING id",
            (nickname, pw_hash, token)
        )
        user_id = cur.fetchone()[0]
        conn.commit()
        cur.close(); conn.close()

        return {"statusCode": 200, "headers": headers, "body": json.dumps({
            "ok": True,
            "token": token,
            "user": {"id": user_id, "nickname": nickname, "level": 1, "xp": 0, "balance": 10000, "hours_played": 0, "rating": 0}
        })}

    # Вход
    if method == "POST" and action == "login":
        nickname = (body.get("nickname") or "").strip()
        password = body.get("password") or ""
        pw_hash = hash_password(password)

        cur.execute(
            f"SELECT id, nickname, level, xp, balance, hours_played, rating FROM {SCHEMA}.users WHERE nickname = %s AND password_hash = %s",
            (nickname, pw_hash)
        )
        row = cur.fetchone()
        if not row:
            cur.close(); conn.close()
            return {"statusCode": 401, "headers": headers, "body": json.dumps({"error": "Неверный никнейм или пароль"})}

        token = secrets.token_hex(32)
        cur.execute(f"UPDATE {SCHEMA}.users SET session_token = %s WHERE id = %s", (token, row[0]))
        conn.commit()
        cur.close(); conn.close()

        return {"statusCode": 200, "headers": headers, "body": json.dumps({
            "ok": True,
            "token": token,
            "user": {"id": row[0], "nickname": row[1], "level": row[2], "xp": row[3], "balance": row[4], "hours_played": row[5], "rating": row[6]}
        })}

    # Проверка сессии
    if method == "GET":
        token = (event.get("headers") or {}).get("X-Session-Token") or (event.get("queryStringParameters") or {}).get("token")
        if not token:
            cur.close(); conn.close()
            return {"statusCode": 401, "headers": headers, "body": json.dumps({"error": "Нет токена"})}

        cur.execute(
            f"SELECT id, nickname, level, xp, balance, hours_played, rating FROM {SCHEMA}.users WHERE session_token = %s",
            (token,)
        )
        row = cur.fetchone()
        cur.close(); conn.close()
        if not row:
            return {"statusCode": 401, "headers": headers, "body": json.dumps({"error": "Сессия истекла"})}

        return {"statusCode": 200, "headers": headers, "body": json.dumps({
            "ok": True,
            "user": {"id": row[0], "nickname": row[1], "level": row[2], "xp": row[3], "balance": row[4], "hours_played": row[5], "rating": row[6]}
        })}

    cur.close(); conn.close()
    return {"statusCode": 400, "headers": headers, "body": json.dumps({"error": "Неверный запрос"})}