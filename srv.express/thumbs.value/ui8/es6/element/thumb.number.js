
import React, { Component } from 'react';

//import Radium from 'radium';



class NumberOfThumbs extends Component {
    constructor(props) {
        super(props);

        this.state = {
            number: null,
            fetching: null,
            changed: null
        };

        if(props.number) this.state.number = props.number;

        this.clickCallback = props.clickCallback || function(){};
    }

    refreshing(){
        return <i class="fa fa-refresh fa-spin"></i>;
    }


    showNumber(){
        return <span className="number"> {this.state.number} </span>;
    }


    render(){
        if(this.state.fetching){
            return this.refreshing();
        }


        // default renderring:
        return this.showNumber();
    }
}


export {NumberOfThumbs};
