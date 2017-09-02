'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.Editor = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _immutable = require('immutable');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
//const ReactDOM = require('react-dom');

var Editor = function (_React$Component) {
    _inherits(Editor, _React$Component);

    function Editor(props) {
        _classCallCheck(this, Editor);

        var _this = _possibleConstructorReturn(this, (Editor.__proto__ || Object.getPrototypeOf(Editor)).call(this, props));

        var initStyle = {
            textarea: {
                width: "95%",
                height: "5rem",
                color: "blue"
            },
            button: {
                margin: "0.5rem 1rem 0.5rem",
                clear: "left"
            }
        };

        _this.state = {
            text: props.text || '',
            textareaStyle: (0, _immutable.Map)(initStyle.textarea),
            buttonStyle: (0, _immutable.Map)(initStyle.button),
            cancelable: true
        };

        _this.hints = 'input words ...' || props.hints;

        _this.handleSubmit = _this.handleSubmit.bind(_this);
        _this.onChange = _this.onChange.bind(_this);

        //indev del it!
        window.ed = _this;
        return _this;
    }

    _createClass(Editor, [{
        key: 'handleSubmit',
        value: function handleSubmit(e) {
            e.preventDefault();
            if (typeof this.props.handleSubmit === 'function') {
                this.props.handleSubmit(e, this.state.text);
            }
        }
    }, {
        key: 'handleCancel',
        value: function handleCancel(e) {
            console.log('handle cancel');
            e.preventDefault();
        }
    }, {
        key: 'onChange',
        value: function onChange(e) {
            e.preventDefault();
            var el = e.target;
            el.scrollTop = el.scrollHeight; // scroll to bottom?

            var value = el.value;

            var height = this.calculate_textarea_height();
            var rem = height + 'rem';

            var taStyle = this.state.textareaStyle.set('height', rem).set('color', 'black');

            this.setState({ text: value, textareaStyle: taStyle, cancelable: false });

            //this.calculate_textarea_height();

            if (typeof this.props.handleChange === 'function') {
                this.props.handleChange(e);
            }
        }
    }, {
        key: 'calculate_textarea_height',
        value: function calculate_textarea_height() {
            var minLines = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 4;
            var maxLines = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 20;

            // get the height according to lines of text

            var nlines = 1;
            try {
                nlines = this.state.text.split(/\r?\n/).length;
            } catch (e) {
                console.log('we cann\'t determine number of lines for textarea');
            }

            if (nlines < minLines) return minLines;
            if (nlines > maxLines) return maxLines;
            return nlines;
        }
    }, {
        key: 'renderCancel',
        value: function renderCancel() {
            if (this.state.cancelable) {
                return _react2.default.createElement(
                    'button',
                    { type: 'submit', value: 'Submit',
                        onClick: this.handleCancel,
                        className: 'btn btn-primary', style: this.state.buttonStyle.toObject() },
                    'Cancel'
                );
            } else {
                return '';
            }
        }
    }, {
        key: 'render',
        value: function render() {

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


            return _react2.default.createElement(
                'form',
                { onSubmit: this.handleSubmit, className: 'commentEditor' },
                _react2.default.createElement('textarea', {
                    className: 'sizeisquestion',
                    type: 'textarea',
                    style: this.state.textareaStyle.toObject(),
                    wrap: 'off',

                    placeholder: this.hints,

                    onChange: this.onChange
                }),
                this.renderCancel(),
                _react2.default.createElement(
                    'button',
                    { type: 'submit', value: 'Submit',
                        onClick: this.handleSubmit,
                        className: 'btn btn-primary', style: this.state.buttonStyle.toObject() },
                    'Submit'
                )
            );
        }
    }]);

    return Editor;
}(_react2.default.Component);

exports.Editor = Editor;