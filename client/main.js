import { setupDiscordSdk, getAuth } from "./discord";
import "./style.css";
import rocketLogo from "/rocket.png";

setupDiscordSdk().then(() => {
  console.log("Discord SDK is ready");

  document.querySelector("#app").innerHTML = `
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
</div>`;
});

document.querySelector("#app").innerHTML = `
  Authorizing with Discord...
`;
