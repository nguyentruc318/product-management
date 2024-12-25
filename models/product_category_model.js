const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const slug = require("mongoose-slug-generator");
mongoose.plugin(slug);
const productCategorySchema = new Schema(
  {
    title: { type: String, required: true },
    parent_id: { type: String, default: "" },
    slug: { type: String, slug: "title", unique: true },
    thumbnail: String,
    description: String,
    position: Number,
    status: String,
    deleted: { type: Boolean, default: false },
    deletedAt: { type: Date, default: null },
  },
  { timestamps: true }
);
const ProductCategory = mongoose.model(
  "ProductCategory",
  productCategorySchema,
  "product-category"
);
module.exports = ProductCategory;
