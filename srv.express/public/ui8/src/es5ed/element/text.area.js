'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.render_one_item = exports.TextareaSwitch = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
//d?

var ReactDOM = require('react-dom');

//import './value.css'

var TextareaSwitch = function (_React$Component) {
    _inherits(TextareaSwitch, _React$Component);

    function TextareaSwitch(props) {
        _classCallCheck(this, TextareaSwitch);

        var _this = _possibleConstructorReturn(this, (TextareaSwitch.__proto__ || Object.getPrototypeOf(TextareaSwitch)).call(this, props));

        var showForm = false || props.opt.showForm;

        //text : props.data[props.opt.textKey]
        _this.textKey = props.opt.textKey || 'text';

        _this.state = {
            "showForm": showForm
            //"text": 'should we make a component for textarea or?',
        };

        _this.handleTextChange = _this.handleTextChange.bind(_this);
        _this.handleBlur = _this.handleBlur.bind(_this);
        _this.clickText = _this.clickText.bind(_this);
        _this.changeText = _this.changeText.bind(_this);

        _this.save = _this.save.bind(_this);
        return _this;
    }

    _createClass(TextareaSwitch, [{
        key: 'handleTextChange',
        value: function handleTextChange(e) {
            var value = e.target.value;
            //this.props.data.description = value; //c
            this.changeText(value);

            if (this.props.noticeDataChange) {
                this.props.noticeDataChange();
            }
            // should we save data?
            //var milli = Date.now();
            //this.tmp.edit = milli;
        }
    }, {
        key: 'handleBlur',
        value: function handleBlur(e) {
            var text = e.target.value;
            //console.log('save the changed to tmp ', text);

            // showForm : false  > make input form switch off
            // setState will refresh the render
            this.setState({ "showForm": false, "description": text });

            //console.log('the state? changed to tmp? ', this.state);
        }

        //d?

    }, {
        key: 'save',
        value: function save() {
            // save the data
        }
    }, {
        key: 'getDefaultValue',
        value: function getDefaultValue() {
            var text = 'hint, input words into valley of value...';

            if (this.props.opt.textKey && this.props.data[this.props.opt.textKey]) {
                return this.props.data[this.props.opt.textKey];
            }

            return text;
        }

        /*
         * This not handle event, but set the new text
         */

    }, {
        key: 'changeText',
        value: function changeText(text) {
            this.props.data[this.props.opt.textKey] = text;
        }
    }, {
        key: 'renderForm',
        value: function renderForm() {

            var text = this.getDefaultValue();

            return _react2.default.createElement('textarea', {
                className: 'sizeisquestion',
                type: 'textarea',

                defaultValue: text,

                onChange: this.handleTextChange,
                onBlur: this.handleBlur
            });
        }
    }, {
        key: 'clickText',
        value: function clickText(e) {
            //console.log(this.tmp);
            //console.log(this.state);
            this.setState({ showForm: true });
        }
    }, {
        key: 'renderText',
        value: function renderText() {

            var text = this.getDefaultValue();

            return _react2.default.createElement(
                'div',
                { onClick: this.clickText },
                _react2.default.createElement(
                    'pre',
                    null,
                    text
                )
            );
        }
    }, {
        key: 'render',
        value: function render() {
            if (this.state.showForm) {
                return this.renderForm();
            } else {
                return this.renderText();
            }
        }
    }]);

    return TextareaSwitch;
}(_react2.default.Component);

function render_one_item(dataObj, elementId) {
    var opt = {
        textKey: 'words'
    };

    return ReactDOM.render(_react2.default.createElement(TextareaSwitch, { data: dataObj, opt: opt }), document.getElementById(elementId));
}

exports.TextareaSwitch = TextareaSwitch;
exports.render_one_item = render_one_item;