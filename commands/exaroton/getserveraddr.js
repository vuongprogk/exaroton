import { SlashCommandBuilder } from "discord.js";
import { Exaroton } from "./exaroton-api/utils.js";

export const data = new SlashCommandBuilder()
  .setName("getserveraddr")
  .setDescription("Get server address");
export async function execute(interaction) {
  const server = new Exaroton()
  let address = await server.getAddress()
  if (address) await interaction.reply(address);
  else await interaction.reply("Server not found");
}

