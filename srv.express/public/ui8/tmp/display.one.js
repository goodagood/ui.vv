
/*
 * to display an value item.
 */

import React from 'react';
const ReactDOM = require('react-dom');

import Thumbs from  './thumbs.js';
import {ActionButton} from  './button.act.js';
import {CommentButton} from  './click.edit.js';


class ItemViewer extends React.Component {

    constructor(props) {
        super(props);

        // props.obj:
        // props should give an object of 'words',
        // currently it's obj defined in one.js

        this.state = {
            thumbs: {},
            //"words": 'should we make a component for textarea or?',
        };


        this.addComment = this.addComment.bind(this);
    }


    addComment(){
        console.log('add comment for ', this.props.obj.getIdStr());
    }


    render(){
        const preStyle = {
            whiteSpace: "pre-wrap",       /* Since CSS 2.1 */
            whiteSpace: "-moz-pre-wrap",  /* Mozilla, since 1999 */
            whiteSpace: "-pre-wrap",      /* Opera 4-6 */
            whiteSpace: "-o-pre-wrap",    /* Opera 7 */
            //wordWrap: break-word;       /* Internet Explorer 5.5+ */
        }

                    //<ActionButton clickCallback={this.addComment} text={"Add Comments"} />
        return (
                <div className="itemViewer">
                    <pre style={preStyle}>
                        {this.props.obj.getWords()}
                    </pre>
                    <Thumbs thumbsobj={this.props.obj.getThumbsObj()} />

                    <CommentButton buttonText={"Comment"} obj={this.props.obj} />

                </div>

            );
    }

}


// cache should be used when comments added to add it to cache, but not
function renderItemViewer(dataObj, cache, elementId, mState){
    // mobj: menu object

    return ReactDOM.render(
            <ItemViewer obj={dataObj}  />,
            document.getElementById(elementId));
}


export {ItemViewer, renderItemViewer};
