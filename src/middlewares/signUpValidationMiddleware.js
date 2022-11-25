import { signUpSchema } from "../models/userModel.js";

export default function SignUpModelValidation(req, res, next) {
  const { name, email, password, imageURL } = req.body;
  const validation = signUpSchema.validate(
    { name, email, password, imageURL },
    { abortEarly: false }
  );

  if (validation.error) {
    const errors = validation.error.details.map((detail) => detail.message);
    return res.status(400).send(errors);
  }
  next();
}
