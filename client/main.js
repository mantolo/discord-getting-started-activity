import { setupDiscordSdk } from "./discord";
import "./style.css";
import rocketLogo from "/rocket.png";

setupDiscordSdk().then(() => {
  console.log("Discord SDK is ready");
});

document.querySelector("#app").innerHTML = `
  <div>
    <img src="${rocketLogo}" class="logo" alt="Discord" />
    <h1>Hello, World!</h1>
  </div>
`;
