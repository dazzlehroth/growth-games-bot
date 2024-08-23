import {dbUpdateRecordByID} from "../hooks/useDatabase";

enum ChangePreference {
    remain,
    grow,
    shrink
}

enum junkSize {
    micro,
    small,
    medium,
    large,
    hyper
}


export class Player {

    id = 0
    discordUserID = 0
    guildID = 0
    height = 0
    changePref: ChangePreference = 1
    changeFactor = 1
    dickSize: junkSize = 3
    ballSize: junkSize = 3

    async grow(value: number) {
        return new Promise<number>(async(resolve, reject) => {

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

        constructor(data:Object)

        {

            Object.assign(this, data)

        }


    }
