import {ChatInputCommandInteraction, SlashCommandBuilder} from "discord.js";
import {getPlayerObject} from "../../hooks/useDBObjects";

module.exports = {
    data: new SlashCommandBuilder()
        .setName('getheight')
        .setDescription('Replies with current height')
        .addBooleanOption( option =>
        option.setName('share')
            .setDescription('Share results with the channel?')
            .setRequired(false)),
    async execute(interaction: ChatInputCommandInteraction): Promise<void> {

        const userID = String(interaction.user.id);
        const guildID = String(interaction.guild!.id);

        const shareSize = interaction.options.getBoolean('share', false) ?? false;

        try  {
            const player = await getPlayerObject(userID, guildID)

            if (shareSize){
                await interaction.reply({
                    content: `${interaction.member!.user}'s current Height is ${player.height} "Generic Height Units `,
                    allowedMentions: {parse: []}
                })
            }else {
                await interaction.reply({
                    content: `Your current Height is ${player.height} "Generic Height Units`,
                    ephemeral: true}
                )
            }
        } catch {
            await interaction.reply({content:'Player Not found, have you registered yet?', ephemeral: true})

        }


    }
}