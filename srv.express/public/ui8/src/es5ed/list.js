'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.listContents = undefined;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//import Radium from 'radium';

//import {buildMenu} from './menu.top.js';
//import BasicHeader from './header.js';
//import TitleDescriptionThumbs from './tdt.js';
//import BasicFooter from './footer.js';

/*
 * render front page with one title description.
 */
//function listContents (contentList, menuCallback){

// must for reactjs
function ContentList(props) {

    var contentList = props.contentList;
    var menu = props.menuInterface;

    //console.log(typeof contentList, Object.keys(contentList));
    //console.log(typeof contentList, menuItems, typeof menuCallback);

    function mkList() {
        return contentList.map(function (content) {
            //console.log(content.id);
            var id = content.getIdStr();
            var opt = { "id": id };

            function clickTriger() {
                menu.opt = opt;
                menu.currentItem = 'read';
            }

            function countThumbs() {
                var thumbs = void 0,
                    up = void 0,
                    down = void 0,
                    net = void 0;
                net = '?';

                thumbs = content.prepare_thumbs_obj();
                if (thumbs) {
                    up = thumbs.number_of_up_thumbs();
                    down = thumbs.number_of_down_thumbs();
                    if (Number.isInteger(up) && Number.isInteger(down)) net = up - down;
                }

                return net + ' (^' + up + ', ' + down + 'v) ';
            }

            return _react2.default.createElement(
                'li',
                {
                    key: id,
                    onClick: clickTriger
                },
                _react2.default.createElement(
                    'span',
                    null,
                    countThumbs()
                ),
                content.getWords().slice(0, 100)
            );
        });
    }

    // style
    var s = {
        display: 'block',
        clear: 'both'
    };

    return _react2.default.createElement(
        'div',
        { className: 'frontPage', style: s },
        _react2.default.createElement('hr', { style: s }),
        _react2.default.createElement(
            'ul',
            null,
            mkList()
        )
    );
}

function listContents(contentList, menu) {
    var listJsx = _react2.default.createElement(ContentList, { contentList: contentList, menuInterface: menu });
    return _reactDom2.default.render(listJsx, document.getElementById('main'));
}

exports.listContents = listContents;