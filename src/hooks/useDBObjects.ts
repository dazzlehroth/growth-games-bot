import {Player} from "../classes/Player";
import {dbSelectRowsAll, dbSelectRowSingle} from "./useDatabase";
import {DatabaseGuildSettingsRecord, GuildSettings} from "../classes/GuildSettings";

export async function getPlayerObject(discordPlayerId:string, guildId: string): Promise<Player> {

    return new Promise<Player>(async(resolve, reject) => {

        try{
            let playerDBRecord = await dbSelectRowSingle('players',{'discordUserId': discordPlayerId, 'guildId': guildId })as Object ;
            const playerObject= new Player(playerDBRecord)
            resolve(playerObject);

        } catch (e) {
            console.error(e)
            reject()
        }

    })

}

export async function getGuildPlayers(guildId:string, conditions:Object = {}): Promise<Array<Player>> {
    return new Promise<Array<Player>>(async(resolve, reject) => {

        try {

            conditions = {...conditions, guildId};
            let playerRecords = await dbSelectRowsAll('players', conditions) as Array<Object>


            let playerObjects: Array<Player> = [];
            playerRecords.map((playerRecordSingle:Object) => {
                playerObjects.push(new Player(playerRecordSingle))
            })

            resolve(playerObjects);
        } catch (e) {
            console.log(e)
            reject();
        }

    })

}


export async function getGuildSettingsObject(guildId: string): Promise<GuildSettings> {

    return new Promise<GuildSettings>(async(resolve, reject) => {

        try{
            let settingsRecords = await dbSelectRowsAll('guildSettings',{'guildId': guildId }) as Array<DatabaseGuildSettingsRecord> ;

            console.log(settingsRecords);

            const settingsObject = new GuildSettings(settingsRecords, guildId)

            resolve(settingsObject);

        } catch (e) {
            console.error(e)
            reject()
        }


    })

}