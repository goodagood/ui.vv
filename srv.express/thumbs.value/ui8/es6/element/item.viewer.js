
/*
 * to display an value item.
 */

import React from 'react';
import ReactDOM from 'react-dom';

import {markdown} from  'markdown';

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

        this.thumbs = this.props.obj.prepare_thumbs_obj();

        this.addComment = this.addComment.bind(this);
        this.mkMarkdown = this.mkMarkdown.bind(this);

        console.log('set global');
        window.item = this;
    }


    addComment(){
        console.log('add comment for ', this.props.obj.getIdStr());
    }

    mkMarkdown(preStyle){
        var text = this.props.obj.getWords();
        var md;

        //console.log('to html markdown? : ', text.slice(0, 100));

        try{
            var tmp = markdown.toHTML(text);
        //console.log('already markdown? : ', tmp.slice(0, 100));

            md = <div dangerouslySetInnerHTML={{__html:tmp}} onClick={this.handleClick} />;
        }catch(err){
            //console.log('try markdown catched ', err);

            md = <pre onClick={this.handleClick} style={preStyle}>
                    {text}
                </pre>;
        }
        return md;
    }


    render(){
        const preStyle = {
            whiteSpace: "pre-wrap",       /* Since CSS 2.1 */
            whiteSpace: "-moz-pre-wrap",  /* Mozilla, since 1999 */
            whiteSpace: "-pre-wrap",      /* Opera 4-6 */
            whiteSpace: "-o-pre-wrap",    /* Opera 7 */
            //wordWrap: break-word;       /* Internet Explorer 5.5+ */
        }

        //var markdowned = this.mkMarkdown();

                        //{this.props.obj.getWords()}
                    //<pre style={preStyle}>
                    //    {md}
                    //</pre>
                    //{markdowned}
        return (
                <div className="itemViewer">
                    {this.mkMarkdown(preStyle)}
                    <Thumbs thumbsobj={this.thumbs} />

                    <CommentButton buttonText={"Comment"} obj={this.props.obj} />

                </div>

            );
    }

}

//?
function md_or_pre(text){
        try{
            text = markdown.toHTML(text);
        var md = markdown.toHTML(this.props.obj.getWords);
        }catch(err){
            console.log('try markdown catched ', err);

            text = `
                <pre onClick={this.handleClick}>
                    ${text}
                </pre>`;
        }
        return text;
}

// cache should be used when comments added to add it to cache, but not
function renderItemViewer(dataObj, cache, elementId, mState){
    // mobj: menu object

    return ReactDOM.render(
            <ItemViewer obj={dataObj}  />,
            document.getElementById(elementId));
}


export {ItemViewer, renderItemViewer};
