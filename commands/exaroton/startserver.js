import { SlashCommandBuilder } from "discord.js";
import { Exaroton } from "./exaroton-api/utils.js";

export const data = new SlashCommandBuilder()
  .setName("startserver")
  .setDescription("Starting the server");
export async function execute(interaction) {
  try {
    const server = new Exaroton()
    let status = await server.getStatus();
    if (status === 0) {
      try {
        await server.startServer();
        await interaction.reply("Server is starting");
      } catch (error) {
        throw error;
      }
    } else if (status === 1)
      await interaction.reply(`Server has already run at ${await server.getAddress()}`);
    else await interaction.reply("Server in proccess, please wait.");
  } catch (error) {
    throw error;
  }
}
