
import React from 'react';
//const ReactDOM = require('react-dom');

import {Map} from 'immutable';


class Editor extends React.Component {

    constructor(props){
        super(props);

        const initStyle = {
            textarea: {
                width: "95%",
                height: "5rem",
                color: "blue",
            },
            button:{
                margin: "0.5rem 1rem 0.5rem",
                clear:"left",
            }
        };

        this.state = {
            text: props.text || '',
            textareaStyle: Map(initStyle.textarea),
            buttonStyle: Map(initStyle.button),
            cancelable: true,
        }

        this.hints = 'input words ...' || props.hints;

        this.handleSubmit = this.handleSubmit.bind(this);
        this.onChange = this.onChange.bind(this);

        //indev del it!
        window.ed = this;
    }

    handleSubmit (e){
        e.preventDefault();
        if(typeof this.props.handleSubmit === 'function'){
            this.props.handleSubmit(e, this.state.text);
        }
    }

    handleCancel (e){
        console.log('handle cancel');
        e.preventDefault();
    }

    onChange (e){
        e.preventDefault();
        let el = e.target;
        el.scrollTop = el.scrollHeight; // scroll to bottom?

        var value = el.value;

        var height = this.calculate_textarea_height();
        var rem = `${height}rem`;

        var taStyle = this.state.textareaStyle.set(
                'height', rem).set(
                'color', 'black');

        this.setState({text: value, textareaStyle: taStyle, cancelable: false});

        //this.calculate_textarea_height();

        if(typeof this.props.handleChange === 'function'){
            this.props.handleChange(e);
        }
    }

    calculate_textarea_height(minLines=4, maxLines=20){
        // get the height according to lines of text

        var nlines = 1;
        try{
            nlines = this.state.text.split(/\r?\n/).length;
        }catch(e){
            console.log(`we cann't determine number of lines for textarea`);
        }

        if(nlines < minLines) return minLines;
        if(nlines > maxLines) return maxLines;
        return nlines;
    }


    renderCancel(){
        if(this.state.cancelable){
                    return <button type="submit" value="Submit"
                        onClick={this.handleCancel}
                        className="btn btn-primary" style={this.state.buttonStyle.toObject()} >
                    Cancel</button>;
        }else{
            return '';
        }

    }


    render(){

        //var s = Object.assign({}, this.style);

        //// set the height according to lines of text
        //var nlines = this.state.text.split(/\r?\n/).length;
        //if(nlines > 4){
        //    if(nlines > 20){
        //        nlines = 20;
        //    }

        //    //this.style.textarea.height = `${nlines}rem`;
        //    s.textarea.height = `${nlines}rem`;
        //}

        
        return (
                <form onSubmit={this.handleSubmit} className="commentEditor">
                    <textarea 
                        className="sizeisquestion"
                        type="textarea" 
                        style={this.state.textareaStyle.toObject()}
                        wrap="off"

                        placeholder={this.hints}

                        onChange={this.onChange}
                    ></textarea>

                    {this.renderCancel()}

                    <button type="submit" value="Submit"
                        onClick={this.handleSubmit}
                        className="btn btn-primary" style={this.state.buttonStyle.toObject()} >
                    Submit</button>
                </form>

            );
    }
}






export {Editor};
