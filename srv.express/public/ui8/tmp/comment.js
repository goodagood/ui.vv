
import React, { Component } from 'react';
const ReactDOM = require('react-dom');

var SimpleMDE = require('react-simplemde-editor');
 
//
//<SimpleMDE
//  onChange={this.handleChange}
///>


// failed to do with the markdown editor
class Comment extends Component {
    constructor(props) {
        super(props);

        // props: empty obj

        this.state = {
            textValue: '',
        };

        //this.text = props.text || 'Action Button';

        this.idStr = props.idStr;

    }

    handleChange(){
        console.log(this.state.textValue);
    }


    render(){
        return (
        <SimpleMDE
          onChange={this.handleChange}
          value={this.state.textValue}
          options={{
            autofocus: true,
            spellChecker: false,
            // etc. 
          }}
        />
        );
    }
}


const wordsObj = require('../../data/one.js');
function addComment(srcObj){
    //id = id || '';
    var id = srcObj.getIdStr();
    var obj = wordsObj.makeWordsObj();
    obj.setAttr('upLineId', id);


    //// render to id: <main id='main'>..
    ////newWords.render_one_item(obj, 'main');
    //return ReactDOM.render(
    //        <Comment obj={obj}  />,
    //        document.getElementById('main'));


    const newWords = require('./words.js');
    newWords.render_one_item(obj, 'main');
}

export {Comment, addComment};
