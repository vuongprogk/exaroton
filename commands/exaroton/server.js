import { SlashCommandBuilder } from "discord.js";
import { Exaroton } from "./exaroton-api/utils.js";

export const data = new SlashCommandBuilder()
  .setName("server")
  .setDescription("Toggle server on/off");
export async function execute(interaction) {
  try {
    const server = new Exaroton()
    let status = await server.getStatus()
    if (status === 0) {
      await server.startServer();
      await interaction.reply("Server is starting");
    } else if (status === 1) {
      await server.stopServer();
      await interaction.reply("Server is stopping");
    } else await interaction.reply("Server in proccess, please wait.");
  } catch (error) {
    throw error;
  }
}
