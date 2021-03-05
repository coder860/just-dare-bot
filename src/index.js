const { Client, MessageEmbed } = require("discord.js");
const client = new Client({
  partials: ["MESSAGE", "REACTION", "CHANNEL"]
});
client.login(process.env.TOKEN);
const AntiSpam = require("discord-anti-spam");
const antiSpam = new AntiSpam({
  warnThreshold: 3, // Amount of messages sent in a row that will cause a warning.
  muteThreshold: 4, // Amount of messages sent in a row that will cause a mute
  kickThreshold: 7, // Amount of messages sent in a row that will cause a kick.
  banThreshold: 7, // Amount of messages sent in a row that will cause a ban.
  maxInterval: 2000, // Amount of time (in milliseconds) in which messages are considered spam.
  warnMessage: "{@user}, Dude stop spamming.", // Message that will be sent in chat upon warning a user.
  kickMessage: "**{user_tag}** has been kicked for spamming.", // Message that will be sent in chat upon kicking a user.
  muteMessage: "**{user_tag}** has been muted for spamming.", // Message that will be sent in chat upon muting a user.
  banMessage: "**{user_tag}** has been banned for spamming.", // Message that will be sent in chat upon banning a user.
  maxDuplicatesWarning: 7, // Amount of duplicate messages that trigger a warning.
  maxDuplicatesKick: 10, // Amount of duplicate messages that trigger a warning.
  maxDuplicatesBan: 12, // Amount of duplicate messages that trigger a warning.
  exemptPermissions: ["ADMINISTRATOR"], // Bypass users with any of these permissions.
  ignoreBots: true, // Ignore bot messages.
  verbose: true, // Extended Logs from module.
  ignoredUsers: [], // Array of User IDs that get ignored.
  muteRoleName: "Muted", // Name of the role that will be given to muted users!
  removeMessages: true // If the bot should remove all the spam messages when taking action on a user!
  // And many more options... See the documentation.
});
client.on("ready", () => {
  client.user
    .setPresence({
      activity: { name: "with Some random coder v2.5a" }
    })
    .then(console.log)
    .catch(console.error);
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on("message", (message) => antiSpam.message(message));
client.on("message", (msg) => {
  if (msg.content === "ping") {
    msg.reply("Pong!");
  }
  if (msg.content === "!!rules") {
    const embed = new MessageEmbed()
      .setTitle("RULES")
      .setColor("#0099ff")
      .addFields(
        {
          name: "1.",
          value: "No abusive language or harassment of any kind"
        },
        {
          name: " 2.",
          value: "Spamming and excessive pinging will result in WARN OR BAN"
        },
        {
          name: "3.",
          value: "3 warns = BAN"
        }
      )
      .setDescription("The rules of the server");
    msg.channel.send(embed);
  }
});

client.on("guildMemberAdd", (member) => {
  console.log("member new");
  client.channels.cache
    .get(`815909248072548352`)
    .send(`👋 Welcome aboard <@${member.user.id}>`);
});

// Adding reaction-role function
client.on("messageReactionAdd", async (reaction, user) => {
  if (reaction.message.partial) await reaction.message.fetch();
  if (reaction.partial) await reaction.fetch();
  if (user.bot) return;
  if (!reaction.message.guild) return;
  if (reaction.message.channel.id === "816536794245890048") {
    if (reaction.emoji.name === "✅") {
      await reaction.message.guild.members.cache
        .get(user.id)
        .roles.add("817254173515055154");
    }
    if (reaction.emoji.name === "🔴") {
      await reaction.message.guild.members.cache
        .get(user.id)
        .roles.add("817255261223649280");
    }
    if (reaction.emoji.name === "🟠") {
      await reaction.message.guild.members.cache
        .get(user.id)
        .roles.add("817255335437139992");
    }
  } else return;
});

// Removing reaction roles
client.on("messageReactionRemove", async (reaction, user) => {
  if (reaction.message.partial) await reaction.message.fetch();
  if (reaction.partial) await reaction.fetch();
  if (user.bot) return;
  if (!reaction.message.guild) return;
  if (reaction.message.channel.id === "816536794245890048") {
    if (reaction.emoji.name === "✅") {
      await reaction.message.guild.members.cache
        .get(user.id)
        .roles.remove("817254173515055154");
    }
    if (reaction.emoji.name === "🔴") {
      await reaction.message.guild.members.cache
        .get(user.id)
        .roles.remove("817255261223649280");
    }
    if (reaction.emoji.name === "🟠") {
      await reaction.message.guild.members.cache
        .get(user.id)
        .roles.remove("817255335437139992");
    }
  } else return;
});
