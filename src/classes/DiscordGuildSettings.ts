export class DiscordGuildSettings {


    discordGuidId = "";
    maxHeight = 10
    minHeight = 1






    constructor(settingsArray : Array<DatabaseGuildSettingsRecord>, guildId : string) {

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


}

export interface DatabaseGuildSettingsRecord{
    guildId: string;
    property: string;
    stringValue: string;
    intValue: number;
    boolValue: number;

}