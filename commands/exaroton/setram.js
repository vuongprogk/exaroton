import { SlashCommandBuilder } from "discord.js";
import { Exaroton } from "./exaroton-api/utils.js";

export const data = new SlashCommandBuilder()
  .setName("setram")
  .setDescription("Set amount of ram on server")
  .addIntegerOption((option) => option
    .setName("amount")
    .setDescription("Amount of ram is set")
    .setRequired(true)
  );
export async function execute(interaction) {
  try {
    const server = new Exaroton()
    let status = await server.getStatus()
    if (status === 0) {
      let ram = interaction.options.getInteger("amount");
      await server.setRAM(ram)
      await interaction.reply(`Ram is set to ${ram}`);
    } else {
      await interaction.reply("Cannot set ram when server is active");
    }
  } catch (error) {
    throw error;
  }
}
