const { check } = require('express-validator');

const memeValidationRules = [
  check('title')
    .notEmpty().withMessage('El título es obligatorio')
    .isLength({ min: 3 }).withMessage('El título debe tener al menos 3 caracteres'),
  
  check('category')
    .notEmpty().withMessage('La categoría es obligatoria'),
  
  check('tags')
    .notEmpty().withMessage('Las etiquetas son obligatorias'),
  
  check('url')
    .notEmpty().withMessage('La URL es obligatoria')
    .isURL().withMessage('La URL debe ser válida')
];

module.exports = { memeValidationRules };
