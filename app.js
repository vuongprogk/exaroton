import "dotenv/config";
import { readdirSync } from "node:fs";
import { join, dirname, relative } from "node:path";
import { fileURLToPath } from "url"
import { Client, Collection, Events, GatewayIntentBits } from "discord.js";
import proccess from "node:process";


const client = new Client({ intents: [GatewayIntentBits.Guilds] });
client.commands = new Collection();

// TODO: get path
const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)
const foldersPath = join(__dirname, "commands");

// TODO: get command folders
const commandFolders = readdirSync(foldersPath);

for (const folder of commandFolders) {

  const commandsPath = join(foldersPath, folder);
  const commandFiles = readdirSync(commandsPath)
    .filter((file) => file.endsWith(".js"));
  for (const file of commandFiles) {
    const filePath = join(commandsPath, file);
    const rpath = relative(__dirname, filePath).replaceAll("\\", '/')
    const command = await import(`./${rpath}`)
    if ('data' in command && 'execute' in command) {
      // Set a new item in the Collection with the key as the command name and the value as the exported module
      client.commands.set(command.data.name, command);
    } else {
      console.log(
        `[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`,
      );
    }
  }
}
proccess.on("uncaughtException", (reason, promise) => {
  console.log(`Unhandled exception at: ${promise} \nreason: ${reason}`);
});
client.on("ready", async () => {
  console.log(`Bot ${client.user.displayName} is started!`);
});

client.on(Events.InteractionCreate, async (interaction) => {
  if (!interaction.isChatInputCommand()) return;

  const command = interaction.client.commands.get(interaction.commandName);

  if (!command) {
    console.error(`No command matching ${interaction.commandName} was found.`);
    return;
  }
  try {
    await command.execute(interaction);
  } catch (error) {
    console.error(error);
    if (interaction.replied || interaction.deferred) {
      await interaction.followUp({
        content: "There was an error while executing this command!",
        ephemeral: true,
      });
    } else {
      await interaction.reply({
        content: "There was an error while executing this command!",
        ephemeral: true,
      });
    }
  }
});

client.login(proccess.env.DISCORD_TOKEN);
