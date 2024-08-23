import {CommandInteraction, SlashCommandBuilder} from "discord.js";
import {dbSelectRowSingle} from "../../hooks/useDatabase";

module.exports = {
    data: new SlashCommandBuilder()
        .setName('getheight')
        .setDescription('Replies with current height'),
    async execute(interaction: CommandInteraction): Promise<void> {

        const userId = interaction.user.id;

        let user:any = await dbSelectRowSingle('players', {discord_user_id: userId});

        if (user === null || user === undefined) {
            await interaction.reply('Player Not found')
        } else {
            await interaction.reply(`Your current height is ${user.height} "Generic Height Units"`)
        }


    }
}