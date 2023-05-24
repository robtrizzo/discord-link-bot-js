import characters from './characters.json' assert { type: 'json' };
import dotenv from 'dotenv';
dotenv.config();

import {
  Client,
  GatewayIntentBits,
  Events,
  AttachmentBuilder,
  EmbedBuilder,
} from 'discord.js';
const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
  ],
});

client.once(Events.ClientReady, (c) => {
  console.log(`Ready! Logged in as ${c.user.tag}`);
});

client.login(process.env.DISCORD_TOKEN);
const PREFIX = '!';

client.on('messageCreate', async (message) => {
  if (message.author.bot) return;
  if (message.content.startsWith(PREFIX)) {
    const msg = message.content
      .slice(PREFIX.length)
      .toLowerCase()
      .split(/ (.*)/s)[0];
    switch (msg) {
      case 'help':
        message.reply(
          `Commands:\n${PREFIX}links\n${PREFIX}game\n${PREFIX}rules\n${PREFIX}characters\n${PREFIX}cases\n${PREFIX}abattoir\n${PREFIX}relationships\n${PREFIX}info <character name>`
        );
        break;
      case 'links':
        message.reply(
          'roll20: https://app.roll20.net/campaigns/details/15002137/masks-dark-halcyon\nrules: https://drive.google.com/drive/folders/1-qA8icBDjgEH5spo4oS1s-NcQJdZjEJE?usp=sharing\ncharacter keeper: https://docs.google.com/document/d/1ZSEa5DUHTILYtjOyqvwyPOE2-OnYsSHCkasB9FQVo7E/edit#heading=h.czjb4mkt4uk6\ncases: https://docs.google.com/document/d/1q8zMW469kY4qWR0PpqacC3yuYq7R4E28IIzijZPudU4/edit#heading=h.psyaydv8s56e\nabattoir: https://docs.google.com/document/d/1cr1cE690MuH5thr-0JvoMdVTTn-Y5nHyuN6nqfuvpko/edit\nrelationships: https://kumu.io/janemarie19/40wf-relationship-chart'
        );
        break;
      case 'game':
        message.reply(
          'https://app.roll20.net/campaigns/details/15002137/masks-dark-halcyon'
        );
        break;
      case 'rules':
        message.reply(
          'https://drive.google.com/drive/folders/1-qA8icBDjgEH5spo4oS1s-NcQJdZjEJE?usp=sharing'
        );
        break;
      case 'characters':
        message.reply(
          'https://docs.google.com/document/d/1ZSEa5DUHTILYtjOyqvwyPOE2-OnYsSHCkasB9FQVo7E/edit#heading=h.czjb4mkt4uk6'
        );
        break;
      case 'cases':
        message.reply(
          'https://docs.google.com/document/d/1q8zMW469kY4qWR0PpqacC3yuYq7R4E28IIzijZPudU4/edit#heading=h.psyaydv8s56e'
        );
        break;
      case 'abattoir':
        message.reply(
          'https://docs.google.com/document/d/1cr1cE690MuH5thr-0JvoMdVTTn-Y5nHyuN6nqfuvpko/edit'
        );
        break;
      case 'relationships':
        message.reply('https://kumu.io/janemarie19/40wf-relationship-chart');
        break;
      case 'info':
        const character = message.content.split(/ (.*)/s)[1].toLowerCase();
        if (!character) {
          message.reply('Please provide a character name');
          return;
        }
        const characterInfo = characters[character];
        if (!characterInfo) {
          message.reply(
            'Character not found. Try one of the following:\n' +
              Object.keys(characters).join('\n')
          );
          return;
        }
        const response = [];
        for (const [key, value] of Object.entries(characterInfo)) {
          response.push(`**${key}**: ${value}`);
        }
        message.reply(response.join('\n\n'));
        break;
      default:
        message.reply('Command not found. Try !help');
    }
  }
  return;
});
