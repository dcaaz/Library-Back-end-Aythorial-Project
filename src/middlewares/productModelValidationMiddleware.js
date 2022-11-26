import { productSchema } from "../models/productModel.js";

export default function ProductModelValidation(req,res,next){
    const product = req.body;

    if (!product){
        return res.status(404).send("Não foi enviado nenhum produto para ser colocado no carrinho")
    }

    const {error} = productSchema.validate(product, {abortEarly: false});

    if (error){
        const errors= error.details.map(detail => detail.message);
        return res.status(400).send(errors);
    }

    next()

}