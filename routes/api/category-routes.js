const router = require('express').Router();
const sequelize = require('sequelize');
const { Category, Product, Tag } = require('../../models');

// The `/api/categories` endpoint

router.get('/', async (req, res) => {
  // find all categories
  // be sure to include its associated Products
  const categoryData = await Category.findAll({
    include: [{ model: Product }],
    attributes: ["product_name", "price", "stock", "category_id"],
  });
  return res.json(categoryData);
});

router.get('/:id', async (req, res) => {
  // find one category by its `id` value
  // be sure to include its associated Products
  const categoryData = await Category.findAll({
    where: {
      id: req.params.id,
    },
    attributes: ["id", "category_name"],
    include: {
      model: Product,
      attributes: ["id", "product_name", "price", "stock", "category_id"],
    },
  });
  return res.json(categoryData);
});

router.post('/', async (req, res) => {
  // create a new category
  const categoryData = await Category.create({
    category_name: req.body.category_name,
  });
  return res.json(categoryData)
});

router.put('/:id', async (req, res) => {
  // update a category by its `id` value
  const categoryData = await Category.update(
    {
      where: {
        id: req.body.id,
      },  
    }
  );
  return res.json(categoryData)
});

router.delete('/:id', (req, res) => {
  // delete a category by its `id` value
  const categoryData = await Category.destroy({
    where: {
      id: req.params.id,
    },
  });

  return res.json(categoryData);
});

module.exports = router;
