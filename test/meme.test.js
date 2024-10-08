// import request from "supertest";
// import express from "express";
// import { handleValidationErrors } from "../utils/handleValidator.js";
// import { memeValidationRules } from "../validators/memeValidators.js";
// import {
//   getMemes,
//   getMeme,
//   createMeme,
//   updateMeme,
//   deleteMeme,
// } from "../controllers/memeController.js";
// import memeModel from "../models/memeModel.js";
// import { app, server } from "../app.js";
// import conection_db from "../database/db.js";

// app.use(express.json());

// // Rutas de la aplicación para testeo
// app.get("/memes", getMemes);
// app.get("/meme/:id", getMeme);
// app.post("/meme", memeValidationRules, handleValidationErrors, createMeme);
// app.put("/meme/:id", updateMeme);
// app.delete("/meme/:id", deleteMeme);

// jest.mock("../models/memeModel");

// describe("Meme Controller Tests", () => {
//   // Test para GET /memes (getMemes)
//   describe("GET /memes", () => {
//     test("Debe devolver todos los memes", async () => {
//       // Preparar los datos mock
//       const mockMemes = [
//         { id: 1, name: "Meme 1" },
//         { id: 2, name: "Meme 2" },
//       ];
//       // Simular la respuesta de la base de datos
//       memeModel.findAll.mockResolvedValue(mockMemes);

//       // Realizar la petición
//       const response = await request(app).get("/memes");

//       // Verificar la respuesta
//       expect(response.status).toBe(200);
//       expect(response.body).toEqual(mockMemes);
//     });

//     test("Debe manejar errores", async () => {
//       // Simular un error en la base de datos
//       memeModel.findAll.mockRejectedValue(new Error("Database error"));

//       // Realizar la petición
//       const response = await request(app).get("/memes");

//       // Verificar la respuesta de error
//       expect(response.status).toBe(500);
//       expect(response.body).toHaveProperty("error");
//     });
//   });

//   // Test para GET /meme/:id (getMeme)
//   describe("GET /meme/:id", () => {
//     test("Debe devolver un meme específico", async () => {
//       // Preparar el dato mock
//       const mockMeme = { id: 1, name: "Meme 1" };
//       // Simular la respuesta de la base de datos
//       memeModel.findOne.mockResolvedValue(mockMeme);

//       // Realizar la petición
//       const response = await request(app).get("/meme/1");

//       // Verificar la respuesta
//       expect(response.status).toBe(200);
//       expect(response.body).toEqual(mockMeme);
//     });

//     test("Debe manejar meme no encontrado", async () => {
//       // Simular meme no encontrado
//       memeModel.findOne.mockResolvedValue(null);

//       // Realizar la petición
//       const response = await request(app).get("/meme/999");

//       // Verificar la respuesta
//       expect(response.status).toBe(404);
//       expect(response.body).toBe("Meme no encontrado");
//     });
//   });

//   // Test para POST /meme (createMeme)
//   describe("POST /meme", () => {
//     test("Debe crear un nuevo meme", async () => {
//       // Preparar los datos para crear un meme
//       const newMeme = {
//         name: "Nuevo Meme",
//         category: "Humor",
//         tags: ["gracioso"],
//         url: "http://example.com/meme.jpg",
//       };
//       // Simular la creación en la base de datos
//       memeModel.create.mockResolvedValue({ id: 1, ...newMeme });

//       // Realizar la petición
//       const response = await request(app).post("/meme").send(newMeme);

//       // Verificar la respuesta
//       expect(response.status).toBe(201);
//       expect(response.body).toHaveProperty("id");
//       expect(response.body.name).toBe(newMeme.name);
//     });

//     test("Debe manejar errores de validación", async () => {
//       // Enviar datos incompletos
//       const incompleteMeme = { name: "Meme sin datos suficientes" };

//       // Realizar la petición
//       const response = await request(app).post("/meme").send(incompleteMeme);

//       // Verificar la respuesta de error de validación
//       expect(response.status).toBe(400);
//       expect(response.body).toHaveProperty("errors");
//     });
//   });

//   // Test para PUT /meme/:id (updateMeme)
//   describe("PUT /meme/:id", () => {
//     test("Debe actualizar un meme existente", async () => {
//       // Preparar los datos para actualizar
//       const updatedMeme = {
//         name: "Meme Actualizado",
//         category: "Nuevo Humor",
//         tags: ["actualizado"],
//         url: "http://example.com/updated.jpg",
//       };
//       // Simular la actualización en la base de datos
//       memeModel.update.mockResolvedValue([1]);
//       memeModel.findOne.mockResolvedValue({ id: 1, ...updatedMeme });

//       // Realizar la petición
//       const response = await request(app).put("/meme/1").send(updatedMeme);

//       // Verificar la respuesta
//       expect(response.status).toBe(200);
//       expect(response.body.name).toBe(updatedMeme.name);
//     });

//     test("Debe manejar meme no encontrado para actualizar", async () => {
//       // Simular meme no encontrado
//       memeModel.update.mockResolvedValue([0]);

//       // Realizar la petición
//       const response = await request(app)
//         .put("/meme/999")
//         .send({ name: "Meme Inexistente" });

//       // Verificar la respuesta
//       expect(response.status).toBe(404);
//       expect(response.body).toHaveProperty("message", "Meme no encontrado.");
//     });
//   });

//   // Test para DELETE /meme/:id (deleteMeme)
//   describe("DELETE /meme/:id", () => {
//     test("Debe eliminar un meme existente", async () => {
//       // Simular la existencia y eliminación del meme
//       memeModel.findOne.mockResolvedValue({ id: 1, destroy: jest.fn() });

//       // Realizar la petición
//       const response = await request(app).delete("/meme/1");

//       // Verificar la respuesta
//       expect(response.status).toBe(204);
//     });

//     test("Debe manejar meme no encontrado para eliminar", async () => {
//       // Simular meme no encontrado
//       memeModel.findOne.mockResolvedValue(null);

//       // Realizar la petición
//       const response = await request(app).delete("/meme/999");

//       // Verificar la respuesta
//       expect(response.status).toBe(404);
//       expect(response.body).toHaveProperty("message", "No se encuentra el meme");
//     });
//   });
// });

// afterAll(async () => {
//   await server.close();
//   await conection_db.close();
// });
