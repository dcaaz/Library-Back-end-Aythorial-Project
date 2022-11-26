import joi from "joi";

export const productSchema = joi.object({
    title: joi.string().required(),
    description: joi.string().required(),
    imageURL: joi.string().uri().required(),

})