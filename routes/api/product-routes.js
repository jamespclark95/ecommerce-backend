const router = require("express").Router();
const { Product, Category, Tag, ProductTag } = require("../../models");

// The `/api/products` endpoint

// get all products
router.get("/", (req, res) => {
  Product.findAll({
    include: [Category, Tag]
  })
    .then((dbData) => {
      res.json(dbData);
    })
    .catch((error) => res.json(error));
});

// get one product
router.get("/:id", (req, res) => {
  // find a single product by its `id`
  // be sure to include its associated Category and Tag data
  Product.findByPk(req.params.id)
    .then((dbData) => {
      res.json(dbData);
    })
    .catch((err) => res.json(err));
});

// create new product
router.post("/", (req, res) => {
  Product.create(req.body)
    .then((dbData) => res.json(dbData))
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

// update product
router.put("/:id", (req, res) => {
  // update product data
  Product.update(req.body, {
    // All the fields you can update and the data attached to the request body
    where: {
      id: req.params.id,
    },
  })
    .then((dbData) => res.json(dbData))
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});


router.delete("/:id", (req, res) => {
  Product.destroy({
    where: {
      id: req.params.id,
    },
  })
    .then((dbData) => res.status(200).json(dbData))
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

module.exports = router;
