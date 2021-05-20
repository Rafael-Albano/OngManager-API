const supertest = require('supertest');
const app = require('../index');
const model = require('../application/model/ong');

const request = supertest(app);
const sequelize = require('../config/connection');

describe('Getting data from API - ONG', () => {
  beforeAll(async () => {
    await sequelize.authenticate();
  });

  it('Calling GET endpoint without parameters', async () => {
    await request
      .get('/ong')
      .expect(200)
      .then((res) => expect(Array.isArray(res.body)).toBeTruthy());
  });

  afterAll(async (done) => {
    await model.destroy({
      truncate: true,
      drop: true,
      force: true,
    });
    await sequelize.close();
    done();
  });
});
