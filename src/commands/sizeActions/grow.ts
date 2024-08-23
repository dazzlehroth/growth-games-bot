import {CommandInteraction, SlashCommandBuilder} from "discord.js";
import {getPlayerObject} from "../../hooks/useDBObjects";


module.exports = {
    data: new SlashCommandBuilder()
        .setName('grow')
        .setDescription('Replies with test growth'),
    async execute(interaction: CommandInteraction): Promise<void> {


        const userID = interaction.user.id;
        const guildID = interaction.guild!.id;

        try {

            const player = await getPlayerObject(userID, guildID);

           let newHeight = await player.grow(1);

           await interaction.reply(`ZAPP! Your new height is ${newHeight} generic measurement units`);



        } catch (error) {

        console.log(error)

        }




    }
}