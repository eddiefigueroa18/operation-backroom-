// import models
const Product = require('./Product');
const Category = require('./Category');
const Tag = require('./Tag');
const ProductTag = require('./ProductTag');

// Products belongsTo Category
Product.belongsTo(Category, {
  foreignKey: "category_id",
});

// Categories have many Products
Product.hasMany(Product, {
  foreignKey: "category_id",
});

// Products belongToMany Tags (through ProductTag)
Product.belongToMany(Tag, {
  through: "ProductTag",
});

// Tags belongToMany Products (through ProductTag)
Product.belongsToMany(Product, {
  through: "ProductTag",
});

module.exports = {
  Product,
  Category,
  Tag,
  ProductTag,
};