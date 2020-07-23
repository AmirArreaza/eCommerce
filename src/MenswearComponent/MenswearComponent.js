import React, { Component } from "react";
import MenswearList from "./MenswearList/MenswearList";
import { Container, Row} from "react-grid-system";
import Select from 'react-select';
import axios from "axios";

class MenswearComponent extends Component {
  state = {
    products: [],
    brands: [],
    filter: "",
  };

  componentDidMount() {
    console.log("Fetching values");
    this.fetchValues();
    console.log("Values fetched");
  }

  async fetchValues() {
    const URL_CORS = "https://cors-anywhere.herokuapp.com/";
    const URL =
      "https://www.farfetch.com/uk/plpslice/listing-api/query?setId=9645&view=180&gender=Men";
    const values = await axios.get(URL_CORS + URL).then(function (response) {
      return response.data;
    });
    this.setState({ products: values.listing.products });

    console.log('Test');

    var brands = new Set();

    this.state.products.map((product) => brands.add(product.brand.name));
    this.setState({ brands: brands});
    console.log(this.state.brands);

  }

  render() {

    return (
      <div className="MenswearComponent">
        <Select value={this.state.selected} 
                options={this.state.brands.name} />
        <Container>
          <Row>
            <MenswearList products={this.state.products} />
          </Row>
        </Container>
      </div>
    );
  }
}
export default MenswearComponent;