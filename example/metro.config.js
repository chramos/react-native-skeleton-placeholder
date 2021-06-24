const path = require('path');
const extraNodeModules = {
  'react-native-skeleton-placeholder': path.resolve(
    // eslint-disable-next-line no-path-concat
    __dirname + '/../src/SkeletonPlaceholder',
  ),
};
// eslint-disable-next-line no-path-concat
const watchFolders = [path.resolve(__dirname + '/../src')];
module.exports = {
  transformer: {
    getTransformOptions: async () => ({
      transform: {
        experimentalImportSupport: false,
        inlineRequires: false,
      },
    }),
  },
  resolver: {
    extraNodeModules: new Proxy(extraNodeModules, {
      get: (target, name) => {
        //redirects dependencies referenced from src/ to local node_modules
        return name in target
          ? target[name]
          : path.join(process.cwd(), `node_modules/${name}`);
      },
    }),
  },
  watchFolders,
};
