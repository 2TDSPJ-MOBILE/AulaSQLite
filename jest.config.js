module.exports = {
  transform: {
    "^.+\\.[jt]sx?$": "babel-jest",
  },
  testEnvironment: "jest-environment-jsdom", // <- agora está instalado
  // Não carregar extend-expect do testing-library nativo para evitar importar
  // módulos do react-native durante testes unitários que não precisam dele.
  // setupFilesAfterEnv: ["@testing-library/jest-native/extend-expect"],
  moduleNameMapper: {
    // substituir o módulo Flow/TS do react-native por um stub para evitar parser errors
    "^react-native/jest/mock$": "<rootDir>/jest/react-native-jest-mock.js",
  },
  transformIgnorePatterns: [
    // Permitir que pacotes do Expo e alguns pacotes relacionados ao React Native
    // sejam transformados pelo babel-jest. Alguns pacotes (ex: expo/virtual/env)
    // usam sintaxe ESM ('export') e precisam ser processados.
    "node_modules/(?!(react-native|@react-native|@react-navigation|@react-native-community|expo|@expo|expo-.*|@unimodules)/)"
  ],
  moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"],
};
