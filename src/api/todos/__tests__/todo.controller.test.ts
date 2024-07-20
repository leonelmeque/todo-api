import request from 'supertest';
import app from '../../../app';
import { generateToken } from '../../../middleware/auth.middleware';
import { authToken } from '../../../../testUtils/auth';


describe('Todo API', () => {
  it('should create a new todo', async () => {
    const response = await request(app)
      .post('/api/v1/todos/create')
      .auth(authToken, {type: 'bearer'})
      .set('Authorization', `Bearer ${generateToken('mequedev')}`)
      .send({
        name: 'Test Todo',
        description: 'This is a test todo',
        creator: 'b7e23ec2-07f2-49a5-b663-99b8a52a4627',
      });
    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('id');
  });

  it('should get all todos', async () => {
    const response = await request(app)
      .get('/api/v1/todos')
      .auth(authToken, { type: 'bearer'});
    expect(response.status).toBe(200);
    expect(response.body).toBeInstanceOf(Array);
  });
});
