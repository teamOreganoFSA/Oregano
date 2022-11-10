import React from "react";
import { connect } from "react-redux";
import Card from "./Card";
import { fetchAllProducts } from "../store/allProducts";

export class AllProducts extends React.Component {
  componentDidMount() {
    this.props.fetchAllProducts();
    console.log(this.state);
  }

  render() {
    return (
      <div className="wrapper">
        <Card />
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    products: state.products,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    fetchAllProducts: () => dispatch(fetchAllProducts()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AllProducts);
