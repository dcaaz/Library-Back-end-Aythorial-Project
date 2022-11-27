import { ObjectId } from "mongodb";
import { productsCollection } from "../database/db.js";

//não precisa de token, porque qualquer um pode entrar em /market e ver os produtos, mesmo sem estar logado
export async function getProducts(req, res) {
  try {
    const allProducts = await productsCollection.find().toArray();
    return res.status(201).send(allProducts);
  } catch (err) {
    console.log(err);
  }
}

export async function getCategoryProducts(req, res) {
  const category = req.params;

  try {
    const allProducts = await productsCollection.find(category).toArray();
    return res.status(201).send(allProducts);
  } catch (err) {
    console.log(err);
  }
}

//pesquisa por input
export async function getProductById(req, res) {
  const id = req.params;
  console.log(id.bookId);
  try {
    const product = await productsCollection.findOne({
      _id: ObjectId(id.bookId),
    });
    return res.status(200).send(product);
  } catch (err) {
    console.log(err);
  }
}

//apenas para admins
export async function postProducts(req, res) {
  const user = res.locals.user;

  if (user.type !== "admin") {
    return res.status(404).res("Você não tem autorização para fazer isso.");
  }

  const product = req.body;

  try {
    const doesProductExists = await productsCollection.find({
      title: product.title,
    });
    if (doesProductExists) {
      return res.status(400).send("Esse produto já existe.");
    }
    await productsCollection.insertOne({ ...product, sales: 0 });
    res.status(200).send("Produto adicionado com sucesso!");
  } catch (err) {
    console.log(err);
  }
}
