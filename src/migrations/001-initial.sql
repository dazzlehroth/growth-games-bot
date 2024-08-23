CREATE TABLE IF NOT EXISTS players ('id' INTEGER primary key autoincrement , 'discord_user_id' INTEGER, 'guild_id' INTEGER, 'height' integer default 6, 'change_pref' INT default 1, 'change_factor' REAL default 1, 'dick_size' INT DEFAULT 3, 'ball_size' INT default 3);
CREATE INDEX IF NOT EXISTS guild_id_index ON players(guild_id);
CREATE UNIQUE INDEX IF NOT EXISTS  user_guild_index on players(guild_id, discord_user_id);
CREATE INDEX IF NOT EXISTS user_pref_index on players(guild_id, change_pref);

CREATE TABLE IF NOT EXISTS guild_settings ('id' INTEGER primary key autoincrement , 'guild_id' INTEGER, 'property' TEXT, 'string_value' TEXT, int_value INT);
CREATE INDEX IF NOT EXISTS guild_id_index ON guild_settings(guild_id);