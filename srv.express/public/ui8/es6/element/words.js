
/*
 * to add new words, an value item.
 */

import React from 'react';
import ReactDOM from 'react-dom';

//import {Editor} from "./editor.js";


class WordsEditor extends React.Component {

    constructor(props) {
        super(props);

        // props.obj:
        // props should give an object of 'words', currently it's one.js

        this.state = {
            "showForm" : true,
            "lastChange": null,
            //"words": 'should we make a component for textarea or?',
        };

        //this.words = null;


        this.handleTextChange = this.handleTextChange.bind(this);
        this.changeText = this.changeText.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }


    handleTextChange (e) {
        e.preventDefault();
        let el = e.target;
        el.scrollTop = el.scrollHeight; // scroll to bottom?

        var value = el.value;

        //this.changeText(value);
        this.props.obj.setWords(value);
        this.setState({"lastChange": Date.now()});
    }


    /*
     * This not handle event, but set the new text
     */
    changeText (text){
        this.props.obj.setWords(text);
    }


    getWords (){

        var text = this.props.obj.getWords();

        if(!text) text = 'input words here...';

        return text;
    }



    handleSubmit (e){
        console.log('handle submit  ');
        const self = this;
        e.preventDefault();
        const id = self.props.obj.getIdStr();
        console.log('id is : ', id);


        if(typeof id === 'string'){
            console.log('submit to save');
            self.props.obj.save().then(function(){
                if(typeof self.props.afterSubmit === 'function'){
                    self.props.afterSubmit(self.props.obj);
                }
            });
        }
    }


    render(){

        var text = this.getWords();

        var inlineStyles = {
            textarea: {
                width: "95%",
                height: "5rem",
                color: "blue",
            },
            submit:{
                marginTop: "0.5rem",
                clear:"left",
            }
        }

        // set the height according to lines of text
        var nlines = text.split(/\r?\n/).length;
        if(nlines > 4){
            if(nlines > 20){
                nlines = 20;
            }
            inlineStyles.textarea.height = `${nlines}rem`;
        }

        
                    //defaultValue={text}
                    // onClick={this.handleSubmit}
        return (
                <form onSubmit={this.handleSubmit}>
                    <textarea 
                        className="sizeisquestion"
                        type="textarea" 
                        style={inlineStyles.textarea}
                        wrap="off"

                        placeholder={text}

                        onChange={this.handleTextChange}
                    />

                    <button onClick={this.handleSubmit}
                        className="btn btn-primary" style={inlineStyles.submit}
                    >Submit</button>
                </form>

            );
    }

}



/*
 * can be empty, when dataObj is new create without data.
 * can be empty sub/comment, when it's empty but get 'upLinkId' set.
 */
function render_one_item(dataObj, cache, htmlElementId, mState){

    function view_after_submit(obj){
        console.log('view af subm');
        cache.addObj(obj);
        var opt = {'id': obj.getIdStr()};

        mState.opt = opt;
        mState.currentItem = 'read';
    }

    return ReactDOM.render(
            <WordsEditor obj={dataObj} afterSubmit={view_after_submit}  />,
            document.getElementById(htmlElementId));
}


export {WordsEditor, render_one_item};
