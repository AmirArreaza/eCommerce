import React, { Component } from "react";


class Brand extends Component{
    render(){
        return(
            <div>
                <h5>{this.props.name}</h5>
            </div>
        );
    }
}

export default Brand;