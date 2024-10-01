import { validationResult } from 'express-validator';

// Middleware para manejar los errores de validación
export const handleValidationErrors = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      // Cambia a este formato para asegurar que se devuelven los errores como un array
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  };
  