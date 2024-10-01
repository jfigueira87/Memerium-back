import { validationResult } from "express-validator";

const validateResult = (req, res, next) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        return res.status(403).json(errors)
    } else {
        return next()
    }
};

export default validateResult;
