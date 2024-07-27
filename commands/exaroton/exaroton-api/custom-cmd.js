import { Exaroton } from "./utils.js";

// Custom command
export async function start(interaction) {
  try {
    const server = new Exaroton()
    await server.startServer();
    let address = await server.getAddress()
    await interaction.reply(`Server is starting at ${address}`);
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
