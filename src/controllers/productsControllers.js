import { productsCollection } from "../database/db.js";

//recebem token do headers, que é avaliado pelo middleware tokenValidation

//apenas para admins
export async function postProducts(req, res) {
    const product = req.body;

    try{
        await productsCollection.insertOne({...product, sales: 0})
        return res.status(200).send("Produto adicionado com sucesso!")
    }catch (err){
        console.log(err)
    }
}

//não precisa de token, porque qualquer um pode entrar em /market e ver os produtos, mesmo sem estar logado
export async function getProducts(req, res) {
    try{
        const allProducts = await productsCollection.find().toArray()
        return res.status(201).send(allProducts)
    }catch(err){
        console.log(err)
    }
}

//pesquisa por input
export async function getSearchedProducts(req, res) {

}
