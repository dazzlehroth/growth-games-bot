import {CommandInteraction, SlashCommandBuilder} from "discord.js";
import {dbSelectRow} from "../../hooks/useDatabase";
import {getPlayerObject} from "../../hooks/useDBObjects";


module.exports = {
    data: new SlashCommandBuilder()
        .setName('testgrow')
        .setDescription('Replies with test growth'),
    async execute(interaction: CommandInteraction): Promise<void> {


        const userID = interaction.user.id;
        const guildID = interaction.guild!.id;

        try {
            await getPlayerObject(userID, guildID)
        } catch (error) {

        }




    }
}