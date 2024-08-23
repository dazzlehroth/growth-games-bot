import {CommandInteraction, SlashCommandBuilder} from "discord.js";
import {dbInsert} from "../../hooks/useDatabase";

module.exports = {
    data: new SlashCommandBuilder()
        .setName('testgrow')
        .setDescription('Replies with test growth'),
    async execute(interaction: CommandInteraction): Promise<void> {
       await interaction.reply('**zapp!**')


        let dataToInsert = {
           user_id: interaction.user.id,// @ts-ignore
            guild_id: interaction.guild.id ?? null,
            height: 4
        }


        dbInsert('users', dataToInsert)

    }
}