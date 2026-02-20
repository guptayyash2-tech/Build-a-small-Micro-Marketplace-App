const Productmongo = require("../mongodb/Productmongo");




const postProduct = async (req, res) => {
  const { title, description, price, image } = req.body;

  try {
    if (!title || !description || !price || !image) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const newProduct = new Productmongo({
      title,
      description,
      price,
      image
    });

    await newProduct.save();
    res.status(201).json(newProduct);

  } catch (error) {
    res.status(500).json({ message: "Error creating product", error: error.message });
  }
};


// GET all products
const getProducts = async (req, res) => {
  try {
    const products = await Productmongo.find(); // get all products
    res.status(200).json(products);

  } catch (error) {
    res.status(500).json({ message: "Error fetching products", error: error.message });
  }
};

const productid = async (req, res) => {
  const { id } = req.params;
  try {
    const product = await Productmongo.findById(id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ message: "Error fetching product", error: error.message });
  }
};

module.exports = { postProduct, getProducts, productid  };
