import request from 'supertest';
import app from '../app';

describe('GET /api/todo', () => {
  it('should return 200 OK', async () => {
    const res = await request(app).get('/api/todo');
    expect(res.status).toBe(200);
  });
});