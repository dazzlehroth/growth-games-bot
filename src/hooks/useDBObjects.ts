import {Player} from "../classes/Player";
import {dbSelectRow} from "./useDatabase";

export async function getPlayerObject(discordPlayerId:number, guildId: number): Promise<Player|null> {

    return new Promise<null|Player>(async(resolve, reject) => {

        try{
            let playerDBRecord = await dbSelectRow('Players',{'discord_user_id': discordPlayerId, 'guild_id': guildId })as Object ;


            const playerObject= new Player(playerDBRecord)

            resolve(playerObject);

        } catch (e) {
            console.error(e)
            reject()
        }


    })

}