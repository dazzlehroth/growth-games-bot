import {ChatInputCommandInteraction,  SlashCommandBuilder} from "discord.js";
import {getPlayerObject} from "../../hooks/useDBObjects";

module.exports = {
    data: new SlashCommandBuilder()
        .setName('junksize')
        .setDescription('Adjusts size of certain body parts in proportion to height')
        .setNSFW(true)
        .addIntegerOption(option =>
                option.setName('part')
                    .setDescription('Which part you want to enhance')
                    .setRequired(true)
                    .setMinValue(1)
                    .setMaxValue(4)
                    .addChoices(
                        { name: "Cock 🍆", value: 1},
                        { name: "Balls 🍒", value: 2},
                        { name: "Ass 🍑", value: 3},
                        { name: "Pecs/Boobs 🍈🍈", value: 4},
                    ))
        .addIntegerOption(option =>
            option.setName('size')
                .setDescription('How big/small do you want it to be?')
                .setRequired(true)
                .setMinValue(1)
                .setMaxValue(5)
                .addChoices(
                    { name: "Micro", value: 1},
                    { name: "Tiny", value: 2},
                    { name: "Normal", value: 3},
                    { name: "Large", value: 4},
                    { name: "Hyper", value: 5},
                )
        )

    ,
    async execute(interaction: ChatInputCommandInteraction): Promise<void> {


        const player = await getPlayerObject(String(interaction.user.id), String(interaction.guild!.id))

        const partToAdjust = interaction.options.getInteger('part', true)
        const newPartSize = interaction.options.getInteger('size', true)

        try{
            await player.adjustJunk(partToAdjust, newPartSize)
            await interaction.reply({content:`It is done, ${player.ballSize}`, ephemeral: true})
        } catch (e) {
            console.log(e)
        }




    }
}