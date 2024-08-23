import {CommandInteraction, SlashCommandBuilder} from "discord.js";
import {dbInsert, dbSelectObject} from "../../hooks/useDatabase";

module.exports = {
    data: new SlashCommandBuilder()
        .setName('testgrow')
        .setDescription('Replies with test growth'),
    async execute(interaction: CommandInteraction): Promise<void> {



//TODO Find user and update their record with growth



    }
}