import "dotenv/config";
import { Client, GatewayIntentBits } from "discord.js";
import * as discord from "./utils.js";

const client = new Client({ intents: [GatewayIntentBits.Guilds] });
let address = discord.getAddress();

client.on("ready", () => {
  console.log(`Bot ${client.user.displayName} is started!`);
});
// Custom command
async function start(interaction) {
  try {
    await discord.startServer();
    await interaction.reply(`Server is starting at ${address}`);
  } catch (error) {
    throw error;
  }
}
async function stop(interaction) {
  try {
    await discord.stopServer();
    await interaction.reply("Server is stopping");
  } catch (error) {
    throw error;
  }
}

client.on("interactionCreate", async (interaction) => {
  if (!interaction.isChatInputCommand()) return;

  if (interaction.commandName === "server") {
    try {
      let status = discord.getStatus();
      if (status === 0) {
        await start(interaction);
      } else if (status === 1) {
        await stop(interaction);
      } else await interaction.reply("Server in proccess, please wait.");
    } catch (error) {
      if (typeof error === "object") await interaction.reply(error.message);
      else if (typeof error === "string") await interaction.reply(error);
      else
        await interaction.reply("Server catch unknown error, please try late.");
    }
  } else if (interaction.commandName === "startserver") {
    try {
      let status = discord.getStatus();
      if (status === 0) {
        await start(interaction);
      } else if (status === 1)
        await interaction.reply(`Server has already run at ${address}`);
      else await interaction.reply("Server in proccess, please wait.");
    } catch (error) {
      if (typeof error === "object") await interaction.reply(error.message);
      else if (typeof error === "string") await interaction.reply(error);
      else
        await interaction.reply("Server catch unknown error, please try late.");
    }
  } else if (interaction.commandName === "stopserver") {
    try {
      let status = discord.getStatus();
      if (status === 1) {
        await stop(interaction);
      } else await interaction.reply("Server is not running");
    } catch (error) {
      if (typeof error === "object") await interaction.reply(error.message);
      else if (typeof error === "string") await interaction.reply(error);
      else
        await interaction.reply("Server catch unknown error, please try late.");
    }
  } else if (interaction.commandName === "executecmd") {
    try {
      let status = discord.getStatus();
      if (status === 1) {
        let cmd = interaction.options.getString("command");
        await discord.execCommand(cmd);
        await interaction.reply("Command is executed");
      } else await interaction.reply("Server is not running");
    } catch (error) {
      if (typeof error === "object") await interaction.reply(error.message);
      else if (typeof error === "string") await interaction.reply(error);
      else
        await interaction.reply("Server catch unknown error, please try late.");
    }
  } else if (interaction.commandName === "serverstatus") {
    try {
      let status = discord.getStatus();
      await interaction.reply(discord.handleStatus(status));
    } catch (error) {
      if (typeof error === "object") await interaction.reply(error.message);
      else if (typeof error === "string") await interaction.reply(error);
      else
        await interaction.reply("Server catch unknown error, please try late.");
    }
  } else if (interaction.commandName === "getserveraddr") {
    if (address) await interaction.reply(address);
    else await interaction.reply("Server not found");
  } else if (interaction.commandName === "getcredits") {
    try {
      await interaction.reply(await discord.getCredits());
    } catch (error) {
      if (typeof error === "object") await interaction.reply(error.message);
      else if (typeof error === "string") await interaction.reply(error);
      else
        await interaction.reply("Server catch unknown error, please try late.");
    }
  } else if (interaction.commandName === "setram") {
    try {
      let status = discord.getStatus();
      if (status === 0) {
        let ram = interaction.options.getInteger("amount");
        discord.setRAM(ram);
        await interaction.reply(`Ram is set to ${ram}`);
      } else {
        await interaction.reply("Cannot set ram when server is active");
      }
    } catch (error) {
      if (typeof error === "object") await interaction.reply(error.message);
      else if (typeof error === "string") await interaction.reply(error);
      else
        await interaction.reply("Server catch unknown error, please try late.");
    }
  }
});

client.login(process.env.DISCORD_TOKEN);
