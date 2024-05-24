import express from "express";

const app = express();
app.use(express.json());

app.get("/", (req, res) =>{
    res.status(200).send("Funcionando");
});

const cardapio = [
    {
        id:1,
        produto:"Bolo de Limão",
        preco: 14.90
    },
    {
        id:2,
        produto: "Banoffe",
        preco: 30.00
    },
    {
        id:3,
        produto: "Café",
        preco: 1.00
    },
    {
        id:4,
        produto: "Coxinha",
        preco: 2.00
    },
    {
        id:5,
        produto: "Carolina",
        preco: 3.00
    }
]

function buscaProduto(id){
    return cardapio.findIndex(cardapio =>{
        return cardapio.id === Number(id);
    })
}

app.route("/cardapio")
    .get((req, res) =>{
        res.status(200).json(cardapio);
    })
    .post((req, res) =>{
        cardapio.push(req.body);
        res.status(201).send("Cadastro do produto concluído!")
    })

app.route("/cardapio/:id")
    .get((req, res) =>{
        const id = buscaProduto(req.params.id);
        res.status(200).json(cardapio[id]);
    })

    .put((req, res) =>{
        const id = buscaProduto(req.params.id);
        cardapio[id].produto = req.body.produto;
        cardapio[id].preco = req.body.preco;
        res.status(200).json(cardapio[id]);
    })

    .delete((req, res) =>{
        const id = buscaProduto(req.params.id);
        if(cardapio[id]){
            cardapio.splice(id, 1);
            res.status(200).send("Removido com sucesso!");
        }else{
            res.status(400).send("Produto não encontrado!")
        }
    })

    export default app;