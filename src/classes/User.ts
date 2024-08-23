export class User {

    id = 0
    user_id = 0
    guild_id = 0
    height = 0

    constructor(data: UserData) {
        Object.assign(this, data)
    }

}

interface UserData {
    id: number
    user_id: number
    guild_id: number
    height: number
}