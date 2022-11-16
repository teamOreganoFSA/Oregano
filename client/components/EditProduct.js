import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { useHistory } from "react-router-dom";
import { deleteProduct } from "../store/allProducts";

const EditProduct = (props) => {
  const dispatch = useDispatch();
  const history = useHistory();

  const [formValues, setFormValues] = useState({
    name: "",
    description: "",
    inventoryQuantity: "",
    price: "",
    category: "",
    imageURL: "",
  });

  useEffect(() => {
    loadProduct(props.match.params.id)
  }, []);

  

  const loadProduct = async (id) => {
    const { data } = await axios.get(`/api/products/single/${id}`);
    setFormValues(data);
  };

  const handleChange = (e) => {
    setFormValues({ ...formValues, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = window.localStorage.getItem("token");
      const config = { headers: { authorization: token } };
      await axios.put(
        `/api/admin/${props.match.params.id}`,
        formValues,
        config
      );
      history.push("/admin");
    } catch (error) {
      console.log(error);
    }
  };

  const removeHandler =() => {
    dispatch(deleteProduct(props.match.params.id))
  }
 
  return (
    <div style={{ display: "flex" }}>
      <h2>Edit Product Form</h2>
      <form onSubmit={handleSubmit} >
        <div>
          <label htmlFor="name">Name</label>
          <input name="name" onChange={handleChange} value={formValues.name} />
          <label htmlFor="description">Description</label>
          <textarea
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
          <select onChange={handleChange} name="category" value= {formValues.category}>
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
        <button type="submit" style={{margin:"0 2rem"}}>Save Changes</button>
       
        <button onClick = {()=>{removeHandler()}}>Remove Product</button>
      </form>
      <img
        style={{ height: "200px" }}
        src={formValues.imageURL}
        alt={formValues.description}
      />
    </div>
  );
};

export default EditProduct;

