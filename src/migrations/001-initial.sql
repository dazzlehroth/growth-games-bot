

-- Players Table
CREATE TABLE IF NOT EXISTS players ('id' INTEGER primary key autoincrement , 'discordUserID' TEXT, 'guildID' TEXT, 'height' integer default 6, 'changePref' INT default 1, 'changeFactor' REAL default 1, 'dickSize' INT DEFAULT 3, 'ballSize' INT default 3);
CREATE INDEX IF NOT EXISTS guildIDIndex ON players(guildID);
CREATE UNIQUE INDEX IF NOT EXISTS  userGuildIndex on players(guildID, discordUserID);
CREATE INDEX IF NOT EXISTS userPrefIndex on players(guildID, changePref);

-- Guild Settings Table
CREATE TABLE IF NOT EXISTS guildSettings ('id' INTEGER primary key autoincrement , 'guildId' TEXT, 'property' TEXT, 'stringValue' TEXT, intValue INT, boolVal INT);
CREATE INDEX IF NOT EXISTS guildIDIndex ON guildSettings(guildId);
CREATE UNIQUE INDEX IF NOT EXISTS guildPropertyIndex on guildSettings(guildId, property)