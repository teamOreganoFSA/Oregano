import React from "react";
import { connect } from "react-redux";
import Card from "./Card";
import { fetchAllProducts } from "../store/allProducts";
import { Link } from "react-router-dom";

export class AllProducts extends React.Component {
  componentDidMount() {
    this.props.fetchAllProducts(this.props.match.params.category);
  }

  render() {
    const products = this.props.products;
    console.log(products);
    return (
      <div className="wrapper">
        <div className="grid-container">
          {products.map((product) => (
            <div key={product.id}>
              <Card
                product={product}
                imageURL={product.imageURL}
                name={product.name}
                price={product.price}
                // description={product.description}
                id={product.id}
              />
            </div>
          ))}
        </div>
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    products: state.allProducts,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    fetchAllProducts: (category) => dispatch(fetchAllProducts(category)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AllProducts);
