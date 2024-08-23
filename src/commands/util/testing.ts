import {CommandInteraction, SlashCommandBuilder} from "discord.js";

module.exports = {
    data: new SlashCommandBuilder()
        .setName('testgrow')
        .setDescription('Replies with test growth'),
    async execute(interaction: CommandInteraction): Promise<void> {
       await interaction.reply('**zapp!**')
    }
}