import signInModel from "../models/signInModel.js";

export async function SignInModelValidation(req, res, next) {
  const signIn = req.body;
  if (!signIn){
    return res.status(400).send("Não foi enviada nenhuma informação para que pudesse ser efetuado o login.")
  }
  const { error } = signInModel.validate(signIn, { abortEarly: false });
  if (error) {
    const errors = error.details.map((detail) => detail.message);
    return res.status(400).send(errors);
  }

  next();
}
