import joi from "joi";

const saleModel = joi.object({
    transactionInfo: joi.object().required(),
    boughtItems: joi.array().required(),
    userInfo: joi.object().required()
});

export default saleModel;