import { SlashCommandBuilder } from "discord.js";
import { Exaroton } from "./exaroton-api/utils.js";

export const data = new SlashCommandBuilder()
  .setName("stopserver")
  .setDescription("Stopping the server");
export async function execute(interaction) {
  try {
    const server = new Exaroton()
    let status = await server.getStatus();
    if (status === 1) {
      await server.stopServer();
      await interaction.reply("Server is stopping");
    } else await interaction.reply("Server is not running");
  } catch (error) {
    throw error;
  }
}
