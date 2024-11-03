/**
 * @typedef {import('@discord/embedded-app-sdk').DiscordSDK} DiscordSDK
 * @typedef {import('./discord').getAuth} getAuth
 */

/**
 *
 * @param {ReturnType<getAuth>} auth
 * @param {DiscordSDK} discordSdk
 * @returns {Promise<{ id: string; icon: string; } | null>}
 */
export async function fetchGuildAvatar(auth, discordSdk) {
  // 1. From the HTTP API fetch a list of all of the user's guilds
  const guilds = await fetch(`https://discord.com/api/v10/users/@me/guilds`, {
    headers: {
      // NOTE: we're using the access_token provided by the "authenticate" command
      Authorization: `Bearer ${auth.access_token}`,
      "Content-Type": "application/json",
    },
  }).then((response) => response.json());

  // 2. Find the current guild's info, including it's "icon"
  return guilds.find((g) => g.id === discordSdk.guildId);
}

/**
 *
 * @param {HTMLImageElement} guildImg
 * @param {Exclude<Awaited<ReturnType<typeof fetchGuildAvatar>>, null>} currentGuild
 * @returns {void}
 */
export async function setupAvatarImg(guildImg, currentGuild) {
  // const guildImg = document.createElement("img");
  guildImg.setAttribute(
    "src",
    // More info on image formatting here: https://discord.com/developers/docs/reference#image-formatting
    `https://cdn.discordapp.com/icons/${currentGuild.id}/${currentGuild.icon}.webp?size=128`
  );
  guildImg.setAttribute("width", "128px");
  guildImg.setAttribute("height", "128px");
  guildImg.setAttribute("style", "border-radius: 50%;");
}
