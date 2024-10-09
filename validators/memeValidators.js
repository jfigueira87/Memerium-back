import { validationResult } from 'express-validator';
import { body, param } from 'express-validator';

export const handleValidation = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).send(errors.array()[0].msg);
    }
    next();
  };

  export const validateCreateOrUpdate = [
    body('name')
      .notEmpty()
      .withMessage('🚨El título es obligatorio🚨')
      .isString()
      .withMessage('🚨El título debe ser un texto🚨'),
    body('category')
      .notEmpty()
      .withMessage('🚨La categoría es obligatoria🚨')
      .isString()
      .withMessage('🚨La categoría debe ser un texto🚨'),
    body('tags')
      .notEmpty()
      .withMessage('🚨Los tags son obligatorios🚨')
      .isString()
      .withMessage('🚨Los tags deben ser un texto🚨'),
    body('url')
      .notEmpty()
      .withMessage('🚨La URL es obligatoria🚨')
      .isURL()
      .withMessage('🚨Debe proporcionar una URL válida🚨')
  ];
  
  // Validaciones para rutas que incluyen el ID como parámetro
  export const validateIdParam = [
    param('id')
      .isString()
      .withMessage('🚨El ID debe ser una cadena de texto🚨')
  ];