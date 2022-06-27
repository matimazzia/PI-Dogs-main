/* eslint-disable import/no-extraneous-dependencies */
const { expect } = require('chai');
const session = require('supertest-session');
const app = require('../../src/app.js');
const { Dog, conn } = require('../../src/db.js');

const agent = session(app);
const dog = {
  name: 'Pug',
  weight:'25',
  height: '25'
};

describe('dog routes', () => {
  before(() => conn.authenticate()
  .catch((err) => {
    console.error('no se pudo conectar con DB', err);
  }));
  beforeEach(() => Dog.sync({ force: true })
    .then(() => Dog.create(dog)));
  describe('GET /dogs', () => {
    it('espera status 200', () =>
      agent.get('/dogs').expect(200)
    );
  });
});
