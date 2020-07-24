import React, { Component } from "react";
import MenswearList from "./MenswearList/MenswearList";
import { Container, Row } from "react-grid-system";
import axios from "axios";

class MenswearComponent extends Component {
  state = {
    products: [],
    filtered: [],
    brands: [],
  };

  componentDidMount() {
    this.fetchValues();
  }

  async fetchValues() {
    const URL_CORS = "https://cors-anywhere.herokuapp.com/";
    const URL =
      "https://www.farfetch.com/uk/plpslice/listing-api/query?setId=9645&view=180&gender=Men";
    const values = await axios.get(URL_CORS + URL).then(function (response) {
      return response.data;
    });
    this.setState({ products: values.listing.products });
    this.setState({ filtered: values.listing.products });

    var brands = [];
    brands.push({ value: "", label: "" });
    var control = {};
    this.state.products.map((product) => {
      if (control[product.brand.id] === undefined) {
        var brand = { value: product.brand.id, label: product.brand.name };
        brands.push(brand);
        control[product.brand.id] = product.brand.name;
      }
      return true;
    });

    this.setState({ brands: brands });
  }

  filterPerBrand = (event) => {
    if(event.target.value !== ''){
      const result = this.state.products.filter(product => event.target.value === product.brand.name);
      this.setState({ filtered: result });
    }else{
      this.setState({ filtered: this.state.products });
    }
  }

  render() {
    let optionItems = this.state.brands.map((brand) =>
      <option key={brand.value}>{brand.label}</option>
    );
    return (
      <div className="MenswearComponent" >
        <select onChange={this.filterPerBrand}>
          {optionItems}
        </select>
        <Container>
          <Row>
            <MenswearList products={this.state.filtered} />
          </Row>
        </Container>
      </div>
    );
  }
}
export default MenswearComponent;