CREATE TABLE t_p80067751_orange_thunder_crmp_.users (
  id SERIAL PRIMARY KEY,
  nickname VARCHAR(50) NOT NULL UNIQUE,
  password_hash VARCHAR(255) NOT NULL,
  session_token VARCHAR(255),
  level INTEGER DEFAULT 1,
  xp INTEGER DEFAULT 0,
  balance INTEGER DEFAULT 10000,
  hours_played INTEGER DEFAULT 0,
  rating INTEGER DEFAULT 0,
  created_at TIMESTAMP DEFAULT NOW()
);