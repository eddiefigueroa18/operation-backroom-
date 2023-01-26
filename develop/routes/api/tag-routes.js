const router = require('express').Router();
const { rmSync } = require('fs');
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint
//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++//

router.get('/', async (req, res) => {
  // find all tags
  // be sure to include its associated Product data
  try {
    const tagData = await Tag.findAll({
      include: [{ model: Product }]
    });
    res.status(200).json(tagData);
  } catch (err) {
    res.status(500).json(err);
  }
});

//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++//

router.get('/:id', async (req, res) => {
  // find a single tag by its `id`
  // be sure to include its associated Product data
  try {
    const singleTagData = await Tag.findByPk(req.params.id, {
      include: [{ model: Product, through: ProductTag }]
    });
    if (!singleTagData) {
      res.status(404),json({ message: "No Tag was found with that id!" });
      return;
    }
    res.status(200).json(singleTagData);
  } catch (err) {
    res.status(500).json(err);
  }
});

//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++//
router.post('/', (req, res) => {
  // create a new tag
  Tag.create(req.body)
    .then((tag) => {
      res.status(200).json(tag);
    })
    .catch((err) => {
      console.log(err);
      res.status(400).json(err);
    });
});


//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++//
// router.put('/:id', (req, res) => {
//   // update a tag's name by its `id` value
//   Tag.update(req.body)
//     .then((tag) => {
//       res.status(200).json(tag);
//     })
//     .catch((err) => {
//       console.log(err);
//       res.status(400).json(err);
//     });
// });

router.put('/:id', async (req, res) => {
  //update a tag's name by its 'id' value
  try {
    const updateTagData = await Tag.update(req.body, {
      where: {
        id: req.params.id
      },
    })
    if(!updateTagData) {
      res.status(404).json({ message: "No tag found by that ID!" });
      return;
    }
    res.status(200).json(updateTagData);
  } catch (err) {
    console.log(err)
    res.status(500).json(err)
  }
});

//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++//
router.delete('/:id', async (req, res) => {
  // delete on tag by its `id` value
  try {
    const singleTagData = await Tag.destroy({
      where: {
        id: req.params.id
      }
    });
    if (!singleTagData) {
      rmSync.status(404).json({ message: "No tag found with that id!" });
      return;
    }
    res.status(200).json(singleTagData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;