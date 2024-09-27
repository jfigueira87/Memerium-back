import { check } from 'express-validator';

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
      allow_underscores: false,      // No permite guiones bajos en el dominio
      host_whitelist: [              // Opción para validar solo ciertos dominios si lo necesitas
        '.com', '.net', '.org', '.io' // Estos son ejemplos, ajusta según tu necesidad
      ],
    }).withMessage('La URL debe ser válida y comenzar con http o https')
];
