import {CommandInteraction, SlashCommandBuilder} from "discord.js";
import {dbInsert, dbSelectObject} from "../../hooks/useDatabase";

module.exports = {
    data: new SlashCommandBuilder()
        .setName('register')
        .setDescription('Enters you into the growth games'),
    async execute(interaction: CommandInteraction): Promise<void> {

        const userId = interaction.user.id;
        const guildId = interaction.guild!.id;

        if (guildId === null) {
            await interaction.reply(`Could not identify which server you are on`)
            return ;
        }

        let user:any = await dbSelectObject('users', {discord_user_id: userId, guild_id: guildId});

        if (user === null || user === undefined) {
            //User not Found, add them

            await dbInsert('players', {discord_user_id: userId, guild_id: guildId});



        } else {
            await interaction.reply(`You are already registered on this server"`)
        }

    }
}