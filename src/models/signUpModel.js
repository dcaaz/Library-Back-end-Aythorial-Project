import joi from "joi";

export const signUpSchema = joi.object({
    name: joi.string().required().min(3),
    email: joi.string().email().required(),
    password: joi.string().required(),
    imageURL: joi.string().uri(),
    type: joi.string().valid("admin", "user"),
});