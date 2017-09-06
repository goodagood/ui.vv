
import React from 'react';
//const ReactDOM = require('react-dom');

import {Editor} from './editor.js';

import {makeWordsObj} from '../../data/one.js';


class CommentButton extends React.Component {
    constructor(props){
        // props: buttonText, Item Object for the editor (words)
        super(props);

        this.state={
            showWhat: 'button',
            text: props.text,
        };

        this.style ={
            button:{
                display: "inline-block",
                color: "green",
            },
            editor:{
                display: "block",
            }
        };

        this.comment = this.setCommentObj();

        this.noop = function(){};

        this.buttonClick = this.buttonClick.bind(this);

        //indev
        //console.log('constructor');
        //window.o = this;
    }

    setCommentObj (){
        var upId = this.props.obj.getIdStr();
        var comment = makeWordsObj();
        comment.setAttr('upLinkId', upId);
        return comment;
    }

    prepareComment_OnChangeFunction(){
        var self = this;
        var comment = this.comment;

        return function(e){
            e.preventDefault();
            var text = e.target.value;
            comment.setWords(text);
        }
    }

    prepareComment_OnSubmitFunction(){
        var self = this;
        var comment = this.comment;

        return function(e){
            e.preventDefault();
            var text = e.target.value;
            comment.save(text);
            self.showWhat = 'button'; //?
        }
    }

    buttonClick(e){
        e.preventDefault();
        this.setState({showWhat: 'editor'});
    }

    renderButton(){
        return (
            <button onClick={this.buttonClick} style={this.style.button} >
                {this.props.buttonText} <i className="fa fa-pencil-square-o"></i>
            </button>
        );
    }


    renderEditor(){
        return (
                <Editor text={this.props.obj.getWords()}
                    handleSubmit={this.prepareComment_OnSubmitFunction()}
                    handleCancel={this.noop}
                    handleChange={this.prepareComment_OnChangeFunction()}
                />
               );
    }

    render(){
        if(this.state.showWhat === 'editor'){
            return this.renderEditor();
        }
        return this.renderButton();
    }
}




export {CommentButton};
