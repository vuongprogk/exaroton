import { REST, Routes, SlashCommandBuilder } from "discord.js";
import "dotenv/config";

const commands = [
  {
    name: "server",
    description: "Toggle server on/off",
  },
  {
    name: "startserver",
    description: "Starting the server",
  },
  {
    name: "stopserver",
    description: "Stopping the server",
  },
  {
    name: "executecmd",
    description: "Execute command in minecraft server",
    options: [
      {
        name: "command",
        type: 3,
        description: "Enter command that will be executed",
        required: true,
      },
    ],
  },
  {
    name: "serverstatus",
    description: "Get server status",
  },
  {
    name: "getserveraddr",
    description: "Get server address",
  },
  {
    name: "getcredits",
    description: "Get account credits",
  },
  {
    name: "setram",
    description: "Set amount of ram on server",
    options: [
      {
        name: "amount",
        description: "Amount of ram is set",
        type: 4,
        required: true,
      },
    ],
  },
];

const rest = new REST({ version: "10" }).setToken(process.env.DISCORD_TOKEN);

try {
  console.log("Started refreshing application (/) commands.");

  await rest.put(Routes.applicationCommands(process.env.APP_ID), {
    body: commands,
  });

  console.log("Successfully reloaded application (/) commands.");
} catch (error) {
  console.error(error);
}
