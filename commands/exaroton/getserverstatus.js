import { SlashCommandBuilder } from "discord.js";
import { Exaroton } from "./exaroton-api/utils.js";

export const data = new SlashCommandBuilder()
  .setName("getserverstatus")
  .setDescription("Get server status");
export async function execute(interaction) {
  try {
    const server = new Exaroton()
    let status = await server.getStatus()
    await interaction.reply(server.handleStatus(status));
  } catch (error) {
    throw error;
  }
}
