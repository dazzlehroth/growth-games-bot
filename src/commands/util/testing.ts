import {CommandInteraction, SlashCommandBuilder} from "discord.js";
import {dbInsert} from "../../hooks/useDatabase";
import {getDiscordGuildSettingsObject, getGuildPlayers} from "../../hooks/useDBObjects";

module.exports = {
    data: new SlashCommandBuilder()
        .setName('testcommand')
        .setDescription('Does Whatever things I am wanting to test, DO NOT INCLUDE IN LIVE BUILDS'),
    async execute(interaction: CommandInteraction): Promise<void> {

        // const settingsObject = await getDiscordGuildSettingsObject(interaction.guild!.id)
        // console.log(settingsObject)

        const players = await getGuildPlayers(interaction.guild!.id, {changePref: 1})

        console.log(players)

        await interaction.reply('Did it, I think? Tried my best at least')

    }
}