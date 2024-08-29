import {
    ActionRowBuilder,
    ButtonBuilder,
    ButtonStyle,
    ChatInputCommandInteraction,
    EmbedBuilder,
    SlashCommandBuilder
} from "discord.js";
import {getPlayerObject} from "../../hooks/useDBObjects";


const embed = new EmbedBuilder()
    .setTitle("Time to grow!")
    .setDescription("Choose your growth option \n \u200B \u200B")
    .addFields(
        {
            name: "Small",
            value: "1x Multiplier \n 1 Hour Cooldown \u200B \u200B \u200B \u200B",
            inline: true,
        },
        {
            name: "Medium",
            value: "2x Multiplier \n 2 Hour Cooldown \u200B \u200B \u200B \u200B",
            inline: true
        },
        {
            name: "Large",
            value: "3x Multiplier \n 3 Hour Cooldown \u200B \u200B \u200B \u200B",
            inline: true
        }
    )
const growthSmall = new ButtonBuilder()
    .setCustomId('growSmall')
    .setLabel("Small")
    .setStyle(ButtonStyle.Primary)

const growthMed = new ButtonBuilder()
    .setCustomId('growMed')
    .setLabel("Medium")
    .setStyle(ButtonStyle.Primary)

const growthLarge = new ButtonBuilder()
    .setCustomId('growLarge')
    .setLabel("Large")
    .setStyle(ButtonStyle.Primary)

const growthOptions = new ActionRowBuilder<ButtonBuilder>()
    .addComponents(growthSmall, growthMed, growthLarge)


module.exports = {
    data: new SlashCommandBuilder()
        .setName('grow')
        .setDescription('Replies with test growth'),
    async execute(interaction: ChatInputCommandInteraction): Promise<void> {


        const userID = interaction.user.id;
        const guildID = interaction.guild!.id;


        //First present the player with their options
        await interaction.reply({embeds: [embed], ephemeral: true, components: [growthOptions]})


        try {

            const player = await getPlayerObject(userID, guildID);

            let newHeight = await player.grow(1);

            await interaction.reply(`ZAPP! Your new height is ${newHeight} generic measurement units`);


        } catch (error) {

            console.log(error)

        }


    }
}