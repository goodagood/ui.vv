
import React from 'react';

//import {TextareaOrText} from './text.area.js';
import {InputText} from './input.text.js';
import {TextareaSwitch} from './text.area.js';

//import './td.css';


const D13S = /^\s*\d{13}\s*$/;
const EMPTY = /^\s*$/;


const asMilliSecond = (digitalStr) =>{
    if(digitalStr){
        return D13S.test(digitalStr);
    }else{
        return false;
    }
}

/*
 * if value of someStr is boolean 'FALSE', it leads to confuse.
 */
const asEmpty = (someStr) =>{
    if(someStr){
        return EMPTY.test(someStr);
    }else{
        return true;
    }
}


class TitleDescription extends React.Component {

    /*
     * onChange
     * onBlur
     * onSubmit  // no need when there is no submit button
     */

    constructor(props) {
        super(props);

        // changed:
        //
        // props.dobj: data object has method, 
        // props.dobj.getData() :
        //       {title: text, 
        //        description: textarea,
        //        //hint, err message, //no
        //        ...}
        //
        // props.onChange
        // props.onSubmit
        //
        // props.opt.showForm

        var  data = props.dobj.getData();
        this.data = data;

        //console.log(data);

        let showForm     = props.opt.showForm || false ;
        let defaultTitle = data.title   || "title 0627" ;
        let defaultDescription = data.description || "description 0627" ;
        let titleLabel = props.opt.titleLabel  || "Title" ;
        let titleHint  = data.titleHint  || "" ;

        let descriptionHint  = data.descriptionHint  || "*" ;
        let descriptionLabel = props.opt.descriptionLabel  || "Description" ;

        this.state = {
            "showForm" : showForm,
            "defaultTitle": defaultTitle,
            "defaultDescription": defaultDescription,
            "titleLabel": titleLabel,

            "descriptionLabel": descriptionLabel,

        };

        this.handleBlur = this.handleBlur.bind(this);

    }

    handleBlur (e) {
        var text = e.target.value;

        // showForm : false  > make input form switch off
        // setState will refresh the render
        this.setState({
            "showForm": false,
            //"text":text
        });

        //console.log('handle focus out, the state? changed to tmp? ', text, this.d.text);
        //return ; //?
    }



    //nouse?
    textChange (e) {
        var value = e.target.value;

        //c todo
        this.data.text = value; // actually mutable data
        //console.log('textChange 1203: ', this.data.text);

        // should we save data?
        var milli = Date.now();
        this.props.edit = milli;

        this.signalUpstream();

        props.dobj.saveLater();
    }


    //d
    signalUpstream (){
        if(this.props.noticeDataChange){
            this.props.noticeDataChange();
        }
        // save the data?
    }

    testInputText(){
        let data = this.data;
        let opt ={
            textKey: 'title',
        };

        return (
                <InputText data={data} opt={opt} />
               );
    }

    testTextareaSwitch(){
        let data = this.data;
        let opt ={
            textKey: 'description',
            //showForm: true,
        };

        return (
                <TextareaSwitch data={data} opt={opt} />
               );
    }


    render(){
        return (
            <form className="titledescription" key={this.data.id} >
                <div>
                    <label>{this.state.titleLabel} : </label>
                    {this.testInputText()}
                </div>

                <div>
                    <label>{this.state.descriptionLabel} : </label>
                    {this.testTextareaSwitch()}
                </div>
                {/*
                */}
            </form>

        );
    }


    //c?
    clickText (e){
        this.setState({showForm:true});

        /*
         *
         * It's not focused when rendered,
         * setTimeout focus it, but ref needed.
         * but click the form again or double click will do the same.
         * 
         * setTimeout(()=>{
         *     // maybe we shouldn't use ref,
         *     // just click one more time it will get focus.
         *     this.inputDom.focus();
         * }, 10);
         *
         */
    }

    //c
    renderText(){

        return (
            <span  onClick={this.clickText} >
                    {this.data.text}
            </span>
        );
    }

}


// save warning
//class LabelInput  extends React.Component {
//    constructor(props) {
//        super(props);
//
//        // props.data might give: text, label, showForm
//
//        this.state = {
//            //"label": props.data.label || "_LABEL_",
//            "changed": "??",
//        };
//
//    }
//
//
//    render = ()=>{
//        return (
//            <label> {this.d.lable}: 
//                <TitleEditor data={this.props.data} />
//            </label>
//        );
//    }
//}
//



//class FirstPairOfTitleDescription extends React.Component {
//    constructor(props) {
//        super(props);
//
//        this.state = {
//            "changed": null,
//        };
//
//        //console.log(props.data);
//
//        this.data = props.data; //d
//
//        if(typeof props.obj["showForm"] === 'undefined' || 
//                typeof props.obj["showForm"] !== 'boolean'){
//            props.obj["showForm"] = false;
//        }
//
//        //// move out
//        //const onTitleChange = (e)=>{
//        //    props.data.text = e.target.value;
//        //    console.log(props.data.text);
//        //    console.log('0607 1429pm');
//        //};
//
//    }
//
//    // should notice the upstream
//    onTitleChange = (e)=>{
//        this.props.data.text = e.target.value;
//        this.props.callback(e);
//        console.log(this.props.data.text);
//        console.log('0607 1429pm');
//    };
//    onDescriptionChange = (e)=>{
//        this.props.obj.description = e.target.value;
//        this.props.callback(e);
//        console.log(this.props.obj.description);
//        console.log('0608 0613am');
//    };
//
//
//    render(){
//        return (
//                <div className="firstpair">
//                    <TitleEditor obj={this.props.obj}
//                        onChange={this.onTitleChange}
//                    />
//                    
//                    <TextareaOrText obj={this.props.obj}
//                        onChange={this.onDescriptionChange}
//                    />
//                </div>
//        );
//    }
//}
//

export {TitleDescription,};
