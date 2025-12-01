import cors from "cors";
import express from "express";
import dotenv from "dotenv";
dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const ITEMS = [
  {
    id: 1,
    category: "Mobile",
    brand: "Samsung",
    model: "S23 Ultra",
    description: "This is sample description",
    price: "Rs. 75000",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: 2,
    category: "Mobile",
    brand: "Redmi",
    model: "Redmi Note 9 Pro Max",
    description: "This is sample description",
    price: "Rs. 16000",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: 3,
    category: "Mobile",
    brand: "Samsung",
    model: "J7 NXT",
    description: "This is sample description",
    price: "Rs. 12000",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
];

app.get("/items", (req, res) => {
  res.json({
    success: true,
    data: ITEMS,
    message: "Items fetched successfully",
  });
});

app.post("/items", (req, res) => {
  const { category, brand, model, description, price } = req.body;

  const newId = ITEMS.length > 0 ? ITEMS[ITEMS.length - 1].id + 1 : 1;

  const itemObj = {
    id: newId,
    category,
    brand,
    model,
    description,
    price,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  ITEMS.push(itemObj);

  res.json({
    success: true,
    data: itemObj,
    message: "Item created successfully",
  });
});
app.get("/items/search", (req, res) => {
  const { brand, price } = req.query;

  const filteredItems = ITEMS.filter((item) => {
    if (
      item.brand.toLowerCase().includes(brand.toLowerCase()) &&
      item.price.toLowerCase().includes(price.toLowerCase())
    ) {
      return true;
    }
    return false;
  });

  res.json({
    success: true,
    data: filteredItems,
    message: "Filtered Item Fetched Successfully",
  });
});

app.get("/items/:id", (req, res) => {
  const { id } = req.params;

  const items = ITEMS.find((item) => {
    if (item.id == id) return item;
  });

  if (items) {
    res.json({
      success: true,
      data: items,
      message: "Item fetched successfully",
    });
  } else {
    res.json({
      success: false,
      message: "Item not found",
    });
  }
});

app.delete("/items/:id", (req, res) => {
  const { id } = req.params;

  const items = ITEMS.findIndex((item) => item.id == id);

  if (items === -1) {
    res.json({
      success: false,
      message: "Item not found",
    });
  } else {
    ITEMS.splice(items, 1);
    res.json({
      success: true,
      message: "Item deleted successfully",
    });
  }
});

app.patch("/items/:id", (req, res) => {
  const { id } = req.params;
  const index = ITEMS.findIndex((item) => item.id == id);

  if (index === -1) {
    return res.json({
      success: false,
      message: "Item not found",
    });
  }

  const updatedFields = req.body;

  ITEMS[index] = {
    ...ITEMS[index],        
    ...updatedFields,      
    updatedAt: new Date().toISOString(),
  };

  res.json({
    success: true,
    data: ITEMS[index],
    message: "Item updated successfully",
  });
});


app.put("/items/:id", (req, res) => {
  const { id } = req.params;
  const index = ITEMS.findIndex((item) => item.id == id);

  if (index === -1) {
    return res.json({
      success: false,
      message: "Item not found",
    });
  }
  const { category, brand, model, description, price } = req.body;

  const newObj = {
    id: ITEMS[index].id,
    category,
    brand,
    model,
    description,
    price,
    updatedAt: new Date().toISOString(),
    createdAt: ITEMS[index].createdAt,
  };

  ITEMS[index] = newObj;
  res.json({
    success: true,
    data: ITEMS[index],
    message: "Item updated successfully",
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
