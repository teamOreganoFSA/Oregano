import React, { useState } from "react";

const NewProductForm = () => {
  const [formValues, setFormValues] = useState({
    name: "",
    description: "",
    inventoryQuantity: "",
    price: "",
    category: "MEN",
    imageURL: "",
  });

  const handleChange = (e) => {
    console.log(e.target.name);
    setFormValues({ ...formValues, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formValues);
  };
  return (
    <div>
      <h2>New Product Form</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Name</label>
          <input name="name" onChange={handleChange} value={formValues.name} />
          <label htmlFor="description">Description</label>
          <input
            name="description"
            onChange={handleChange}
            value={formValues.description}
          />
          <label htmlFor="inventoryQuantity">Quantity</label>
          <input
            name="inventoryQuantity"
            onChange={handleChange}
            value={formValues.inventoryQuantity}
          />
          <label htmlFor="price">Price</label>
          <input
            name="price"
            onChange={handleChange}
            value={formValues.price}
          />
          <label htmlFor="category">Category</label>
          <select onChange={handleChange} name="category">
            <option value="MEN">MEN</option>
            <option value="WOMEN">WOMEN</option>
          </select>

          <label htmlFor="imageURL">ImageURL</label>
          <input
            name="imageURL"
            onChange={handleChange}
            value={formValues.imageURL}
          />
        </div>

        <button type="submit">Add Product</button>
      </form>
    </div>
  );
};

export default NewProductForm;
