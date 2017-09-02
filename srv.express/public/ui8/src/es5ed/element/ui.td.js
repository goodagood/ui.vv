'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.TitleDescription = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _inputText = require('./input.text.js');

var _textArea = require('./text.area.js');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

//import {TextareaOrText} from './text.area.js';


//import './td.css';


var D13S = /^\s*\d{13}\s*$/;
var EMPTY = /^\s*$/;

var asMilliSecond = function asMilliSecond(digitalStr) {
    if (digitalStr) {
        return D13S.test(digitalStr);
    } else {
        return false;
    }
};

/*
 * if value of someStr is boolean 'FALSE', it leads to confuse.
 */
var asEmpty = function asEmpty(someStr) {
    if (someStr) {
        return EMPTY.test(someStr);
    } else {
        return true;
    }
};

var TitleDescription = function (_React$Component) {
    _inherits(TitleDescription, _React$Component);

    /*
     * onChange
     * onBlur
     * onSubmit  // no need when there is no submit button
     */

    function TitleDescription(props) {
        _classCallCheck(this, TitleDescription);

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

        var _this = _possibleConstructorReturn(this, (TitleDescription.__proto__ || Object.getPrototypeOf(TitleDescription)).call(this, props));

        var data = props.dobj.getData();
        _this.data = data;

        //console.log(data);

        var showForm = props.opt.showForm || false;
        var defaultTitle = data.title || "title 0627";
        var defaultDescription = data.description || "description 0627";
        var titleLabel = props.opt.titleLabel || "Title";
        var titleHint = data.titleHint || "";

        var descriptionHint = data.descriptionHint || "*";
        var descriptionLabel = props.opt.descriptionLabel || "Description";

        _this.state = {
            "showForm": showForm,
            "defaultTitle": defaultTitle,
            "defaultDescription": defaultDescription,
            "titleLabel": titleLabel,

            "descriptionLabel": descriptionLabel

        };

        _this.handleBlur = _this.handleBlur.bind(_this);

        return _this;
    }

    _createClass(TitleDescription, [{
        key: 'handleBlur',
        value: function handleBlur(e) {
            var text = e.target.value;

            // showForm : false  > make input form switch off
            // setState will refresh the render
            this.setState({
                "showForm": false
                //"text":text
            });

            //console.log('handle focus out, the state? changed to tmp? ', text, this.d.text);
            //return ; //?
        }

        //nouse?

    }, {
        key: 'textChange',
        value: function textChange(e) {
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

    }, {
        key: 'signalUpstream',
        value: function signalUpstream() {
            if (this.props.noticeDataChange) {
                this.props.noticeDataChange();
            }
            // save the data?
        }
    }, {
        key: 'testInputText',
        value: function testInputText() {
            var data = this.data;
            var opt = {
                textKey: 'title'
            };

            return _react2.default.createElement(_inputText.InputText, { data: data, opt: opt });
        }
    }, {
        key: 'testTextareaSwitch',
        value: function testTextareaSwitch() {
            var data = this.data;
            var opt = {
                textKey: 'description'
                //showForm: true,
            };

            return _react2.default.createElement(_textArea.TextareaSwitch, { data: data, opt: opt });
        }
    }, {
        key: 'render',
        value: function render() {
            return _react2.default.createElement(
                'form',
                { className: 'titledescription', key: this.data.id },
                _react2.default.createElement(
                    'div',
                    null,
                    _react2.default.createElement(
                        'label',
                        null,
                        this.state.titleLabel,
                        ' : '
                    ),
                    this.testInputText()
                ),
                _react2.default.createElement(
                    'div',
                    null,
                    _react2.default.createElement(
                        'label',
                        null,
                        this.state.descriptionLabel,
                        ' : '
                    ),
                    this.testTextareaSwitch()
                )
            );
        }

        //c?

    }, {
        key: 'clickText',
        value: function clickText(e) {
            this.setState({ showForm: true });

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

    }, {
        key: 'renderText',
        value: function renderText() {

            return _react2.default.createElement(
                'span',
                { onClick: this.clickText },
                this.data.text
            );
        }
    }]);

    return TitleDescription;
}(_react2.default.Component);

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

exports.TitleDescription = TitleDescription;