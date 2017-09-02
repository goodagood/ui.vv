'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.render_one_item = exports.WordsEditor = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
/*
 * to add new words, an value item.
 */

//import {Editor} from "./editor.js";


var WordsEditor = function (_React$Component) {
    _inherits(WordsEditor, _React$Component);

    function WordsEditor(props) {
        _classCallCheck(this, WordsEditor);

        // props.obj:
        // props should give an object of 'words', currently it's one.js

        var _this = _possibleConstructorReturn(this, (WordsEditor.__proto__ || Object.getPrototypeOf(WordsEditor)).call(this, props));

        _this.state = {
            "showForm": true,
            "lastChange": null
            //"words": 'should we make a component for textarea or?',
        };

        //this.words = null;


        _this.handleTextChange = _this.handleTextChange.bind(_this);
        _this.changeText = _this.changeText.bind(_this);
        _this.handleSubmit = _this.handleSubmit.bind(_this);
        return _this;
    }

    _createClass(WordsEditor, [{
        key: 'handleTextChange',
        value: function handleTextChange(e) {
            e.preventDefault();
            var el = e.target;
            el.scrollTop = el.scrollHeight; // scroll to bottom?

            var value = el.value;

            //this.changeText(value);
            this.props.obj.setWords(value);
            this.setState({ "lastChange": Date.now() });
        }

        /*
         * This not handle event, but set the new text
         */

    }, {
        key: 'changeText',
        value: function changeText(text) {
            this.props.obj.setWords(text);
        }
    }, {
        key: 'getDefaultValue',
        value: function getDefaultValue() {

            var text = this.props.obj.getWords();

            if (!text) text = 'input words here...';

            return text;
        }
    }, {
        key: 'handleSubmit',
        value: function handleSubmit(e) {
            console.log('handle submit  ');
            var self = this;
            e.preventDefault();
            var id = self.props.obj.getIdStr();
            console.log('id is : ', id);

            if (typeof id === 'string') {
                console.log('submit to save');
                self.props.obj.save().then(function () {
                    if (typeof self.props.afterSubmit === 'function') {
                        self.props.afterSubmit(self.props.obj);
                    }
                });
            }
        }
    }, {
        key: 'render',
        value: function render() {

            var text = this.getDefaultValue();

            var inlineStyles = {
                textarea: {
                    width: "95%",
                    height: "5rem",
                    color: "blue"
                },
                submit: {
                    marginTop: "0.5rem",
                    clear: "left"
                }

                // set the height according to lines of text
            };var nlines = text.split(/\r?\n/).length;
            if (nlines > 4) {
                if (nlines > 20) {
                    nlines = 20;
                }
                inlineStyles.textarea.height = nlines + 'rem';
            }

            //defaultValue={text}
            // onClick={this.handleSubmit}
            return _react2.default.createElement(
                'form',
                { onSubmit: this.handleSubmit },
                _react2.default.createElement('textarea', {
                    className: 'sizeisquestion',
                    type: 'textarea',
                    style: inlineStyles.textarea,
                    wrap: 'off',

                    placeholder: text,

                    onChange: this.handleTextChange
                }),
                _react2.default.createElement(
                    'button',
                    { onClick: this.handleSubmit,
                        className: 'btn btn-primary', style: inlineStyles.submit
                    },
                    'Submit'
                )
            );
        }
    }]);

    return WordsEditor;
}(_react2.default.Component);

/*
 * can be empty, when dataObj is new create without data.
 * can be empty sub/comment, when it's empty but get 'upLinkId' set.
 */


function render_one_item(dataObj, cache, htmlElementId, mState) {

    function view_after_submit(obj) {
        console.log('view af subm');
        cache.addObj(obj);
        var opt = { 'id': obj.getIdStr() };

        mState.opt = opt;
        mState.currentItem = 'read';
    }

    return _reactDom2.default.render(_react2.default.createElement(WordsEditor, { obj: dataObj, afterSubmit: view_after_submit }), document.getElementById(htmlElementId));
}

exports.WordsEditor = WordsEditor;
exports.render_one_item = render_one_item;