'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.CommentButton = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _editor = require('./editor.js');

var _one = require('../../data/one.js');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
//const ReactDOM = require('react-dom');

var CommentButton = function (_React$Component) {
    _inherits(CommentButton, _React$Component);

    function CommentButton(props) {
        _classCallCheck(this, CommentButton);

        var _this = _possibleConstructorReturn(this, (CommentButton.__proto__ || Object.getPrototypeOf(CommentButton)).call(this, props));
        // props: buttonText, Item Object for the editor (words)


        _this.state = {
            showWhat: 'button',
            text: props.text
        };

        _this.style = {
            button: {
                display: "inline-block",
                color: "green"
            },
            editor: {
                display: "block"
            }
        };

        _this.comment = _this.setCommentObj();

        _this.noop = function () {};

        _this.buttonClick = _this.buttonClick.bind(_this);

        //indev
        //console.log('constructor');
        //window.o = this;
        return _this;
    }

    _createClass(CommentButton, [{
        key: 'setCommentObj',
        value: function setCommentObj() {
            var upId = this.props.obj.getIdStr();
            var comment = (0, _one.makeWordsObj)();
            comment.setAttr('upLinkId', upId);
            return comment;
        }
    }, {
        key: 'prepareComment_OnChangeFunction',
        value: function prepareComment_OnChangeFunction() {
            var self = this;
            var comment = this.comment;

            return function (e) {
                e.preventDefault();
                var text = e.target.value;
                comment.setWords(text);
            };
        }
    }, {
        key: 'prepareComment_OnSubmitFunction',
        value: function prepareComment_OnSubmitFunction() {
            var self = this;
            var comment = this.comment;

            return function (e) {
                e.preventDefault();
                var text = e.target.value;
                comment.save(text);
                self.showWhat = 'button'; //?
            };
        }
    }, {
        key: 'buttonClick',
        value: function buttonClick(e) {
            e.preventDefault();
            this.setState({ showWhat: 'editor' });
        }
    }, {
        key: 'renderButton',
        value: function renderButton() {
            return _react2.default.createElement(
                'button',
                { onClick: this.buttonClick, style: this.style.button },
                this.props.buttonText,
                ' ',
                _react2.default.createElement('i', { className: 'fa fa-pencil-square-o' })
            );
        }
    }, {
        key: 'renderEditor',
        value: function renderEditor() {
            return _react2.default.createElement(_editor.Editor, { text: this.props.obj.getWords(),
                handleSubmit: this.prepareComment_OnSubmitFunction(),
                handleCancel: this.noop,
                handleChange: this.prepareComment_OnChangeFunction()
            });
        }
    }, {
        key: 'render',
        value: function render() {
            if (this.state.showWhat === 'editor') {
                return this.renderEditor();
            }
            return this.renderButton();
        }
    }]);

    return CommentButton;
}(_react2.default.Component);

exports.CommentButton = CommentButton;