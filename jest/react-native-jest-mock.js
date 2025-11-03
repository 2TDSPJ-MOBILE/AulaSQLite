// Stub para substituir react-native/jest/mock que contém anotações Flow/TS
// Fornece a mesma API básica: export default function mock(moduleRef, factoryRef)

function mock(moduleRef, factoryRef) {
  if (typeof factoryRef === 'undefined') {
    // se factory não fornecido, apenas mocka o módulo
    jest.mock(moduleRef);
  } else {
    // se factoryRef for uma função já, use-a; se for uma string/ref, tente requerer o real
    if (typeof factoryRef === 'function') {
      jest.mock(moduleRef, factoryRef);
    } else {
      try {
        const actual = jest.requireActual(factoryRef);
        jest.mock(moduleRef, () => actual);
      } catch (e) {
        // fallback: mock vazio
        jest.mock(moduleRef, () => ({}));
      }
    }
  }
}

module.exports = mock;
module.exports.default = mock;
