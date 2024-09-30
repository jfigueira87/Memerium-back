import { check, validationResult } from 'express-validator';

export const validateMemeId = [
    check('id')
      .isInt()
      .withMessage('El ID debe ser un número entero'),
  ];

export const handleValidation = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).send(errors.array()[0].msg);
    }
    next();
  };