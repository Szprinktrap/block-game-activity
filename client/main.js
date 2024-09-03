let auth;
import {
    DiscordSDK
} from "@discord/embedded-app-sdk";

const discordSdk = new DiscordSDK(import.meta.env.VITE_DISCORD_CLIENT_ID);

async function setupDiscordSdk() {
    await discordSdk.ready();
    console.log("Discord SDK is ready");

    // Authorize with Discord Client
    const {
        code
    } = await discordSdk.commands.authorize({
        client_id: import.meta.env.VITE_DISCORD_CLIENT_ID,
        response_type: "code",
        state: "",
        prompt: "none",
        scope: [
            "identify",
            "guilds"
        ],
    });

    // Retrieve an access_token from your activity's server
    const response = await fetch("/.proxy/api/token", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            code,
        }),
    });
    const {
        access_token
    } = await response.json();

    // Authenticate with Discord client (using the access_token)
    auth = await discordSdk.commands.authenticate({
        access_token,
    });

    if (auth == null) {
        throw new Error("Authenticate command failed");
    }
}

setupDiscordSdk().then(async () => {
    console.log("Discord SDK is authenticated");

    const user = await fetch(`https://discord.com/api/v10/users/@me`, {
        headers: {
            // NOTE: we're using the access_token provided by the "authenticate" command
            Authorization: `Bearer ${auth.access_token}`,
            'Content-Type': 'application/json',
        },
    }).then((response) => response.json());

    const username = user.username

    let modulescript = document.createElement('script')
    let blockgameScript = document.createElement('script')

    modulescript.type = 'text/javascript'
    modulescript.src = `/.proxy/api/modulescript.js?username=${username}&fuckcache=${Math.random().toString()}`

    blockgameScript.async = true
    blockgameScript.type = 'text/javascript'
    blockgameScript.src = 'blockgame.js'

    document.body.appendChild(modulescript)
    document.body.appendChild(blockgameScript)

});
