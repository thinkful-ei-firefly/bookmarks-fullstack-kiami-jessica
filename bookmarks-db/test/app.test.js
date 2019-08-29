'use strict';
/*global supertest */

const app = require('../src/app');

describe('Bookmarks endpoints', () => {
  it('GET / responds with status 200', () => {
    return supertest(app)
      .get('/bookmarks')
      .expect(200);
  });
});
