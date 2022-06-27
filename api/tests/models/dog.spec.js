const { Dog, conn } = require('../../src/db.js');
const { expect } = require('chai');

describe('modelos dog', () => {
  before(() => conn.authenticate()
    .catch((err) => {
      console.error('No se pudo conectar con la db', err);
    }));
  describe('Validators', () => {
    beforeEach(() => Dog.sync({ force: true }));
    describe('name', () => {
      it('requiere name', (done) => {
        Dog.create({})
          .then(() => done(new Error('It requires a valid name')))
          .catch(() => done());
      });
      it('Pasa los datos obligatorios', () => {
        Dog.create({ name: 'Pug', weight:'25', height: '25' });
      });
    });
  });
});
