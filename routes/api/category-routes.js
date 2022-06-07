const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', async (req, res) => {
  // find all categories
  // be sure to include its associated Products
  Category.findAll({
    include: {
      model: Product,
      attributes: ['id', 'product_name', 'price', 'stock', 'category_id']
    }
  })
  .then(CategoryResponse => res.json(CategoryResponse))
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  })
});

router.get('/:id', async (req, res) => {
  // find one category by its `id` value
  // be sure to include its associated Products
  Category.findOne({
    where: {
      id: req.params.id
    },
    include: {
      model: Product,
      attributes: ['id', 'product_name', 'price', 'stock', 'category_id']
    }
  })
  .then(CategoryResponse => res.json(CategoryResponse))
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  })
});

router.post('/', async (req, res) => {
  // create a new category
  Category.create({
    category_name: req.body.category_name
  })
  .then(CategoryResponse => res.json(CategoryResponse))
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  })
});

router.put('/:id', async (req, res) => {
  // update a category by its `id` value
  Category.update(req.body, {
    individualHooks: true,
    where: {
      id: req.params.id
    }
  })
  .then(CategoryResponse => {
    console.log(CategoryResponse);
    if (CategoryResponse.length < 1) {
      res.status(404).json({ Message: 'No category with ID provided.' });
      return;
    }
    res.json(CategoryResponse);
  })
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  })
});

router.delete('/:id', async (req, res) => {
  // delete a category by its `id` value
  Category.destroy({
    where: {
      id: req.params.id
    }
  }).then(CategoryResponse => {
    if (CategoryResponse.length < 1) {
      res.status(404).json({ Message: 'No category with ID provided.' });
      return;
    }
    res.json(CategoryResponse);
  })
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  })
});

module.exports = router;
