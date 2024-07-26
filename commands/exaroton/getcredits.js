import { SlashCommandBuilder } from "discord.js";
import { Exaroton } from "./exaroton-api/utils.js";


export const data = new SlashCommandBuilder()
  .setName("getcredits")
  .setDescription("Get account credits");
export async function execute(interaction) {
  try {
    const server = new Exaroton()
    let credits = await server.getCredits()
    await interaction.reply(credits);
  } catch (error) {
    throw error;
  }
}

