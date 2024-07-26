import { SlashCommandBuilder } from "discord.js";
import { Exaroton } from "./exaroton-api/utils.js";

export const data = new SlashCommandBuilder()
  .setName("executecmd")
  .setDescription("Execute command in minecraft server")
  .addStringOption((option) => option
    .setName("command")
    .setDescription("Enter command that will be executed")
    .setRequired(true)
  );
export async function execute(interaction) {
  try {
    const server = new Exaroton()
    let status = await server.getStatus()
    if (status === 1) {
      let cmd = interaction.options.getString("command");
      await server.execCommand(cmd)
      await interaction.reply("Command is executed");
    } else await interaction.reply("Server is not running");
  } catch (error) {
    throw error;
  }
}
