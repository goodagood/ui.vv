
import React, { Component } from 'react';

class ActionButton extends Component {
    constructor(props) {
        super(props);

        // props: text

        this.text = props.text || 'Action Button';

        this.click = props.clickCallback;

    }


    render(){
        const ss = {
            display: "inline-block",
            color: "green",
        };
        return (
            <button onClick={this.click} style={ss} >
                {this.text} <i className="fa fa-pencil-square-o"></i>
            </button>
        );
    }
}


export {ActionButton};
