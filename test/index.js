const assert = require('assert');
const expect = require('chai').expect;

describe('Тест теста', () => {
  it('должен проходить', () => {});
  it('должен завалиться', () => {
  throw new Error('Потому что так и задумано!');
  });
  });