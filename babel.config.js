module.exports = function (api) {
  api.cache(true);
  return {
    // Use the expo preset (recommended for Expo SDK 50+). It includes
    // the transforms needed by expo-router so we don't need the
    // deprecated "expo-router/babel" plugin.
    presets: ["babel-preset-expo"],
  };
};