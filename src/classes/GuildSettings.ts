import {dbInsert, dbSelectRowSingle} from "../hooks/useDatabase";

export class GuildSettings {


    discordGuidId: string;
    announcementChannel?: string = undefined;
    maxHeight = 10
    minHeight = 1


    constructor(settingsArray: Array<DatabaseGuildSettingsRecord>, guildId: string) {

        this.discordGuidId = guildId;

        for (let setting of settingsArray) {

            console.log(setting);

            if (!(setting.property in this))
                continue;

            if (setting.stringValue !== null) {
                // @ts-ignore
                this[setting.property] = setting.stringValue;
                continue;
            }

            if (setting.intValue !== null) {
                // @ts-ignore
                this[setting.property] = setting.intValue;
                continue;
            }

            if (setting.boolValue !== null) {
                // @ts-ignore
                this[setting.property] = Boolean(setting.boolValue);
            }

        }


    }


    setAnnouncementChannel = async (channelID: string): Promise<void> => {
        return new Promise<void>(async (resolve, reject) => {

            this.announcementChannel = channelID;

            let existingRecord = await dbSelectRowSingle('discordGuildSettings', {
                guildId: this.discordGuidId,
                property: "announcementChannel"
            });

            //Property was not set create a new record
            if (existingRecord === undefined) {
                await dbInsert('discordGuildSettings', {
                    guildId: this.discordGuidId,
                    property: "announcementChannel",
                    stringValue: channelID
                });
                resolve();
            } else {
                console.error("MAKE DB UPDATE METHOD YOU DINGUS")
                reject();
            }


        })
    }


}

export interface DatabaseGuildSettingsRecord {
    guildId: string;
    property: string;
    stringValue: string;
    intValue: number;
    boolValue: number;

}