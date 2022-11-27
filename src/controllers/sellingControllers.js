import { ObjectId } from "mongodb";
import { cartCollection, productsCollection, salesCollection } from "../database/db.js";

//colocar itens no carrinho!
//precisa receber o produto no body e token no headers
// 
export async function postCart(req, res) {
  const product = req.body;
  const user = res.locals.user;

  try {
    //colocado no carrinho com o id do usuário, para que, quando quiser dar o get, pegar somente os itens do carrinho *daquele usuário*
    delete product.description;
    await cartCollection.insertOne({ ...product, userId: user._id  }).toArray();
    return res.status(200).send("Produto postado no carrinho do usuário com suceso.");
  } catch (err) {
    console.log(err);
  }
}

export async function getCart(req, res) {
  const user = res.locals.user;
  try {
    const userCartProducts = await cartCollection.find({ userId: user._id }).toArray();
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
 export async function postSale(req,res){
  const {clientInfo, boughtItems, transactionInfo} = req.body;
  const user = res.locals.user;

  try{
    boughtItems.forEach( async (item) =>  {
      const product = await productsCollection.findOne({_id: item}).toArray()
      const plusOneSale = {sales: product.sales ++};
      await productsCollection.updateOne({_id: item}, {$set: plusOneSale});
    });
    const sale = {
      userId: user._id,
      transactionInfo: transactionInfo,
      boughtItems: boughtItems,
      clientInfo: clientInfo
    };
    await salesCollection.insertOne(sale);
    res.status(200).send("Venda feita com sucesso!")

  }catch(err){
    console.log(err)
  }
}
 //objeto de venda: {userId, transactionInfo, boughtItems, userInfo}
 // transactionInfo: data da compra; tipo de pagamento; tipo de entrega
 // boughtItems: array com os ids dos objetos comprados
 //userInfo: informações que o usuário forneceu para a compra (CPF, CEP, endereço, número de cartão, etc.)