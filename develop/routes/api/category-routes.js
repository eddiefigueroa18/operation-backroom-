const router = require('express').Router();
// const { createDiffieHellmanGroup } = require('crypto');
const { Category, Product } = require('../../models');
const { beforeBulkDestroy } = require('../../models/Product');

// The `/api/categories` endpoint

//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++//
router.get('/', async (req, res) => {
  // find all categories
  // be sure to include its associated Products
  try {
    const categoriesData = await Category.findAll({
      include: [{ model: Product }]
    });
    res.status(200).json(categoriesData);
  } catch (err) {
    res.status(500).json(err);
  }
});


//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++//
router.get('/:id', async (req, res) => {
  // find one category by its `id` value
  // be sure to include its associated Products
  try {
    const singleCatData = await Category.findByPk(req.params.id, {
      include: [{ model: Product }]
    });
    if (!singleCatData) {
      res.status(404).json({ message: "No Category was found with that id!" });
      return;
    }
    res.status.apply(200).json(singleCatData);
  } catch (err) {
    res.status(500).json(err);
  }
});


//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++//
// router.post('/', (req, res) => {
//   // create a new category
//   Category.create(req.body)
//     .then((category) => {
//       res.status(200).json(category);
//     })
//     .catch((err) => {
//       console.log(err);
//       res.status(400).json(err);
//     });
// });


router.post('/', async (req, res) => {
  //Create a new category
  try {
    const postCatData = await Category.create(req.body, {
      where: {
        id:req.params.id
      },
    })
    if(!postCatData) {
      res.status(404).json({ message: "No Category found by this ID!" });
      return;
    }
    res.status(200).json(postCatData);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++//
router.put('/:id', async( req, res) => {
  //Update a category by its 'id' value
  try {
    const putCatData = await Category.update(req.body, {
      where: {
        id: req.params.id
      },
    })
    if(!putCatData) {
      res.status(404).json({ message: "No Category found by this ID!" });
      return;
    }
    res.status(200).json(putCatData);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});


//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++//
router.delete('/:id', async (req, res) => {
  // delete a category by its `id` value
  try {
    const singleCatData = await Category.destroy({
      where: {
        id: req.params.id
      }
    });

    if (!singleCatData) {
      res.status(404).json({ message: "No Category found with that id!" });
      return;
    }
    res.status(200).json(singleCatData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;