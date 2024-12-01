import express from "express";
import dotenv from "dotenv";
import fetch from "node-fetch";
dotenv.config({ path: "../.env" });

const app = express();

// Allow express to parse JSON bodies
app.use(express.json());

app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} /api/token`);
  next();
});

app.post("/api/token", async (req, res) => {
  // Exchange the code for an access_token
  const response = await fetch(`https://discord.com/api/oauth2/token`, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({
      client_id: process.env.VITE_DISCORD_CLIENT_ID,
      client_secret: process.env.DISCORD_CLIENT_SECRET,
      grant_type: "authorization_code",
      code: req.body.code,
    }),
  });

  console.log(
    `${new Date().toISOString()} /api/token response: ${response.status}`
  );

  if (response.ok === false) {
    res.status(500).send("Failed to exchange code for access_token");
    return;
  }

  // Retrieve the access_token from the response
  const { access_token } = await response.json();

  // Return the access_token to our client as { access_token: "..."}
  res.send({ access_token });
});

export default app;
