import { setupDiscordSdk, getAuth, getDiscordSdk } from "./discord";
import { fetchGuildAvatar, setupAvatarImg } from "./discord-avatar";
import { getVoiceChannelName } from "./discord-voice";
import "./style.css";
import rocketLogo from "/rocket.png";

setupDiscordSdk().then(async (thing) => {
  console.log("Discord SDK is ready");

  const guildAvatar = await fetchGuildAvatar(getAuth(), getDiscordSdk());

  const guildImg = guildAvatar ? document.createElement("img") : null;

  // 3. Append to the UI an img tag with the related information
  if (guildAvatar && guildImg) {
    setupAvatarImg(guildImg, guildAvatar);
  }

  const app = document.querySelector("#app");
  app.innerHTML = `
<div>
  <img src="${rocketLogo}" class="logo" alt="Discord" />
  <h1>Hello, World! :)</h1>
  <p>Logged in as ${getAuth()?.user.username}#${
    getAuth()?.user.discriminator
  }</p>
  <p>With access token: ${getAuth()?.access_token}</p>
  <p>With Application: ${getAuth()?.application.name}#${
    getAuth()?.application.id
  }</p>
  <p>Activity Channel:"${await getVoiceChannelName(getDiscordSdk())}"</p>
  <textArea id="ta">${JSON.stringify(thing, null, 2)}</textArea>
</div>`;

  guildImg && app.appendChild(guildImg);
});

document.querySelector("#app").innerHTML = `
  Authorizing with Discord...
`;
