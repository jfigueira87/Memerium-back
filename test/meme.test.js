import request from 'supertest';
import app from '../app.js';

//test get all


// Ejemplo de prueba
test('Debería devolver un error 400 si el título está vacío', async () => {
  const response = await request(app)
    .post('/api/meme')
    .send({
      title: '', // Campo vacío para provocar error
      category: 'Humor',
      tags: 'divertido',
      url: 'https://example.com/meme.jpg'
    });

  expect(response.statusCode).toBe(400);
  expect(response.body.errors[0].msg).toBe('El título es obligatorio');
});
