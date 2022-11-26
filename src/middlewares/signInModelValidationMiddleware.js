import signInModel from "../models/signInModel.js";

export async function SignInModelValidation(req, res, next) {
  const signIn = req.body;
  const { error } = signInModel.validate(signIn, { abortEarly: false });
  if (error) {
    const errors = error.details.map((detail) => detail.message);
    return res.status(400).send(errors);
  }

  next();
}
