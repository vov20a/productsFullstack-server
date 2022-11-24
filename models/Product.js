import mongoose from 'mongoose';

const ProductSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    types: {
      type: Array,
      default: [],
      required: true,
    },
    sizes: {
      type: Array,
      default: [],
      required: true,
    },
    price: {
      type: Number,
      defaul: 0,
      required: true,
    },
    rating: {
      type: Number,
      default: 0,
      required: true,
    },
    categoryId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Category',
      required: true,
    },
    productUrl: String,
  },
  {
    timestamps: true,
  },
);

export default mongoose.model('Product', ProductSchema);
