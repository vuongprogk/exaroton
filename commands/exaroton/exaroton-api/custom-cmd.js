import { Exaroton } from "./utils.js";

// Custom command
export async function start(interaction) {
  try {
    const server = new Exaroton()
    await server.startServer();
    await interaction.reply(`Server is starting at ${await server.getAddress()}`);
  } catch (error) {
    throw error;
  }
}
export async function stop(interaction) {
  try {
    const server = new Exaroton()
    await server.stopServer();
    await interaction.reply("Server is stopping");
  } catch (error) {
    throw error;
  }
}
