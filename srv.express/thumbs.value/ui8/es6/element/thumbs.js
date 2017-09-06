
import React, { Component } from 'react';

import {Promise} from 'bluebird';
import {Map} from 'immutable';

//import Radium from 'radium';

import {NumberOfThumbs} from './thumb.number.js';

const p = console.log;


function FontAwesomeIcon(props){

    if(!props.name || typeof props.name !== 'string' || props.name.length < 2 ){
        return <i></i>;
    }

    let name = props.name;

    // beside no size/default, there are:
    // fa-lg (33% increase), fa-2x, fa-3x, fa-4x, or fa-5x
    let size   = props.size || "";

    let spin = props.spin ? 'fa-spin' : '';

    // This will be like: "fa fa-thumbs-o-up fa-2x"
    let fa_class = `fa ${name} ${size} ${spin}`;
    //console.log(fa_class);

    // styles 
    var styles = {
        marginLeft: "0.5em",
        marginRight: "0.5em",
    };

    return <i className={fa_class} style={styles}></i>;
}
//FontAwesomeIcon = Radium(FontAwesomeIcon);


function ThumbUp2X(props){
    return <FontAwesomeIcon name="fa-thumbs-o-up" size="fa-2x" />;
}

function ThumbDown2X(props){
    return <FontAwesomeIcon name="fa-thumbs-o-down" size="fa-2x" />;
}


class ThumbUp_And_Number extends Component {
    constructor(props) {
        super(props);

        this.data = props.data;

        this.dataId  = props.dataId  || null;
        this.valueId = props.valueId || null;

        //if(typeof props.clickCallback === 'function'){
        //    this.clickCallback = props.clickCallback || null;
        //}
        //
        // callback parameters: username?, event?, dataId, valueId
        this.clickCallback = props.clickCallback || function(){};

        // thumbsup or down
        this.state = {
            color: 'green'
        }

        this.click = this.click.bind(this);
    }

    getStyles (){
        return {
            wrap : {
                color: this.state.color,
                //float: "left",
                display: "inline-block",
                width: '3em',

                //margin: "3px 5px 3px",

                //paddingLeft: "1em",
                //paddingRight: "0.5em",

            },
        };
    }

    click (e){
        e.preventDefault();
        this.setState({color: 'grey'});

        console.log('clicked ' + Date.now().toString());

        this.clickCallback(e, this.data.id, this.data.valueId);
    }


    render(){

        return (
                      <span  onClick={this.click} >
                      {/*
                      <div style={this.getStyles().wrap} onClick={this.click} >
                        <i className="fa fa-thumbs-o-up fa-2x"></i>
                        <span className="up-number"> 33 </span>
                        */}
                        <ThumbUp2X />
                        <NumberOfThumbs number="18" />
                      </span>
               );
    }
}


class Thumbs extends Component {
    constructor(props) {
        super(props);

        // thumbs object
        this.obj = props.thumbsobj;


        this.upStyle = Map({
                "display": "inline-block",
                "color": "green"
        });
        this.downStyle = Map({
                "display": "inline-block",
                "color": "green"
        });
        this.infoStyle = Map({
                "display": "inline-block",
                "color": "green"
        });

        // setState is async, it means it can be delay

        this.state = {
            milli : Date.now(),
            upNumber : this.obj.number_of_up_thumbs(),
            upClicked: false,
            upStyle: this.upStyle,

            downNumber : this.obj.number_of_down_thumbs(),
            downClicked: false,
            downStyle: this.downStyle,

            infoStyle: this.infoStyle,
        };


        this.changeState = Promise.promisify(this.setState);


        this.upClick = this.upClick.bind(this);
        this.downClick = this.downClick.bind(this);
        this.infoClick = this.infoClick.bind(this);
    }


    countNumbers (){
        //this.state.milli = Date.now();
        var up = this.obj.number_of_up_thumbs();
        var down = this.obj.number_of_down_thumbs();


        //console.log('to refresh? ', up, down);
        //return this.changeState({ upNumber : up, downNumber : down});

        //console.log('refreshed? ', this.state.upNumber, this.state.downNumber);
        return [up, down];
    }


    upClick (e){
        e.preventDefault();

        if(this.state.upClicked) return Promise.resolve(false);

        var newState = {}; // upNumber ...

        console.log('up clicked ' + Date.now().toString());

        return this.obj.addThumb(true).then(()=>{
            //var ks = Object.keys(this.obj.getThumbs().up);
            //console.log('add thumb then: ', ks);
            //console.log(ks.join(", "));

            var upN, downN;
            [upN, downN] = this.countNumbers();
            newState['upNumber'] = upN || '??';
            newState['downNumber'] = downN;

            return null;
        }).then(()=>{
            newState['upStyle'] = this.upStyle.set("color", "grey");
            newState['upClicked'] = true;

            console.log('changing state ', newState);
            return this.changeState(newState);
        });
    }

    downClick (e){
        e.preventDefault();

        if(this.state.downClicked) return Promise.resolve(false);

        var newState = {};

        console.log('down clicked ' + Date.now().toString());

        return this.obj.addThumb(false).then(()=>{

            var upN, downN;
            [upN, downN] = this.countNumbers();
            newState['upNumber'] = upN;
            newState['downNumber'] = downN;

            return null;
        }).then(()=>{
            newState['downStyle'] = this.downStyle.set("color", "grey");
            newState['downClicked'] = true;

            console.log('changing state ', newState);
            return this.changeState(newState);
        });
    }

    infoClick (e){
        e.preventDefault();

        console.log('info clicked ' + Date.now().toString());
        console.log(this.obj.showSimple());

        //this.setState({color: 'grey'});
        //this.clickCallback(e, this.data.id, this.data.valueId);
    }


    doRender (){
        //console.log(" --- do render ");
        const wrapStyle = {
            width: "16em",
            display: "inline-block",
            padding: "3px 5px 3px 5px",
            //border: "1px green solid",
            textAlign: "center",

            color: "green",
        };

        return (
                <div style={wrapStyle}>

                  <span  onClick={this.upClick} style={this.state.upStyle.toObject()} >
                    <ThumbUp2X />
                    {this.state.upNumber}
                  </span>

                  <span  onClick={this.downClick} style={this.state.downStyle.toObject()} >
                    <ThumbDown2X  />
                    {this.state.downNumber}
                  </span>

                  <span onClick={this.infoClick} style={this.state.infoStyle.toObject()}>
                      <FontAwesomeIcon name="fa-calculator" size="fa-2x" />
                  </span>

                </div>
               );
    }

    render (){
        return this.doRender();
    }
}



export default Thumbs;




