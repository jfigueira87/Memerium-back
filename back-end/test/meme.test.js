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
app.get("/memes", getMemes);
app.get("/memes/:id", getMeme);
app.post("/memes", createMeme);
app.put("/memes/:id", updateMeme);
app.delete("/memes/:id", deleteMeme);

jest.mock("../models/memeModel");

describe("GET /memes", () => {
  it("should return 200 and a list of memes", async () => {
    const mockMemes = [
      { id: 1, name: "Meme1" },
      { id: 2, name: "Meme2" },
    ];
    memeModel.findAll.mockResolvedValue(mockMemes);

    const response = await request(app).get("/memes");

    expect(response.status).toBe(200);
    expect(response.body).toEqual(mockMemes);
  });

  it("should return 500 if there is an error", async () => {
    memeModel.findAll.mockRejectedValue(new Error("Database error"));

    const response = await request(app).get("/memes");

    expect(response.status).toBe(500);
    expect(response.body).toEqual({
      error: "Ha ocurrido un error mientras se encontraba memes.",
    });
  });
});

describe("Meme Controller", () => {
  describe("GET /memes/:id", () => {
    it("should return 200 and the meme if found", async () => {
      const mockMeme = { id: 1, name: "Meme1" };
      memeModel.findOne.mockResolvedValue(mockMeme);

      const response = await request(app).get("/memes/1");

      expect(response.status).toBe(200);
      expect(response.body).toEqual(mockMeme);
    });

    it("should return 404 if the meme is not found", async () => {
      memeModel.findOne.mockResolvedValue(null);

      const response = await request(app).get("/memes/1");

      expect(response.status).toBe(404);
      expect(response.body).toEqual({ error: "Meme no encontrado." });
    });

    it("should return 500 if there is an error", async () => {
      memeModel.findOne.mockRejectedValue(new Error("Database error"));

      const response = await request(app).get("/memes/1");

      expect(response.status).toBe(500);
      expect(response.body).toEqual({
        error: "Ha ocurrido un error mientras se encontraba un meme.",
      });
    });
  });

  describe("POST /memes", () => {
    it("should create a new meme and return it", async () => {
      const mockMeme = {
        id: 1,
        title: "Meme1",
        category: "Category1",
        tags: ["tag1"],
        url: "http://example.com",
      };
      memeModel.findOne.mockResolvedValue(null);
      memeModel.create.mockResolvedValue(mockMeme);

      const response = await request(app).post("/memes").send(mockMeme);

      expect(response.status).toBe(200);
      expect(response.body).toEqual(mockMeme);
    });

    it("should return 500 if there is an error", async () => {
      memeModel.findOne.mockRejectedValue(new Error("Database error"));

      const response = await request(app)
        .post("/memes")
        .send({
          title: "Meme1",
          category: "Category1",
          tags: ["tag1"],
          url: "http://example.com",
        });

      expect(response.status).toBe(500);
      expect(response.body).toEqual({
        error: "Error creando meme",
        details: "Database error",
      });
    });
  });

  describe("PUT /memes/:id", () => {
    it("should update the meme and return it", async () => {
      const mockMeme = {
        id: 1,
        title: "Updated Meme",
        category: "Updated Category",
        tags: ["updatedTag"],
        url: "http://updated.com",
      };
      memeModel.update.mockResolvedValue([1]);
      memeModel.findOne.mockResolvedValue(mockMeme);

      const response = await request(app).put("/memes/1").send(mockMeme);

      expect(response.status).toBe(200);
      expect(response.body).toEqual(mockMeme);
    });

    it("should return 404 if the meme is not found", async () => {
      memeModel.update.mockResolvedValue([0]);

      const response = await request(app)
        .put("/memes/1")
        .send({
          title: "Updated Meme",
          category: "Updated Category",
          tags: ["updatedTag"],
          url: "http://updated.com",
        });

      expect(response.status).toBe(404);
      expect(response.body).toEqual({ message: "Meme no encontrado." });
    });

    it("should return 500 if there is an error", async () => {
      memeModel.update.mockRejectedValue(new Error("Database error"));

      const response = await request(app)
        .put("/memes/1")
        .send({
          title: "Updated Meme",
          category: "Updated Category",
          tags: ["updatedTag"],
          url: "http://updated.com",
        });

      expect(response.status).toBe(500);
      expect(response.body).toEqual({
        error: "Error actualizando meme",
        details: "Database error",
      });
    });
  });

  describe("DELETE /memes/:id", () => {
    it("should delete the meme and return a success message", async () => {
      memeModel.destroy.mockResolvedValue(1);

      const response = await request(app).delete("/memes/1");

      expect(response.status).toBe(200);
      expect(response.body).toEqual({ message: "Meme borrado con exito." });
    });

    it("should return 404 if the meme is not found", async () => {
      memeModel.destroy.mockResolvedValue(0);

      const response = await request(app).delete("/memes/1");

      expect(response.status).toBe(404);
      expect(response.body).toEqual({ message: "Meme not encontrado." });
    });

    it("should return 500 if there is an error", async () => {
      memeModel.destroy.mockRejectedValue(new Error("Database error"));

      const response = await request(app).delete("/memes/1");

      expect(response.status).toBe(500);
      expect(response.body).toEqual({
        error: "Error borrando meme",
        details: "Database error",
      });
    });
  });
});
