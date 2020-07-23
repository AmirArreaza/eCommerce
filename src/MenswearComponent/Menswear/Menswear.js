import React, {Component} from 'react';
import Brand from '../../Brand/Brand'
import "./Menswear.css"

class Menswear extends Component {
    
    state = {
        display: this.props.imgCutOut
    }
    
    onMouseOverImage = () => this.setState({display: this.props.imgModel});
    onMouseOutImage = () => this.setState({display: this.props.imgCutOut});

    render(){
        return(
            <div className="Menswear">
                <h4>{this.props.id}</h4>
                <label>{this.props.shortDescription}</label>
                <br/>

                <Brand name={this.props.brandName} />

                <img    src={this.state.display}
                        onMouseOver={this.onMouseOverImage} 
                        onMouseOut={this.onMouseOutImage}
                        alt={this.props.shortDescription}/>
            </div>
        );
    }

}

export default Menswear;