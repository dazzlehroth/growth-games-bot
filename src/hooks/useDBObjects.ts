import {Player} from "../classes/Player";
import {dbSelectRowsAll, dbSelectRowSingle} from "./useDatabase";
import {DatabaseGuildSettingsRecord, DiscordGuildSettings} from "../classes/DiscordGuildSettings";

export async function getPlayerObject(discordPlayerId:string, guildId: string): Promise<Player> {

    return new Promise<Player>(async(resolve, reject) => {

        try{
            let playerDBRecord = await dbSelectRowSingle('players',{'discordUserId': discordPlayerId, 'guildId': guildId })as Object ;

            console.log(playerDBRecord);

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
            // console.log(playerRecords);

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


export async function getDiscordGuildSettingsObject(guildId: string): Promise<DiscordGuildSettings> {

    return new Promise<DiscordGuildSettings>(async(resolve, reject) => {

        try{
            let settingsRecords = await dbSelectRowsAll('guildSettings',{'guildId': guildId }) as Array<DatabaseGuildSettingsRecord> ;

            console.log(settingsRecords);

            const settingsObject = new DiscordGuildSettings(settingsRecords, guildId)

            resolve(settingsObject);

        } catch (e) {
            console.error(e)
            reject()
        }


    })

}