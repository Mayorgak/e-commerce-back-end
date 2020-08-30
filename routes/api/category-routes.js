const router = require("express").Router();
const { Category, Product } = require("../../models");
const sequelize = require ('../../config/connection');

// The `/api/categories` endpoint

router.get("/", (req, res) => {
  Category.findAll({})
  .then(Categorydata => res.json(Categorydata))
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
  });


router.get("/:id",async (req, res) => {
  Category.findOne({
    where: {
      id: req.params.id
    }
  })
.then(Categorydata => {
      if (!Categorydata) {
        res.status(404).json({ message: 'No category found with this id' });
        return;
      }
      res.json(Categorydata);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
  });

router.post("/", (req, res) => {
  // create a new category
  Category.create({
    // id: req.body.id,
    category_name: req.body.category_name

  })
  .then(Categorydata => res.json(Categorydata))
  .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.put("/:id", (req, res) => {
  // update a category by its `id` value
  Category.update(req.body,{
    where:{
      id:req.params.id
    }
})
.then(Categorydata => {
      if (!Categorydata[0]) {
        res.status(404).json({ message: 'No category found with this id' });
        return;
      }
      res.json(Categorydata);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });

});



router.delete("/:id", (req, res) => {
  // delete a category by its `id` value
  Category.destroy({
    where: {
      id: req.params.id
    }
  })
  .then(Categorydata => {
      if (!Categorydata) {
        res.status(404).json({ message: 'No category found with this id' });
        return;
      }
      res.json(Categorydata);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});
 

module.exports = router;
