import { check } from "express-validator";
import validateResult from "../helpers/validateHelper.js";

export const validateCreate = [
  check("name", "Este campo es obligatorio")
  .exists()
  .isString()
  .notEmpty(),
  check("category", "Este campo es obligatorio")
  .exists()
  .isString()
  .notEmpty(),
  check("tags", "Este campo es obligatorio")
  .exists()
  .isString()
  .notEmpty(),
  check("url", "Tienes que introducir una URL válida").
  exists().
  notEmpty().
  isURL(),
  (req, res, next) => {
    validateResult(req, res, next)
  },
];

export const validateGetOne = [
    check("id", "El valor debe ser numerico")
    .exists()
    .isNumeric()
    .notEmpty(),
    (req, res, next) => {
        validateResult(req, res, next)
      },
]

