import request from "supertest";
import express from "express";
import {handleValidationErrors} from "../utils/handleValidator.js"
import { memeValidationRules} from "../validators/memeValidators.js";
import {
  getMemes,
  getMeme,
  createMeme,
  updateMeme,
  deleteMeme,
} from "../controllers/memeController.js";
import memeModel from "../models/memeModel.js";

const app = express();
app.use(express.json());

// Rutas de la aplicación para testeo
app.put("/meme/:id", updateMeme);
app.post("/meme",memeValidationRules, handleValidationErrors, createMeme); // Agregar la validación y manejo de errores
app.get("/meme/:id", getMeme);
jest.mock("../models/memeModel");

// Test para el método PUT (ya existente)
describe("PUT /meme/:id", () => {
  test("Debe actualizar un meme y devolverlo", async () => {
    const mockMeme = {
      id: 1,
      name: "Título actualizado",
      category: "Categoría actualizada",
      tags: ["Tag actualizado"],
      url: "http://updated.com",
    };
    memeModel.update.mockResolvedValue([1]);
    memeModel.findOne.mockResolvedValue(mockMeme);

    const response = await request(app).put("/meme/1").send(mockMeme);

    expect(response.status).toBe(200);
    expect(response.body).toEqual(mockMeme);
  });

  test("Debe devolver un error 404 si no se encuentra el meme", async () => {
    memeModel.update.mockResolvedValue([0]);

    const response = await request(app)
      .put("/meme/1")
      .send({
        name: "Título actualizado",
        category: "Categoría actualizada",
        tags: ["Tag actualizado"],
        url: "http://updated.com",
      });

    expect(response.status).toBe(404);
    expect(response.body).toEqual({ message: "Meme no encontrado." });
  });

  test("should return 500 if there is an error", async () => {
    memeModel.update.mockRejectedValue(new Error("Error en la base de datos"));

    const response = await request(app)
      .put("/meme/1")
      .send({
        name: "Título actualizado",
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
describe("POST /meme", () => {
  test("Debe crear un meme y devolverlo", async () => {
    const newMeme = {
      name: "Nuevo Meme",
      category: "Humor",
      tags: ["gracioso"],
      url: "http://example.com/meme.jpg",
    };

    // Simular la creación exitosa del meme
    memeModel.create.mockResolvedValue(newMeme);

    const response = await request(app).post("/meme").send(newMeme);

    expect(response.status).toBe(201); // Código 201 para creación exitosa
    expect(response.body).toEqual(newMeme);
  });

  test("Debe devolver un error 400 si falta información requerida", async () => {
    const incompleteMeme = {
      category: "Humor",
      tags: ["gracioso"],
      url: "http://example.com/meme.jpg",
    };

    // No mockeamos `create` ya que no debería llamarse con datos incompletos
    const response = await request(app).post("/meme").send(incompleteMeme);

    expect(response.status).toBe(400); // Código 400 para validación fallida
    expect(response.body.errors).toBeDefined(); // Esperamos que haya errores de validación
  });

  test("Debe devolver un error 500 si hay un problema con la base de datos", async () => {
    const newMeme = {
      name: "Nuevo Meme",
      category: "Humor",
      tags: ["gracioso"],
      url: "http://example.com/meme.jpg",
    };

    // Simular un error en la base de datos
    memeModel.create.mockRejectedValue(new Error("Error en la base de datos"));

    const response = await request(app).post("/meme").send(newMeme);

    expect(response.status).toBe(500); // Código 500 para errores del servidor
    expect(response.body).toEqual({
      message: "Hubo un error al crear el meme",
      error: "Error en la base de datos",
    });
  });
});

//GET ONE BY ID

describe("GET /meme/:id", () => {
  test("Deberia devolver el contenido del ID cuando encuentra el meme existente", async () => {
    const memes = {
      id: 1,
      name: "Madrugon universitario",
      category: "Programacion",
      tags:["Calamardo"],
      url: "https://res.cloudinary.com/dz53okn10/image/upload/v1725877264/calamardo_x1x87v.jpg",

    }
  })
})


// DELETE

describe("DELETE /meme/:id", () =>{
  test("Deberia eliminar el meme", async () => {
    const deleteMeme = {
      id: 1,
      name: "madrugon universitario",
      category:"Programacion",
      tags: ["Calamardo"],
      url: "https://res.cloudinary.com/dz53okn10/image/upload/v1725877264/calamardo_x1x87v.jpg",
    }
  })
})

