import request from "supertest";
import express from "express";
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
app.put("/memes/:id", updateMeme);

jest.mock("../models/memeModel");

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