const ProductMaster = require('../controllers/productcontroller');

module.exports = app => {
    app.post("/api/v1/create_product", ProductMaster.create_product);
    app.get("/api/v1/getAllproduct/:id?", ProductMaster.getAllproduct);
    app.put("/api/v1/update_product/:id", ProductMaster.update_product);
    app.delete("/api/v1/delete_product/:id", ProductMaster.delete_product);
    app.put("/api/v1/productStatus/:id", ProductMaster.productStatus);
}