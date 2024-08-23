import {CommandInteraction, SlashCommandBuilder} from "discord.js";
import {dbInsert, dbSelectRowSingle} from "../../hooks/useDatabase";
import {Player} from "../../classes/Player";

module.exports = {
    data: new SlashCommandBuilder()
        .setName('register')
        .setDescription('Enters you into the growth games'),
    async execute(interaction: CommandInteraction): Promise<void> {

        const userId = interaction.user.id;
        const guildId = interaction.guild!.id;

        if (guildId === null) {
            await interaction.reply(`Could not identify which server you are on`)
            return ;
        }

        let user:any = await dbSelectRowSingle('users', {discordUserID: userId, guildID: guildId});

        if (user === null || user === undefined) {
            //User not Found, add them

            let newPlayer = new Player({discordUserID: userId, guildID: guildId})

            await dbInsert('players', {discordUserID: userId, guildID: guildId});

            await interaction.reply(`Registered Successfully"`)


        } else {
            await interaction.reply(`You are already registered on this server"`)
        }

    }
}