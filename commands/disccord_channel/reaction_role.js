import { EmbedBuilder } from "@discordjs/builders";
import { PermissionFlagsBits, SlashCommandBuilder } from "discord.js";

export const data = new SlashCommandBuilder()
  .setName("reactionrole")
  .setDescription("Send a reaction role to channel").setDefaultMemberPermissions(PermissionFlagsBits.Administrator);
export async function execute(interaction) {
  // Get client, guild and channel
  const client = interaction.client;
  const guild = interaction.guild;
  const channel = guild.channels.cache.get(process.env.CHANNEL);

  // Fetch role and initial Emoji
  let mineRole = guild.roles.cache.find((role) => role.name === "Minecraft");
  if (!mineRole) {
    await guild.roles.create({
      name: "Minecraft",
    });
    mineRole = guild.roles.cache.find((role) => role.name === "Minecraft");

  }
  let studyRole = guild.roles.cache.find((role) => role.name === "Study");
  if (!studyRole) {

    await guild.roles.create({
      name: "Study",
    });
    studyRole = guild.roles.cache.find((role) => role.name === "Study");

  }
  let tftRole = guild.roles.cache.find((role) => role.name === "TFT");
  if (!tftRole) {
    await guild.roles.create({
      name: "TFT",
    });
    tftRole = guild.roles.cache.find((role) => role.name === "TFT");
  }
  let lqmbRole = guild.roles.cache.find((role) => role.name === "LQMB");
  if (!lqmbRole) {
    await guild.roles.create({
      name: "LQMB",
    });
    lqmbRole = guild.roles.cache.find((role) => role.name === "LQMB");
  }

  const mineEmoji = "🐸";
  const studyEmoji = "😵‍💫";
  const tftEmoji = "🤔";
  const lqmbEmoji = "🤝";

  // Create embeb message to send
  const embedMessage = new EmbedBuilder()
    .setColor(0x0099ff)
    .setTitle("Choose your roles")
    .setDescription(
      `Get notification base on role\n\n` +
      `${mineEmoji} for Minecraft notification` +
      `${studyEmoji} for Study notification ` +
      `${tftEmoji} for TFT notification` +
      `${lqmbEmoji} for LQMB notification`
    );

  // Send embed message and react emoji
  const reactMessage = await channel.send({ embeds: [embedMessage] });
  reactMessage.react(mineEmoji);
  reactMessage.react(studyEmoji);
  reactMessage.react(tftEmoji);
  reactMessage.react(lqmbEmoji);

  if (interaction.replied || interaction.deferred) {
    await interaction.followUp({
      content: "Reaction message is sent",
      ephemeral: true,
    });
  } else {
    await interaction.reply({
      content: "Reaction message is sent",
      ephemeral: true,
    });
  }

  // Handle event after add react
  client.on("messageReactionAdd", async (reaction, user) => {
    // If reaction message is partial try fetch
    if (reaction.message.partial) await reaction.message.fetch();
    if (reaction.partial) await reaction.fetch();

    // If bot interact with message do nothing
    if (user.bot) return;
    if (!reaction.message.guild) return;

    if (reaction.message.channel.id == channel.id) {
      if (reaction.emoji.name === mineEmoji) {
        try {
          const member = guild.members.cache.get(user.id);
          if (member.roles.cache.has(mineRole.id)) return;
          await member.roles.add(mineRole);
        } catch (error) {
          console.log(error);
        }
      }
      if (reaction.emoji.name === studyEmoji) {
        try {
          const member = guild.members.cache.get(user.id);
          if (member.roles.cache.has(studyRole.id)) return;
          await member.roles.add(studyRole);
        } catch (error) {
          console.log(error);
        }
      }
      if (reaction.emoji.name === tftEmoji) {
        try {
          const member = guild.members.cache.get(user.id);
          if (member.roles.cache.has(tftRole.id)) return;
          await member.roles.add(tftRole);
        } catch (error) {
          console.log(error);
        }
      }
      if (reaction.emoji.name === lqmbEmoji) {
        try {
          const member = guild.members.cache.get(user.id);
          if (member.roles.cache.has(lqmbRole.id)) return;
          await member.roles.add(lqmbRole);
        } catch (error) {
          console.log(error);
        }
      }
    } else {
      return;
    }
  });

  // Handle event after remove react
  client.on("messageReactionRemove", async (reaction, user) => {
    if (reaction.message.partial) await reaction.message.fetch();
    if (reaction.partial) await reaction.fetch();
    if (user.bot) return;
    if (!reaction.message.guild) return;

    if (reaction.message.channel.id == channel.id) {
      if (reaction.emoji.name === mineEmoji) {
        try {
          const member = guild.members.cache.get(user.id);
          if (!member.roles.cache.has(mineRole.id)) return;
          await member.roles.remove(mineRole);
        } catch (error) {
          console.log(error);
        }
      }
      if (reaction.emoji.name === studyEmoji) {
        try {
          const member = guild.members.cache.get(user.id);
          if (!member.roles.cache.has(studyRole.id)) return;
          await member.roles.remove(studyRole);
        } catch (error) {
          console.log(error);
        }
      }
      if (reaction.emoji.name === tftEmoji) {
        try {
          const member = guild.members.cache.get(user.id);
          if (!member.roles.cache.has(tftRole.id)) return;
          await member.roles.remove(tftRole);
        } catch (error) {
          console.log(error);
        }
      }
      if (reaction.emoji.name === lqmbEmoji) {
        try {
          const member = guild.members.cache.get(user.id);
          if (!member.roles.cache.has(lqmbRole.id)) return;
          await member.roles.remove(lqmbRole);
        } catch (error) {
          console.log(error);
        }
      }
    } else {
      return;
    }
  });
}
