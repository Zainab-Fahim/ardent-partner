# Build a competition entry chat bot with Twilio Autopilot and Facebook Messenger

This repo contains the code required to run the project described in the blog post [Build a competition entry chat bot with Twilio Autopilot and Facebook Messenger](https://www.twilio.com/blog/build-competition-entry-chat-bot-twilio-autopilot-whatsapp).

## What you need

To run this repo you will need to have:

* Node.js 12 installed
* A Twilio account (if you don't have one yet, [sign up for a free Twilio account here and receive $10 credit when you upgrade](https://twil.io/philnash))
* A [Facebook](https://www.facebook.com) account with which you can [create a Page](https://www.facebook.com/pages/creation/)
* An [Airtable account](https://airtable.com/)
* [ngrok](https://ngrok.com) so that you can [respond to webhooks in your local development environment](https://www.twilio.com/blog/2015/09/6-awesome-reasons-to-use-ngrok-when-testing-webhooks.html)

You will also need to [follow the instructions in this blog post to set up your bot](https://www.twilio.com/blog/build-competition-entry-chat-bot-twilio-autopilot-whatsapp). This repo contains all of the code that is written in the blog post.

## How to run

Clone the repo and change into the new directory:

```bash
git clone https://github.com/philnash/twilio-autopilot-competition-entry-bot.git
cd twilio-autopilot-competition-entry-bot
```

Install the dependencies:

```bash
npm install
```

Copy the `.env.example` file to `.env`:

```bash
cp .env.example .env
```

Fill in the `.env` file with your Twilio Account SID and Auth Token (which you can find in your [Twilio console](https://www.twilio.com/console)), your Airtable API Key and Airtable Base ID. To run this locally and connect your bot you should also run ngrok to tunnel through to port 3000, like so:

```bash
ngrok http 3000
```

Once you have done that, enter the ngrok URL (which should look like: `RANDOM_SUBDOMAIN.ngrok.io`) as the `DOMAIN_NAME`.

With all that prepared, start the application with:

```bash
npm start
```

## License

MIT