import {dbUpdateRecordByID} from "../hooks/useDatabase";
import {ChangePreference, junkSize} from "./Enums";

export class Player {

    id = 0
    discordUserID = 0
    guildID = 0
    height = 0
    changePref: ChangePreference = 1
    changeFactor = 1
    dickSize: junkSize = 3
    ballSize: junkSize = 3
    chestSize: junkSize = 3
    assSize: junkSize = 3

    async grow(value: number) {
        return new Promise<number>(async (resolve, reject) => {

            const newHeight = this.height + (value * this.changeFactor)

            try {
                await dbUpdateRecordByID('players', this.id, {height: newHeight})
                this.height = newHeight
                resolve(newHeight)
            } catch (e) {
                reject();
            }


        })
    }

    async adjustJunk(part: number, newSize: number) {
        return new Promise<void>(async (resolve, reject) => {

            let dbField = ""

            switch (part) {
                case 1:
                    this.dickSize = newSize
                    dbField = "dickSize"
                    break;
                case 2:
                    this.ballSize = newSize
                    dbField = "ballSize"
                    break;
                case 3:
                    this.chestSize = newSize
                    dbField = "chestSize"
                    break;
                case 4:
                    this.assSize = newSize
                    dbField = "assSize"
                    break;
                default:
                    reject();
                    return;

            }

            try {
                await dbUpdateRecordByID('players', this.id, {[dbField]: newSize})
                resolve()
            } catch (e) {
                reject();
            }


        })


    }

    constructor(data: Object) {

        Object.assign(this, data)

    }


}
