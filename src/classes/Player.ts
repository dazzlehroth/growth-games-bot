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

    grow(value: number) {

        this.height = value * this.changeFactor

    }

    constructor(data: UserData) {

        this.id = data.id;
        this.discordUserID = data.discord_user_id
        this.guildID = data.guild_id
        this.height = data.height
        this.changePref = data.change_pref
        this.changeFactor = data.change_factor
        this.dickSize = data.dick_size
        this.ballSize = data.ball_size

    }


}


interface UserData {
    id: number
    discord_user_id: number
    guild_id: number
    height: number
    change_pref: ChangePreference
    change_factor: number
    dick_size: junkSize
    ball_size: junkSize
}