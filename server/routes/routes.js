const products = require('../products');

var appRouter = function (app) {
    app.get("/", function (req, res) {
        res.status(200).send("Welcome to our restful API");
    });

    app.get("/products", function (req, res) {
        res.status(200).send(products);
    });

    app.get("/products/:id", function (req, res) {
        id = req.params.id;
        let chosenProduct = products.filter(p => p.id == id)[0];

        if (chosenProduct) {
            res.status(200).send(chosenProduct);
        } else {
            res.status(400).send({ message: 'invalid id supplied' });
        }
        
    });
}

module.exports = appRouter;