'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.renderItemViewer = exports.ItemViewer = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _thumbs = require('./thumbs.js');

var _thumbs2 = _interopRequireDefault(_thumbs);

var _buttonAct = require('./button.act.js');

var _clickEdit = require('./click.edit.js');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
/*
 * to display an value item.
 */

var ReactDOM = require('react-dom');

var ItemViewer = function (_React$Component) {
    _inherits(ItemViewer, _React$Component);

    function ItemViewer(props) {
        _classCallCheck(this, ItemViewer);

        // props.obj:
        // props should give an object of 'words',
        // currently it's obj defined in one.js

        var _this = _possibleConstructorReturn(this, (ItemViewer.__proto__ || Object.getPrototypeOf(ItemViewer)).call(this, props));

        _this.state = {
            thumbs: {}
            //"words": 'should we make a component for textarea or?',
        };

        _this.thumbs = _this.props.obj.prepare_thumbs_obj();

        _this.addComment = _this.addComment.bind(_this);

        console.log('set global');
        window.item = _this;
        return _this;
    }

    _createClass(ItemViewer, [{
        key: 'addComment',
        value: function addComment() {
            console.log('add comment for ', this.props.obj.getIdStr());
        }
    }, {
        key: 'render',
        value: function render() {
            var _preStyle;

            var preStyle = (_preStyle = {
                whiteSpace: "pre-wrap" }, _defineProperty(_preStyle, 'whiteSpace', "-moz-pre-wrap"), _defineProperty(_preStyle, 'whiteSpace', "-pre-wrap"), _defineProperty(_preStyle, 'whiteSpace', "-o-pre-wrap"), _preStyle);

            return _react2.default.createElement(
                'div',
                { className: 'itemViewer' },
                _react2.default.createElement(
                    'pre',
                    { style: preStyle },
                    this.props.obj.getWords()
                ),
                _react2.default.createElement(_thumbs2.default, { thumbsobj: this.thumbs }),
                _react2.default.createElement(_clickEdit.CommentButton, { buttonText: "Comment", obj: this.props.obj })
            );
        }
    }]);

    return ItemViewer;
}(_react2.default.Component);

// cache should be used when comments added to add it to cache, but not


function renderItemViewer(dataObj, cache, elementId, mState) {
    // mobj: menu object

    return ReactDOM.render(_react2.default.createElement(ItemViewer, { obj: dataObj }), document.getElementById(elementId));
}

exports.ItemViewer = ItemViewer;
exports.renderItemViewer = renderItemViewer;