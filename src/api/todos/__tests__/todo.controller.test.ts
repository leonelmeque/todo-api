import request from 'supertest';
import app from '../../../app';

describe('Todo API', () => {
  it('should create a new todo', async () => {
    const response = await request(app)
      .post('/api/v1/todos/create')
      .send({
        name: 'Test Todo',
        description: 'This is a test todo',
        creator: 'b7e23ec2-07f2-49a5-b663-99b8a52a4627',
        restrictedTo: ['b7e23ec2-07f2-49a5-b663-99b8a52a4627']
      });
    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('uuid');
  });

  it('should get all todos', async () => {
    const response = await request(app).get('/api/v1/todos');
    expect(response.status).toBe(200);
    expect(response.body).toBeInstanceOf(Array);
  });
});
