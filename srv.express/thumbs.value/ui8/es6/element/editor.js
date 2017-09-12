
import React from 'react';
//const ReactDOM = require('react-dom');

import {Map} from 'immutable';

import {markdown} from 'markdown';

/*
 * props could support: 
 *      text, 
 *      handleChange, change handler, 
 *      handleSubmit, submit handler, 
 *      handleCancel
 *      options ? not used
 *
 *      hint, for placeholder attribute of textarea
 *
 */
class Editor extends React.Component {
    // props
    //

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

        // it's not necessary to make text as state
        this.text = props.text || '';

        this.state = {
            textareaStyle: Map(initStyle.textarea),
            buttonStyle: Map(initStyle.button),
            cancelable: true,

            preview: false,
        }

        this.hint = 'input words ...' || props.hint;

        // this is rediculous
        this.setState = this.setState.bind(this);

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);

        //indev del it!
        window.ed = this;
    }

    handleSubmit (e){
        e.preventDefault();
        if(typeof this.props.handleSubmit === 'function'){
            this.props.handleSubmit(e, this.text);
        }
    }

    handleCancel (e){
        console.log('handle cancel');
        e.preventDefault();
    }

    handleChange (e){
        e.preventDefault();
        let el = e.target;
        el.scrollTop = el.scrollHeight; // scroll to bottom?

        var value = el.value;
        this.text = value;

        var height = this.calculate_textarea_height();
        var rem = `${height}rem`;

        var taStyle = this.state.textareaStyle.set(
                'height', rem).set(
                'color', 'black');

        this.setState({text: value, textareaStyle: taStyle, cancelable: false});

        if(typeof this.props.handleChange === 'function'){
            this.props.handleChange(e);
        }
    }

    calculate_textarea_height(minLines=4, maxLines=20){
        // get the height according to lines of text

        var nlines = 1;
        try{
            nlines = this.text.split(/\r?\n/).length;
        }catch(e){
            console.log(`we cann't determine number of lines for textarea`);
        }

        if(nlines < minLines) return minLines;
        if(nlines > maxLines) return maxLines;
        return nlines;
    }

    render_markdown_or_pre(){

        var text = this.text || '';
        var markdown_or_pre;

        try{
            markdown_or_pre = markdown.toHTML(text);
        }catch(err){
            //console.log('0912 1707 try markdown catched ', err);

            markdown_or_pre = `
                <pre>
                    ${text}
                </pre>`;
        }

        const setstate = this.setState;
        function onclick(e){
            e.preventDefault();
            setstate({preview:false});
        }

        return (
                <div 
                onClick={onclick}
                className="wordsAsText" 
                dangerouslySetInnerHTML={{__html: markdown_or_pre}} >
                </div>
            );
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


    render4Edit(){

        const setstate = this.setState;
        function clickPreview(e){
            e.preventDefault();
            setstate({preview:true});
            //console.l
        }


        var value_or_placeholder = {};
        var text = this.text;

        if(text){ value_or_placeholder.value = text;
        }else{ value_or_placeholder.placeholder = this.hint; }

                        //placeholder={this.hint}
        return (
                <form onSubmit={this.handleSubmit} className="commentEditor">
                    <textarea 
                        className="sizeisquestion"
                        type="textarea" 
                        style={this.state.textareaStyle.toObject()}
                        wrap="off"

                        {...value_or_placeholder}

                        onChange={this.handleChange}
                    ></textarea>

                    {this.renderCancel()}

                    <button 
                        onClick={clickPreview}
                        className="btn btn-default" style={this.state.buttonStyle.toObject()} >
                    Preview</button>

                    <button type="submit" value="Submit"
                        onClick={this.handleSubmit}
                        className="btn btn-primary" style={this.state.buttonStyle.toObject()} >
                    Submit</button>
                </form>

            );
    }


    render(){
        if(this.state.preview) return this.render_markdown_or_pre(); 

        return this.render4Edit();
    }
}






export {Editor};
