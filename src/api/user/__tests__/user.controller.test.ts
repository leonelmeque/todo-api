import request from "supertest";
import app from "../../../app";
import { User } from "../user.model";
import { authToken } from '../../../../testUtils/auth';

describe('User API', () => {
  it('should create a new todo',async ()=> {
    const response = await request(app)
      .post('/api/v1/users/create')
      .auth(authToken, {type: 'bearer'})
      .send({
        age: 20,
        firstName: "Doe",
        username: "jhondoe",
        lastName: "Jhon"
      } as User)
    expect(response.status).toBe(201)
    expect(response.body).toHaveProperty('uuid')
  })

  it('should get all users', async () => {
    const response = await request(app)
      .get('/api/v1/users/').
      auth(authToken, {type: 'bearer'})

    expect(response.status).toBe(201)
    expect(response.body).toBeInstanceOf(Array)
  })
});
