import joi from "joi";

const saleModel = joi.object({
    clientInfo: joi.object({
        name: joi.string().required(),
        telefone: joi.number().required().min(11).telefone(),
        address: joi.string().required().min(8),
        salePrice: joi.string().required()
    }),
    boughtItems: joi.array().required()
});

export default saleModel;