'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _bluebird = require('bluebird');

var _immutable = require('immutable');

var _thumbNumber = require('./thumb.number.js');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

//import Radium from 'radium';

var p = console.log;

function FontAwesomeIcon(props) {

    if (!props.name || typeof props.name !== 'string' || props.name.length < 2) {
        return _react2.default.createElement('i', null);
    }

    var name = props.name;

    // beside no size/default, there are:
    // fa-lg (33% increase), fa-2x, fa-3x, fa-4x, or fa-5x
    var size = props.size || "";

    var spin = props.spin ? 'fa-spin' : '';

    // This will be like: "fa fa-thumbs-o-up fa-2x"
    var fa_class = 'fa ' + name + ' ' + size + ' ' + spin;
    //console.log(fa_class);

    // styles 
    var styles = {
        marginLeft: "0.5em",
        marginRight: "0.5em"
    };

    return _react2.default.createElement('i', { className: fa_class, style: styles });
}
//FontAwesomeIcon = Radium(FontAwesomeIcon);


function ThumbUp2X(props) {
    return _react2.default.createElement(FontAwesomeIcon, { name: 'fa-thumbs-o-up', size: 'fa-2x' });
}

function ThumbDown2X(props) {
    return _react2.default.createElement(FontAwesomeIcon, { name: 'fa-thumbs-o-down', size: 'fa-2x' });
}

var ThumbUp_And_Number = function (_Component) {
    _inherits(ThumbUp_And_Number, _Component);

    function ThumbUp_And_Number(props) {
        _classCallCheck(this, ThumbUp_And_Number);

        var _this = _possibleConstructorReturn(this, (ThumbUp_And_Number.__proto__ || Object.getPrototypeOf(ThumbUp_And_Number)).call(this, props));

        _this.data = props.data;

        _this.dataId = props.dataId || null;
        _this.valueId = props.valueId || null;

        //if(typeof props.clickCallback === 'function'){
        //    this.clickCallback = props.clickCallback || null;
        //}
        //
        // callback parameters: username?, event?, dataId, valueId
        _this.clickCallback = props.clickCallback || function () {};

        // thumbsup or down
        _this.state = {
            color: 'green'
        };

        _this.click = _this.click.bind(_this);
        return _this;
    }

    _createClass(ThumbUp_And_Number, [{
        key: 'getStyles',
        value: function getStyles() {
            return {
                wrap: {
                    color: this.state.color,
                    //float: "left",
                    display: "inline-block",
                    width: '3em'

                    //margin: "3px 5px 3px",

                    //paddingLeft: "1em",
                    //paddingRight: "0.5em",

                }
            };
        }
    }, {
        key: 'click',
        value: function click(e) {
            e.preventDefault();
            this.setState({ color: 'grey' });

            console.log('clicked ' + Date.now().toString());

            this.clickCallback(e, this.data.id, this.data.valueId);
        }
    }, {
        key: 'render',
        value: function render() {

            return _react2.default.createElement(
                'span',
                { onClick: this.click },
                _react2.default.createElement(ThumbUp2X, null),
                _react2.default.createElement(_thumbNumber.NumberOfThumbs, { number: '18' })
            );
        }
    }]);

    return ThumbUp_And_Number;
}(_react.Component);

var Thumbs = function (_Component2) {
    _inherits(Thumbs, _Component2);

    function Thumbs(props) {
        _classCallCheck(this, Thumbs);

        // thumbs object
        var _this2 = _possibleConstructorReturn(this, (Thumbs.__proto__ || Object.getPrototypeOf(Thumbs)).call(this, props));

        _this2.obj = props.thumbsobj;

        _this2.upStyle = (0, _immutable.Map)({
            "display": "inline-block",
            "color": "green"
        });
        _this2.downStyle = (0, _immutable.Map)({
            "display": "inline-block",
            "color": "green"
        });
        _this2.infoStyle = (0, _immutable.Map)({
            "display": "inline-block",
            "color": "green"
        });

        // setState is async, it means it can be delay

        _this2.state = {
            milli: Date.now(),
            upNumber: _this2.obj.number_of_up_thumbs(),
            upClicked: false,
            upStyle: _this2.upStyle,

            downNumber: _this2.obj.number_of_down_thumbs(),
            downClicked: false,
            downStyle: _this2.downStyle,

            infoStyle: _this2.infoStyle
        };

        _this2.changeState = _bluebird.Promise.promisify(_this2.setState);

        _this2.upClick = _this2.upClick.bind(_this2);
        _this2.downClick = _this2.downClick.bind(_this2);
        _this2.infoClick = _this2.infoClick.bind(_this2);
        return _this2;
    }

    _createClass(Thumbs, [{
        key: 'countNumbers',
        value: function countNumbers() {
            //this.state.milli = Date.now();
            var up = this.obj.number_of_up_thumbs();
            var down = this.obj.number_of_down_thumbs();

            //console.log('to refresh? ', up, down);
            //return this.changeState({ upNumber : up, downNumber : down});

            //console.log('refreshed? ', this.state.upNumber, this.state.downNumber);
            return [up, down];
        }
    }, {
        key: 'upClick',
        value: function upClick(e) {
            var _this3 = this;

            e.preventDefault();

            if (this.state.upClicked) return _bluebird.Promise.resolve(false);

            var newState = {}; // upNumber ...

            console.log('up clicked ' + Date.now().toString());

            return this.obj.addThumb(true).then(function () {
                //var ks = Object.keys(this.obj.getThumbs().up);
                //console.log('add thumb then: ', ks);
                //console.log(ks.join(", "));

                var upN, downN;

                var _countNumbers = _this3.countNumbers();

                var _countNumbers2 = _slicedToArray(_countNumbers, 2);

                upN = _countNumbers2[0];
                downN = _countNumbers2[1];

                newState['upNumber'] = upN || '??';
                newState['downNumber'] = downN;

                return null;
            }).then(function () {
                newState['upStyle'] = _this3.upStyle.set("color", "grey");
                newState['upClicked'] = true;

                console.log('changing state ', newState);
                return _this3.changeState(newState);
            });
        }
    }, {
        key: 'downClick',
        value: function downClick(e) {
            var _this4 = this;

            e.preventDefault();

            if (this.state.downClicked) return _bluebird.Promise.resolve(false);

            var newState = {};

            console.log('down clicked ' + Date.now().toString());

            return this.obj.addThumb(false).then(function () {

                var upN, downN;

                var _countNumbers3 = _this4.countNumbers();

                var _countNumbers4 = _slicedToArray(_countNumbers3, 2);

                upN = _countNumbers4[0];
                downN = _countNumbers4[1];

                newState['upNumber'] = upN;
                newState['downNumber'] = downN;

                return null;
            }).then(function () {
                newState['downStyle'] = _this4.downStyle.set("color", "grey");
                newState['downClicked'] = true;

                console.log('changing state ', newState);
                return _this4.changeState(newState);
            });
        }
    }, {
        key: 'infoClick',
        value: function infoClick(e) {
            e.preventDefault();

            console.log('info clicked ' + Date.now().toString());
            console.log(this.obj.showSimple());

            //this.setState({color: 'grey'});
            //this.clickCallback(e, this.data.id, this.data.valueId);
        }
    }, {
        key: 'doRender',
        value: function doRender() {
            //console.log(" --- do render ");
            var wrapStyle = {
                width: "16em",
                display: "inline-block",
                padding: "3px 5px 3px 5px",
                //border: "1px green solid",
                textAlign: "center",

                color: "green"
            };

            return _react2.default.createElement(
                'div',
                { style: wrapStyle },
                _react2.default.createElement(
                    'span',
                    { onClick: this.upClick, style: this.state.upStyle.toObject() },
                    _react2.default.createElement(ThumbUp2X, null),
                    this.state.upNumber
                ),
                _react2.default.createElement(
                    'span',
                    { onClick: this.downClick, style: this.state.downStyle.toObject() },
                    _react2.default.createElement(ThumbDown2X, null),
                    this.state.downNumber
                ),
                _react2.default.createElement(
                    'span',
                    { onClick: this.infoClick, style: this.state.infoStyle.toObject() },
                    _react2.default.createElement(FontAwesomeIcon, { name: 'fa-calculator', size: 'fa-2x' })
                )
            );
        }
    }, {
        key: 'render',
        value: function render() {
            return this.doRender();
        }
    }]);

    return Thumbs;
}(_react.Component);

exports.default = Thumbs;