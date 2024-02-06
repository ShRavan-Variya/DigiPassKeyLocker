/**
 * Metro configuration for React Native
 * https://github.com/facebook/react-native
 *
 * @format
 */

module.exports = {
  transformer: {
    getTransformOptions: async () => ({
      transform: {
        experimentalImportSupport: false,
        inlineRequires: true,
      },
    }),
    babelTransformerPath: require.resolve(
      'react-native-typescript-transformer',
    ),
  },
  resolve: {
    fallback: {
      TextEncoder: require.resolve('text-encoding'), // Correct path
      TextDecoder: require.resolve('text-encoding'), // Correct path
    },
  },
};
