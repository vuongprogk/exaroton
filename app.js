import "dotenv/config";
import { Client, GatewayIntentBits } from "discord.js";
import * as discord from "./utils.js";

const client = new Client({ intents: [GatewayIntentBits.Guilds] });
let address = await discord.getAddress();
client.on("ready", () => {
  console.log(`Logged in as ${client.user.tag}!`);
});
// Custom command
async function start(interaction) {
  await discord.startServer;
  await interaction.reply(`Server is starting at ${address}`);
}
async function stop(interaction) {
  await discord.stopServer();
  await interaction.reply("Server is stopping");
}

client.on("interactionCreate", async (interaction) => {
  if (!interaction.isChatInputCommand()) return;

  if (interaction.commandName === "server") {
    let status = await discord.getStatus();
    if (status === 0) {
      await start(interaction);
    } else if (status === 1) {
      await stop(interaction);
    }
  } else if (interaction.commandName === "startserver") {
    let status = await discord.getStatus();
    if (status === 0) {
      await start(interaction);
    } else await interaction.reply(`Server is running at ${address}`);
  } else if (interaction.commandName === "stopserver") {
    let status = await discord.getStatus();
    if (status === 1) {
      await stop(interaction);
    } else await interaction.reply("Server is not running");
  } else if (interaction.commandName === "executecmd") {
    let status = await discord.getStatus();
    if (status === 1) {
      let cmd = interaction.options.getString("command");
      await discord.execCommand(cmd);
    } else await interaction.reply("Server is not running");
  } else if (interaction.commandName === "serverstatus") {
    let status = await discord.getStatus();
    await interaction.reply(discord.handleStatus(status));
  } else if (interaction.commandName === "getserveraddr") {
    await interaction.reply(address);
  } else if (interaction.commandName === "getcredits") {
    await interaction.reply(await discord.getCredits());
  }
});

client.login(process.env.DISCORD_TOKEN);
