// code is almost exactly reused from https://github.com/cawfree/react-native-wormhole

const globalName = '__WORMHOLE__';

const defaultGlobal = Object.freeze({
  require: (moduleId) => {
    if (moduleId === 'react') {
      return require('react');
    } else if (moduleId === 'react-native') {
      return require('react-native');
    } else if (moduleId === 'react-native-paper') {
      return require('react-native-paper');
    } else if (moduleId === '@expo/vector-icons') {
      return require('@expo/vector-icons');
    }
    return null;
  },
});

export default async function getCodeComponent(src) {
  const srcWithImports = `${Object.keys(defaultGlobal)
    .map((key) => `var ${key} = ${globalName}.${key};`)
    .join('\n')}; const exports = {}; ${src}; return exports.default;`;

  const Component = await new Function(globalName, srcWithImports)(
    defaultGlobal,
  );
  if (typeof Component !== 'function') {
    throw new Error(
      `Expected function, encountered ${typeof Component}. Did you forget to mark your Wormhole as a default export?`,
    );
  }
  return Component;
}
