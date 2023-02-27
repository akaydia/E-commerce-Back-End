const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint
// GET all categories
router.get('/', async (req, res) => {
  // find all categories
  try { 
    const categoryData = await Category.findAll({
      include: [{ model: Product }],
    });
    res.status(200).json(categoryData);

  } catch (err) {
    res.status(500).json(err);
  } // catch
  // be sure to include its associated Products
  
});

// GET one category by id
router.get('/:id', async (req, res) => {
  // find one category by its `id` value
  try {
    const categoryData = await Category.findByPk(req.params.id, {
      include: [{ model: Product }],
    });
    if (!categoryData) {
      res.status(404).json({ message: 'No category found with this id!' });
      return;
    } // if
    res.status(200).json(categoryData);
  } catch (err) {

  } // catch
  // be sure to include its associated Products
});

// POST create a new category
router.post('/', async (req, res) => {
  // create a new category
  try {
    const categoryData = await Category.create(req.body);
    res.status(200).json(categoryData);
  } catch (err) {
    res.status(400).json(err);
  } // catch
});

// PUT update a category by id
router.put('/:id', async (req, res) => {
  // update a category by its `id` value
  try {
    const categoryData = await Category.update(req.body, {
      where: {
        id: req.params.id,
      },
    });
    if (!categoryData) {
      res.status(404).json({ message: 'No category found with this id!' });
      return;
    } // if
    res.status(200).json(categoryData);
  } catch (err) {
    res.status(400).json(err);
  } // catch
});

// DELETE delete a category by id
router.delete('/:id', async (req, res) => {
  // delete a category by its `id` value
  try {
    const categoryData = await Category.destroy({
      where: {
        id: req.params.id,
      },
    });
    if (!categoryData) {
      res.status(404).json({ message: 'No category found with this id!' });
      return;
    } // if
    res.status(200).json(categoryData);
  } catch (err) {
    res.status(500).json(err);
  } // catch
});

module.exports = router;
