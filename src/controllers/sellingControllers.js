import { ObjectId } from "mongodb";
import { productsCollection, salesCollection } from "../database/db.js";
import dayjs from "dayjs";

//info que vem do body: objeto contendo informação do cliente e contendo array com os objetos comprados
export async function postSale(req, res) {
  const { clientInfo, boughtItems } = req.body;
  const user = res.locals.user;

  try {
    boughtItems.forEach(async (item) => {
      const product = await productsCollection.findOne({
        _id: ObjectId(item._id),
      });
      if (!product) {
        return res
          .status(404)
          .send(
            "O produto a ser comprado não foi encontrado na base de dados!"
          );
      }
      const plusOneSale = (product.sales += 1);
      await productsCollection.updateOne(
        { _id: ObjectId(item._id) },
        { $set: { sales: plusOneSale } }
      );
    });
    const sale = {
      userId: user._id,
      clientInfo: clientInfo,
      boughtItems: boughtItems,
      purchaseDate: `${dayjs().date()}/${
        dayjs().month() + 1
      }/${dayjs().year()}`,
    };
    await salesCollection.insertOne(sale);
    res.status(200).send("Venda feita com sucesso!");
  } catch (err) {
    console.log(err);
  }
}

/* {
  clientInfo: {name: "exampleName", telefone: "9999999", address: "rua x, cidade x, estado x, país", salePrice: "R$xx,xx"},
  boughtItems: [
    {item1},
    {item2},
    {item3}
  ]
} */
