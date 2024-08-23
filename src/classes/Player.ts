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

    databaseID = 0
    discordUserID = 0
    guildID = 0
    height = 0
    changePref: ChangePreference = 1
    changeFactor = 1
    dickSize: junkSize = 3
    ballSize: junkSize = 3

    grow(value: number) {

        this.height = value * this.changeFactor

    }

    constructor(data: Object) {

        Object.assign(this, data)

    }


}

