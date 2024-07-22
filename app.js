import "dotenv/config";
import { Client, GatewayIntentBits } from "discord.js";
import * as discord from "./utils.js";

const client = new Client({ intents: [GatewayIntentBits.Guilds] });
let status = await discord.getStatus();
client.on("ready", () => {
  console.log(`Logged in as ${client.user.tag}!`);
});
let address = await discord.getAddress();
// Custom command
async function start(interaction) {
  await discord.startServer();
  status = 1;
  await interaction.reply(`Server is starting at ${address}`);
}
async function stop(interaction) {
  await discord.stopServer();
  status = 0;
  await interaction.reply("Server is stopping");
}

client.on("interactionCreate", async (interaction) => {
  if (!interaction.isChatInputCommand()) return;

  status = await discord.getStatus();
  if (interaction.commandName === "server") {
    if (status === 0) {
      await start(interaction);
    } else if (status === 1) {
      await stop(interaction);
    }
  } else if (interaction.commandName === "startserver") {
    if (status === 0) {
      await start(interaction);
    } else await interaction.reply(`Server is running at ${address}`);
  } else if (interaction.commandName === "stopserver") {
    if (status === 1) {
      await stop(interaction);
    } else await interaction.reply("Server is not running");
  } else if (interaction.commandName === "executecmd") {
    if (status === 1) {
      let cmd = interaction.options.getString("command");
      await discord.execCommand(cmd);
    } else await interaction.reply("Server is not running");
  } else if (interaction.commandName === "serverstatus") {
    await interaction.reply(discord.handleStatus(status));
  } else if (interaction.commandName === "getserveraddr") {
    await interaction.reply(address);
  } else if (interaction.commandName === "getcredits") {
    await interaction.reply(await discord.getCredits());
  }
});

client.login(process.env.DISCORD_TOKEN);
