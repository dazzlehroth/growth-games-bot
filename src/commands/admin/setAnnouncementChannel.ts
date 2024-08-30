import {
    ChatInputCommandInteraction,
    SlashCommandBuilder
} from "discord.js";
import {getGuildSettingsObject} from "../../hooks/useDBObjects";
module.exports = {
    data: new SlashCommandBuilder()
        .setName('setannouncementchannel')
        .setDescription('Sets the channel for event announcements'),

    async execute(interaction: ChatInputCommandInteraction): Promise<void> {


        const guildId = interaction.guild!.id;

        let serverSettings = await getGuildSettingsObject(guildId)



        await interaction.reply(interaction.channelId)


    }
}