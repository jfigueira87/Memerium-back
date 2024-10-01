import { body, param } from 'express-validator';

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
      .isURL({protocols: ['http', 'https'], // Asegura que sea http o https
        require_protocol: true,        // Requiere que incluya el protocolo (http/https)
        require_valid_protocol: true,  // Solo acepta protocolos válidos
        allow_underscores: true,       // Permite guiones bajos en el dominio
        })
      .withMessage('🚨Debe proporcionar una URL válida🚨')
  ];
  


// Validaciones para rutas que incluyen el ID como parámetro
export const validateIdParam = [
  param('id')
    .isInt()
    .withMessage('🚨El ID debe ser un número entero🚨')
];
