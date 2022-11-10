import React from "react";
import { connect } from "react-redux";
import {fetchSingleProduct} from "../store/singleProduct"
import SingleProductViewCard from "./SingleProductViewCard";

export class SingleProduct extends React.Component{
  componentDidMount() {
    this.props.fetchSingleProduct(this.props.match.params.id)
  }
  render() {
    const singleProduct = this.props.singleProduct||[];
    console.log(singleProduct)

    return (
      <div className="wrapper">
        <div>
        <SingleProductViewCard name = {singleProduct.name}
        imageURL = {singleProduct.imageURL} price ={singleProduct.price} description ={singleProduct.description}/>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    singleProduct: state.singleProduct,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    fetchSingleProduct: (productId) => dispatch(fetchSingleProduct(productId)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SingleProduct);
