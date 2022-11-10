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
    console.log(products)
    return (
      <div className="wrapper">
        <div>
          {products.map((product) => (
            <div>
              <Card
                key={product.id}
                imageURL={product.imageURL}
                name={product.name}
                price={product.price}
                description={product.description}
              />
              <Link to={`/products/single/${product.id}`}>
                <button className="card_button">View Product</button>
              </Link>
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
