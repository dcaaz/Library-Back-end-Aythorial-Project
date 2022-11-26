import { ObjectId } from "mongodb";
import { cartCollection, productsCollection } from "../database/db.js";

//colocar itens no carrinho!
//precisa receber o produto no body e token no headers
export async function postCart(req, res) {
  const product = req.body;
  const user = res.locals.user;

  try {
    //colocado no carrinho com o id do usuário, para que, quando quiser dar o get, pegar somente os itens do carrinho *daquele usuário*
    await cartCollection.insertOne({ ...product, userId: user._id });
    return res.status(200).send("Produto postado com suceso.");
  } catch (err) {
    console.log(err);
  }
}

export async function getCart(req, res) {
  const user = res.locals.user;
  try {
    const userCartProducts = await cartCollection.find({ userId: user._id });
    return res.status(200).send(userCartProducts);
  } catch (err) {
    console.log(err)
  }
}
//enviado o id do item (id que o mongo cria)
export async function deleteItemsCart(req, res) {
  const user = res.locals.user;
  const id = req.params;
  try{
    const userCartProducts = await cartCollection.find({ userId: user._id });
    if (!userCartProducts){
      return res.status(404).send("Não foram encontrados produtos no carrinho desse usuário")
    }
    await cartCollection.deleteOne({_id: ObjectId(id)});
    res.status(200).send("Item deletado com sucesso")
  }catch(err){
    console.log(err)
  }
}

//postar venda
// informação pelo body: objeto com informação do cliente e array contendo os ids dos objetos comprados
/* export async function postSale(req,res){
  const info = req.body
  try{


  }catch(err){
    console.log(err)
  }
}
 */