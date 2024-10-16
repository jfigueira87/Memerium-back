import request from "supertest";
import memeModel from "../models/memeModel";
import { app, server } from "../app.js";


describe("Meme CRUD Tests", () => {

         
        //  afterAll(async () => {
        //     await server.close();
        // });

        afterEach(async () => {
            // Limpiar la base de datos después de cada prueba
            await memeModel.destroy({ where: {name: 'test'} });
        });

        describe('POST meme',()=>{
            test("Debe crear un nuevo meme", async () => {
                const newMeme = {
                        name: "test",
                        category: "Humor",
                        tags: "divertido, meme",
                        url: "http://link-a-la-imagen.com/meme.jpg"
                };
    
                // simulamos la petición POST a /meme
                const response = await request(app).post("/meme").send(newMeme);
    
                expect(response.status).toBe(201);
            })   
        })


        describe('PUT /meme/:id', () => {
            test("Debe actualizar un meme existente", async () => {
              // creamos un meme para actualizar
              const meme = await memeModel.create({
                name: "test",
                category: "Humor",
                tags: "gracioso",
                url: "http://link-a-la-imagen.com/meme.jpg"
              });
          
              const updatedMeme = {
                name: "test",
                category: "Humor actual",
                tags: "gracioso, meme actualizado",
                url: "http://link-a-la-imagen.com/meme-actualizado.jpg"
              };
              
              // Simulamos la petición PUT a /meme/1 (con el ID del meme)
              const response = await request(app).put(`/meme/${meme.id}`).send(updatedMeme);
          
              expect(response.status).toBe(200);  // Esperamos un 200 para actualización exitosa
            });
          });
          
          

        describe('GET meme',()=>{
            test("Debe devolver todos los memes", async () => {

                // la petición GET a /meme
                const response = await request(app).get("/meme");
                expect(response.status).toBe(200);
                expect(response.body).toBeInstanceOf(Array);
                expect(response.headers["content-type"]).toMatch(/json/);
            })
        })

        describe('DELETE', ()=>{


            test('Debe eliminar un meme', async () => {

                const meme_for_delete = await memeModel.create({
                    name: "test",
                    category: "Humor",
                    tags: "divertido, meme",
                    url: "http://link-a-la-imagen.com/meme.jpg"
                });

                //esta línea hace a petición delete
                const response = await request(app).delete(`/meme/${meme_for_delete.id}`);
                expect(response.status).toBe(200);
            })
        })


           
})