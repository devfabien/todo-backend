import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';

describe('All endpoints (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  const newCategory = {
    name: 'first category',
  };

  it('/ (GET) - default message', () => {
    return request(app.getHttpServer())
      .get('/')
      .expect(200)
      .expect('APIs for todo app');
  });

  describe('Category', () => {
    it('/ (POST) - create new category', async () => {
      return request(app.getHttpServer())
        .post('/categories')
        .send(newCategory)
        .expect(201)
        .then((res) => {
          expect(res.body.id).toBeDefined();
          expect(res.body.name).toEqual(newCategory.name);
        });
    });

    it('/ (GET) - get all categories', async () => {
      return request(app.getHttpServer())
        .get('/categories')
        .expect(200)
        .then((res) => {
          expect(res.body).toBeDefined();
        });
    });
  });
});
