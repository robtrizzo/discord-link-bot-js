# Masks: Dark Halcyon Link Bot

This is a bot for useful links and character info.

## Prerequisites

### Discord Developer Account

Head over to the [Discord Developer Portal](https://discord.com/developers/applications) and create a new application. You can name it whatever you want.

Once you've created the application, go to the `Bot` tab and reset the token. Make sure to copy it now since you won't get another chance. Next, Enable the `Message Content Intent` option since the bot will need to read server messages.

Finally, go to the `OAuth2` -> `URL Generator` and select the "bot" scope. Then, select the `ReadMessages/View Channels`, `Send Messages`, and `Embed Links` permission levels. Copy the generated link and paste it into your browser or send it to someone whose server the bot will join.

### Environment Variables

Create a `.env` file in the root directory of the project. Add the following variables:

```
DISCORD_TOKEN=<your token here>
```

## Running the Bot

Run the bot with `npm start` or `node index.js`.
