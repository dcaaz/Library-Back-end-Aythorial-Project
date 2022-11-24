import { signUpSchema } from "../models/userModel.js";

export function userSignUpValidation(req, res, next) {
    const { name, email, password, imageURL, type } = req.body; 
  
    const user = {
      name,
      email,
      password,
      imageURL,
      type: !type ? "user" : type,
    };
  
    const { error } = signUpSchema.validate(user, { abortEarly: false });
  
    if (error) {
      const errors = error.details.map((detail) => detail.message);
      return res.status(400).send(errors);
    }
  
    res.locals.user = user;
  
    next();
  }
