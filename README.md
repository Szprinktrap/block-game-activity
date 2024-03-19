# block-game-activity
a classic version of a popular block game as a discord activity
[![screenshot](https://i.imgur.com/dkLd3NC.jpeg)](https://twitter.com/Szprinktrap/status/1770011622926368825)

**note:** this is mainly a proof of concept. the code SUCKS (a lot of it was taken from [discord's tutorial](https://discord.com/developers/docs/activities/building-an-activity)), and it's weird to host.

# what you'll need to host this
- a server, either a raspberry pi or something in your house or a VPS, and on it:
  - a web server with reverse proxy (configured for proxying websockets too!!!) and HTTPS configured, as discord doesn't allow you to host activities over HTTP (personally i use nginx)
    - refer to the sample nginx config in this repo for details on how to actually configure it 
  - a minecraft classic/classicube server that supports websockets (or in other words - classicube's web client) and either doesn't verify username or allows you to disable it ([MCGalaxy](https://github.com/ClassiCube/MCGalaxy) meets this criteria)
  - node.js (at least v18)
  - something to allow shit to run in background
- a domain name (stuff like [noip](https://www.noip.com/) probably can be used for this)
- a discord app with activities enabled (create one [here](https://discord.com/developers/applications))

# setup
1. clone this repo to your server
2. rename `example.env` to `.env`
3. edit `.env` file with your discord app client id and secret
4. run `npm i` in both client and server folders
5. configure your web server as required if you haven't already (as written above, sample nginx config is in the repo)
6. make sure your minecraft classic server is up and running (and that it doesn't verify usernames)
7. run `npm run dev` in both client and server folders (do so in screen screens, tmux sessions or whatever you prefer)
8. go to your discord app settings -> activities -> url mappings and put your domain name in the root mapping
9. also go to settings -> oauth2 and put your domain name in redirects section
 ![url mappings section](https://i.imgur.com/Vn46Vjj.png)
 ![oauth2 section](https://i.imgur.com/LEyjkuG.png)
10. enable developer mode in your discord client
11. go on a voice channel on a server that has 25 members max (discord limitation, as custom activities are in "Public Developer Preview") and try to run your activity
12. profit???

# playing with friends
i'm guessing this is a "Public Developer Preview" limitation too, but, to play with friends, you'll need to add them as your application tester.

when you do so, they still won't be able to actually start the activity, but they will be able to join it when you host it.

to invite your friends, go to your discord app settings -> app testers and put in their usernames (not screen names!!!!). they will receive an email with a link to accept the invite. after this, they will be able to join the activity hosted by you.

if you REALLY want your friends to be able to start the activity, you might need to move your app to a group and add your friends here. **beware,** as by doing so you **technically allow them to mess with the app settings!** only do this with people you **ABSOLUTELY** trust, or you can punch in their face if they screw something up.
