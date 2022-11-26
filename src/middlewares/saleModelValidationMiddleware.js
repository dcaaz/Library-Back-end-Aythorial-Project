import saleModel from "../models/saleModel.js";

export default async function SaleModelValidation(req, res, next) {
  const sale = req.body;
  if (!sale) {
    return res
      .status(404)
      .send(
        "Não foi enviado nenhuma informação para que pudesse ser efetuada uma compra!"
      );
  }
  const { error } = saleModel.validate(sale, { abortEarly: false });
  if (error) {
    const errors = error.details.map((detail) => detail.message);
    return res.status(400).send(errors);
  }
  next();
}
