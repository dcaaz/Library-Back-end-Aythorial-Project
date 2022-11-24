import joi from "joi";

export const bookSchema = joi.object({
  nameBook: joi.string().required().min(3),
  nameAuthor: joi.string().required().min(3),
  value: joi.number().required(),
  imageURL: joi.string().uri(),
  description: joi.string().required(),
});