import joi from "joi";

export const productSchema = joi.object({
    title: joi.string().required(),
    description: joi.string().required(),
    imageURL: joi.string().uri().required(),
    price: joi.string().required(),
    category: joi.string().required().valid("fantasia", "sci-fi", "biografia", "poesia", "romance", "drama", "ficção", "aventura", "HQ", "infantil", "nacional", "terror", "jovem", "erótico", "comédia", "distopia", "utopia", "diário")
});