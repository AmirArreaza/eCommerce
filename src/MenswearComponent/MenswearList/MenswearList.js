import React, { Component } from "react";
import { Col } from "react-grid-system";
import Menswear from "../Menswear/Menswear";
import "./MenswearList.css";

class MenswearList extends Component {

  render() {
    const style = {
      paddingLeft: '0px',
      paddingRight: '0px',
    };

    return this.props.products.map((product, index) => {
      return (
              <Col 
                className="MenswearList" 
                style={style}
                key={product.id}>
                <Menswear
                  key={product.id}
                  shortDescription={product.shortDescription}
                  gender={product.gender}
                  imgCutOut={product.images.cutOut}
                  imgModel={product.images.model}
                  brandName={product.brand.name}
                />
              </Col>
      );
    });
  }
}

export default MenswearList;
