import json
import os
import hashlib
import psycopg
from psycopg import ClientCursor

SCHEMA = "t_p80067751_orange_thunder_crmp_"

def get_conn():
    return psycopg.connect(os.environ["DATABASE_URL"], cursor_factory=ClientCursor)

def handler(event: dict, context) -> dict:
    """Админ-панель ГРОЗА МОБАЙЛ: список игроков, удаление, статистика"""
    headers = {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET, POST, DELETE, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type, X-Admin-Token",
    }

    if event.get("httpMethod") == "OPTIONS":
        return {"statusCode": 200, "headers": headers, "body": ""}

    admin_password = os.environ.get("ADMIN_PASSWORD", "")
    admin_token = hashlib.sha256(admin_password.encode()).hexdigest() if admin_password else ""

    req_token = (event.get("headers") or {}).get("X-Admin-Token", "")
    if req_token != admin_token or not admin_token:
        return {"statusCode": 403, "headers": headers, "body": json.dumps({"error": "Нет доступа"})}

    method = event.get("httpMethod", "GET")
    body = json.loads(event.get("body") or "{}")
    conn = get_conn()
    cur = conn.cursor()

    if method == "GET":
        cur.execute(
            f"SELECT id, nickname, level, xp, balance, hours_played, rating, created_at FROM {SCHEMA}.users ORDER BY created_at DESC"
        )
        rows = cur.fetchall()
        cur.execute(f"SELECT COUNT(*) FROM {SCHEMA}.users")
        total = cur.fetchone()[0]
        cur.close(); conn.close()

        users = [
            {
                "id": r[0],
                "nickname": r[1],
                "level": r[2],
                "xp": r[3],
                "balance": r[4],
                "hours_played": r[5],
                "rating": r[6],
                "created_at": r[7].isoformat() if r[7] else None,
            }
            for r in rows
        ]
        return {"statusCode": 200, "headers": headers, "body": json.dumps({"ok": True, "users": users, "total": total})}

    if method == "DELETE":
        user_id = body.get("user_id")
        if not user_id:
            cur.close(); conn.close()
            return {"statusCode": 400, "headers": headers, "body": json.dumps({"error": "user_id обязателен"})}
        cur.execute(f"DELETE FROM {SCHEMA}.users WHERE id = {int(user_id)}")
        conn.commit()
        cur.close(); conn.close()
        return {"statusCode": 200, "headers": headers, "body": json.dumps({"ok": True})}

    if method == "POST":
        action = body.get("action")
        user_id = body.get("user_id")
        if action == "reset_balance" and user_id:
            cur.execute(f"UPDATE {SCHEMA}.users SET balance = 10000 WHERE id = {int(user_id)}")
            conn.commit()
        elif action == "set_level" and user_id:
            level = int(body.get("level", 1))
            cur.execute(f"UPDATE {SCHEMA}.users SET level = {level} WHERE id = {int(user_id)}")
            conn.commit()
        cur.close(); conn.close()
        return {"statusCode": 200, "headers": headers, "body": json.dumps({"ok": True})}

    cur.close(); conn.close()
    return {"statusCode": 400, "headers": headers, "body": json.dumps({"error": "Неверный запрос"})}
