import {CommandInteraction, SlashCommandBuilder} from "discord.js";
import {dbSelectRowSingle} from "../../hooks/useDatabase";
import {getPlayerObject} from "../../hooks/useDBObjects";

module.exports = {
    data: new SlashCommandBuilder()
        .setName('getheight')
        .setDescription('Replies with current height'),
    async execute(interaction: CommandInteraction): Promise<void> {

        const userID = interaction.user.id;
        const guildID = interaction.guild!.id;
        try  {
            const player = await getPlayerObject(userID, guildID)
            await interaction.reply({content: `Your current height is ${player.height} "Generic Height Units ${interaction.member!.user}`, allowedMentions:{parse: []}})
        } catch {
            await interaction.reply('Player Not found')

        }


    }
}