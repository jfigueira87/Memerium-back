import { check, validationResult, body, param } from 'express-validator';

// Middleware para manejar errores de validación
export const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};

// Validaciones para crear un meme (POST)
export const memeValidationRules = [
  check('title')
    .notEmpty().withMessage('El título es obligatorio')
    .isLength({ min: 3 }).withMessage('El título debe tener al menos 3 caracteres'),
  
  check('category')
    .notEmpty().withMessage('La categoría es obligatoria')
    .isLength({ min: 3 }).withMessage('La categoría debe tener al menos 3 caracteres'),
    
  check('tags')
    .notEmpty().withMessage('Las etiquetas son obligatorias')
    .isLength({ min: 3 }).withMessage('La etiqueta debe tener al menos 3 caracteres'),
  
  check('url')
    .notEmpty().withMessage('La URL es obligatoria')
    .isURL({
      protocols: ['http', 'https'], // Asegura que sea http o https
      require_protocol: true,        // Requiere que incluya el protocolo (http/https)
      require_valid_protocol: true,  // Solo acepta protocolos válidos
      allow_underscores: true,       // Permite guiones bajos en el dominio
    }).withMessage('La URL debe ser válida y comenzar con http o https')
];

// Validaciones para actualizar un meme (PUT)
export const validateCreateOrUpdate = [
  body('title')
    .optional()
    .isString()
    .withMessage('🚨El título debe ser un texto🚨'),
  body('category')
    .optional()
    .isString()
    .withMessage('🚨La categoría debe ser un texto🚨'),
  body('tags')
    .optional()
    .isString()
    .withMessage('🚨Los tags deben ser un texto🚨'),
  body('url')
    .optional()
    .isURL()
    .withMessage('🚨Debe proporcionar una URL válida🚨')
];

// Validaciones para rutas que incluyen el ID como parámetro
export const validateIdParam = [
  param('id')
    .isInt()
    .withMessage('🚨El ID debe ser un número entero🚨')
];
