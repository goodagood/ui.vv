'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.renderNavMenu = exports.buildMenu = exports.Menu = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ReactDOM = require('react-dom');

//import Radium from 'radium';

var p = console.log;

var Item = function (_Component) {
    _inherits(Item, _Component);

    /*
     * pass in parameters:
     * name, content, clickCallback which is a function.
     */

    function Item(props) {
        _classCallCheck(this, Item);

        var _this = _possibleConstructorReturn(this, (Item.__proto__ || Object.getPrototypeOf(Item)).call(this, props));

        _this.state = {
            name: null || props.name,
            content: null || props.content
        };

        _this.click = _this.click.bind(_this);
        return _this;
    }

    _createClass(Item, [{
        key: 'click',
        value: function click(e) {
            e.preventDefault();
            if (typeof this.props.clickCallback !== 'function') return false;

            this.props.clickCallback(this.state.name);
        }
    }, {
        key: 'render',
        value: function render() {
            var content = this.state.content ? this.state.content : 'MENU?';
            var name = this.state.name ? this.state.name : 'NOmenuNAME';

            return _react2.default.createElement(
                'span',
                {
                    style: styles.item,
                    onClick: this.click
                },
                content
            );
        }
    }]);

    return Item;
}(_react.Component);

/*
 * menu items:
 * name: content
 * name is a string without space, content is string display on webpage
 *
 * method:
 * add item
 * del item
 * callback when clicked
 */


var Menu = function (_Component2) {
    _inherits(Menu, _Component2);

    function Menu(props) {
        _classCallCheck(this, Menu);

        // key starts with _/underline is not menu item.
        var _this2 = _possibleConstructorReturn(this, (Menu.__proto__ || Object.getPrototypeOf(Menu)).call(this, props));

        _this2.state = Object.assign({
            _collapsed: false
        }, props.menuItems);

        //this.clickCallback = props.menuCallback;

        //console.log('menu constructor ', this.state);
        return _this2;
    }

    _createClass(Menu, [{
        key: 'listMenuItems',
        value: function listMenuItems() {
            //p('to list menu: ', this.state);
            var list = [];
            for (var k in this.state) {
                if (typeof k === 'string') {
                    if (k.startsWith("_")) {
                        continue;
                    }

                    list.push(_react2.default.createElement(Item, { name: k, key: k,
                        content: this.state[k],
                        clickCallback: this.props.menuCallback }));
                }
            }
            //return list.join("\r\n");
            return list;
        }
    }, {
        key: 'renderBasicHeader',
        value: function renderBasicHeader() {
            return _react2.default.createElement(
                'div',
                { className: 'menu',
                    style: styles.menu_wrap
                },
                this.listMenuItems()
            );
        }
    }, {
        key: 'render',
        value: function render() {
            return this.renderBasicHeader();
        }
    }]);

    return Menu;
}(_react.Component);

var styles = {
    menu_wrap: {
        fontFamily: "Monospace, Helvetica, Arial, sans-serif",
        fontSize: "1.2em",
        display: "inline-block",
        float: "right",
        paddingLeft: "1em",
        paddingRight: "1em"

    },
    item: {
        fontFamily: "Verdana, Arial, sans-serif, Helvetica, Monospace",
        fontSize: "1.1em",
        fontWeight: "bold",
        //padding: "0.2em 0.5em 0.2em",
        margin: "0.2em 0.5em 0.2em",
        textAlign: "center",
        whiteSpace: "nowrap",
        color: "fff",
        backgroundColor: "#33c3f0",
        borderRadius: "4px"
        //':hover': {
        //    paddingBottom: "0em",
        //},
    }
};

function buildMenu(items, clickCallback) {
    //console.log('build menu: ', items);

    // items = {
    //     "menu-name-without-space": "menu text to show on",
    //     firstMenu: "First Menu",
    //     secondMenu: "2nd menu content",
    //     thirdMenu: "BIG three",
    // };
    //
    // clickCallback will get "menu name" as parameter.

    return _react2.default.createElement(Menu, { menuItems: items, menuCallback: clickCallback });
}

function renderNavMenu(items, clickCallback) {
    var m = buildMenu(items, clickCallback);

    return ReactDOM.render(m, document.getElementById('nav'));
}

//Menu = Radium(Menu);
exports.Menu = Menu;
exports.buildMenu = buildMenu;
exports.renderNavMenu = renderNavMenu;