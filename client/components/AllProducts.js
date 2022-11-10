import React from "react";
import { connect } from "react-redux";
import Card from "./Card";
import { fetchAllProducts } from "../store/allProducts";

export class AllProducts extends React.Component {
  componentDidMount() {
   
    this.props.fetchAllProducts(this.props.match.params.category);
  }

  render() {
    const products = this.props.products;
    console.log(this.props);
    return (
      <div className="wrapper">
        <div>
          {products.map((product) => (
            <Card
              key = {product.id}
              imageURL={product.imageURL}
              name={product.name}
              price={product.price}
              description ={product.description}
            />
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
