import request from "supertest";
import app from "../../../app";
import { authToken } from '../../../../testUtils/auth';
import { mockedUser } from '../../../../testUtils/mocks/user.mocks';

describe('User API', () => {
  it('should create a new todo',async ()=> {
    const response = await request(app)
      .post('/api/v1/users/create')
      .auth(authToken, {type: 'bearer'})
      .send(mockedUser)
    expect(response.status).toBe(201)
    expect(response.body).toHaveProperty('uuid')
  })

  it('should get a user by id', async ()=> {
    const response = await request(app)
      .get(`/api/v1/users/${mockedUser.uuid}`)
      .auth(authToken, {type: 'bearer'})
    expect(response.status).toBe(200)
    expect(response.body).toHaveProperty('username')
  })

  it('should update a user', async ()=> {
    const response = await request(app)
      .put(`/api/v1/users/${mockedUser.uuid}`)
      .auth(authToken, {type: 'bearer'})
      .send({firstName: 'John'})
    expect(response.status).toBe(200)
    expect(response.body).toHaveProperty('username')
  })

  it('should delete a user', async ()=> {
    const response = await request(app)
      .delete(`/api/v1/users/delete`)
      .auth(authToken, {type: 'bearer'})
      .send({uuid: mockedUser.uuid})
    expect(response.status).toBe(200)
    expect(response.body).toHaveProperty('message')
  })
});
