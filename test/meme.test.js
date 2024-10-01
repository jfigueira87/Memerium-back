import request from "supertest";
import express from "express";
import {
  getMemes,
  getMeme,
  createMeme,
  updateMeme,
  deleteMeme,
} from "../controllers/memeController.js";
import { memeValidationRules, handleValidationErrors } from "../validators/memeValidators.js"; // Importar validaciones
import memeModel from "../models/memeModel.js";

const app = express();
app.use(express.json());

// Rutas de la aplicación para testeo
app.put("/memes/:id", updateMeme);
app.post("/memes", memeValidationRules, handleValidationErrors, createMeme); // Agregar la validación y manejo de errores

jest.mock("../models/memeModel");

// Test para el método PUT (ya existente)
describe("PUT /memes/:id", () => {
  it("Debe actualizar un meme y devolverlo", async () => {
    const mockMeme = {
      id: 1,
      title: "Título actualizado",
      category: "Categoría actualizada",
      tags: ["Tag actualizado"],
      url: "http://updated.com",
    };
    memeModel.update.mockResolvedValue([1]);
    memeModel.findOne.mockResolvedValue(mockMeme);

    const response = await request(app).put("/memes/1").send(mockMeme);

    expect(response.status).toBe(200);
    expect(response.body).toEqual(mockMeme);
  });

  it("Debe devolver un error 404 si no se encuentra el meme", async () => {
    memeModel.update.mockResolvedValue([0]);

    const response = await request(app)
      .put("/memes/1")
      .send({
        title: "Título actualizado",
        category: "Categoría actualizada",
        tags: ["Tag actualizado"],
        url: "http://updated.com",
      });

    expect(response.status).toBe(404);
    expect(response.body).toEqual({ message: "Meme no encontrado." });
  });

  it("should return 500 if there is an error", async () => {
    memeModel.update.mockRejectedValue(new Error("Error en la base de datos"));

    const response = await request(app)
      .put("/memes/1")
      .send({
        title: "Título actualizado",
        category: "Categoría actualizada",
        tags: ["Tag actualizado"],
        url: "http://updated.com",
      });

    expect(response.status).toBe(500);
    expect(response.body).toEqual({
      error: "Error actualizando meme",
      details: "Error en la base de datos",
    });
  });
});

// Test para el método POST (nuevo)
describe("POST /memes", () => {
  it("Debe crear un meme y devolverlo", async () => {
    const newMeme = {
      title: "Nuevo Meme",
      category: "Humor",
      tags: ["gracioso"],
      url: "http://example.com/meme.jpg",
    };

    // Simular la creación exitosa del meme
    memeModel.create.mockResolvedValue(newMeme);

    const response = await request(app).post("/memes").send(newMeme);

    expect(response.status).toBe(201); // Código 201 para creación exitosa
    expect(response.body).toEqual(newMeme);
  });

  it("Debe devolver un error 400 si falta información requerida", async () => {
    const incompleteMeme = {
      category: "Humor",
      tags: ["gracioso"],
      url: "http://example.com/meme.jpg",
    };

    // No mockeamos `create` ya que no debería llamarse con datos incompletos
    const response = await request(app).post("/memes").send(incompleteMeme);

    expect(response.status).toBe(400); // Código 400 para validación fallida
    expect(response.body.errors).toBeDefined(); // Esperamos que haya errores de validación
  });

  it("Debe devolver un error 500 si hay un problema con la base de datos", async () => {
    const newMeme = {
      title: "Nuevo Meme",
      category: "Humor",
      tags: ["gracioso"],
      url: "http://example.com/meme.jpg",
    };

    // Simular un error en la base de datos
    memeModel.create.mockRejectedValue(new Error("Error en la base de datos"));

    const response = await request(app).post("/memes").send(newMeme);

    expect(response.status).toBe(500); // Código 500 para errores del servidor
    expect(response.body).toEqual({
      message: "Hubo un error al crear el meme",
      error: "Error en la base de datos",
    });
  });
});
