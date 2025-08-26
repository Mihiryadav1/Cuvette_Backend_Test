import Book from "../models/bookSchema.model.js";

// Create a new book
export const createBook = async (req, res) => {
  try {
    const { title, author, genere, price, inStock } = req.body;
    if (!title || !author || !genere || !price) {
      return res.status(400).json({
        message: "All fields are required",
      });
    }
    // if all fields are present
    const newBook = new Book({
      title,
      author,
      genere,
      price,
      inStock: inStock || true,
    });
    await newBook.save();

    return res.status(201).json({
      message: "Book created successfully",
    });
  } catch (error) {
    return res.status(500).json({
      message: "Error creating book",
    });
  }
};

// update a book
export const updateBook = async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    if (!book) {
      return res.status(404).json({
        message: "Book not found",
      });
    }
    // taking update data from req.body
    const { title, author, genere, price, inStock } = req.body;
    book.title = title || book.title;
    book.author = author || book.author;
    book.genere = genere || book.genere;
    book.price = price || book.price;
    book.inStock = inStock ? inStock : book.inStock;

    const updatedBook = await book.save();
    return res.status(200).json({
      message: "Book updated successfully",
      book: updatedBook,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Error updating book",
    });
  }
};

// delete a book by id
export const deleteBook = async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    if (!book) {
      return res.status(404).json({
        message: "Book not found!",
      });
    }
    // delete the book
    await Book.findByIdAndDelete(req.params.id);
    return res.status(200).json({
      message: "Book deleted successfully!",
    });
  } catch (error) {
    return res.status(500).json({
      message: "Error deleting book",
    });
  }
};

// get all books
export const getBooks = async (req, res) => {
  try {
    const books = await Book.find({});
    return res.status(200).json({
      message: "Books fetched successfully!",
      books,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Error fetching books!",
    });
  }
};

//get book using id
export const getBookById = async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    if (!book) {
      return res.status(404).json({
        message: "Book not found!",
      });
    }
    return res.status(200).json({
      message: "Book fetched successfully!",
      success: true,
      book,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Error fetching book",
    });
  }
};
