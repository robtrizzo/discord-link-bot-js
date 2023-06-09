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
    let character;
    switch (msg) {
      case 'help':
        message.reply(
          `Commands:\n${PREFIX}links\n${PREFIX}game\n${PREFIX}rules\n${PREFIX}characters\n${PREFIX}cases\n${PREFIX}abattoir\n${PREFIX}relationships\n${PREFIX}conspiracy\n${PREFIX}info <character name>\n${PREFIX}threat <character name>`
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
          'https://docs.google.com/document/d/1q8zMW469kY4qWR0PpqacC3yuYq7R4E28IIzijZPudU4/edit#heading=h.psyaydv8s56e\nhttps://docs.google.com/document/d/1zf_eT4HnBKO2qIwB9HipVX9umH_WpdBDtrMVQptxCv4/edit'
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
      case 'conspiracy':
        message.reply(
          'https://embed.kumu.io/80be4152515fbf943ca7c503b4045f0c#untitled-map'
        );
        break;
      case 'info':
        character = message.content.split(/ (.*)/s)[1]?.toLowerCase();
        if (!character) {
          message.reply('Please provide a character name');
          break;
        }
        const characterInfo = characters[character];
        if (!characterInfo) {
          message.reply(
            'Character not found. Try one of the following:\n' +
              Object.keys(characters).join('\n')
          );
          break;
        }
        const response = [];
        for (const [key, value] of Object.entries(characterInfo)) {
          response.push(`**${key}**: ${value}`);
        }
        message.reply(response.join('\n\n'));
        break;
      case 'threat':
        character = message.content.split(/ (.*)/s)[1]?.toLowerCase();
        if (!character) {
          message.reply('Please provide a character name');
          break;
        }
        const threatInfo = characters[character];
        if (!threatInfo) {
          message.reply(
            'Character not found. Try one of the following:\n' +
              Object.keys(characters).join('\n')
          );
          break;
        }
        const filename = `./assets/${character
          .toLowerCase()
          .replace(/\s/g, '')}.png`;
        const file = new AttachmentBuilder(filename);
        const embed = new EmbedBuilder()
          .setTitle(`aegis threat rating: ${character}`)
          .setImage(`attachment://${filename}.png`);
        message.reply({ embeds: [embed], files: [file] });
        break;
      default:
        message.reply('Command not found. Try !help');
    }
  }
  return;
});
