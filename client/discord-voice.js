/**
 * @typedef {import('@discord/embedded-app-sdk').DiscordSDK} DiscordSDK
 */

/**
 *
 * @param {DiscordSDK} discordSdk
 * @returns
 */
export async function getVoiceChannelName(discordSdk) {
  const activityChannelName = "Unknown";

  if (!discordSdk.channelId || !discordSdk.guildId) return activityChannelName;

  // Requesting the channel in GDMs (when the guild ID is null) requires
  // the dm_channels.read scope which requires Discord approval.
  // Over RPC collect info about the channel
  const channel = await discordSdk.commands.getChannel({
    channel_id: discordSdk.channelId,
  });

  return channel.name ?? activityChannelName;
}
