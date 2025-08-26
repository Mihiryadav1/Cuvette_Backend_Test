import mongoose from "mongoose";

const bookSchema = new mongoose.Schema({
  title: { type: String, required: true },
  author: { type: String, required: true },
  genere: { type: String, required: true },
  price: { type: Number, required: true },
  inStock: { type: Boolean, default: true },
});
const Book = mongoose.model("Book", bookSchema);
export default Book;
