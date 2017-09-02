
import React, { Component } from 'react';
const ReactDOM = require('react-dom');

//import Radium from 'radium';

var p = console.log;


class Item extends Component {
    /*
     * pass in parameters:
     * name, content, clickCallback which is a function.
     */

    constructor(props) {
        super(props);
        this.state = {
            name: null || props.name,
            content: null || props.content,
        };

        this.click = this.click.bind(this);
    }

    click (e){
        e.preventDefault();
        if(typeof this.props.clickCallback !== 'function') return false;

        this.props.clickCallback(this.state.name);
    }

    render (){
        var content = this.state.content ? this.state.content : 'MENU?';
        var name    = this.state.name    ? this.state.name : 'NOmenuNAME';

        return <span 
            style={styles.item}
            onClick={this.click}
            >
            {content}
            </span>;
    }
}


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
class Menu extends Component {
    constructor(props) {
        super(props);

        // key starts with _/underline is not menu item.
        this.state = Object.assign(
        {
            _collapsed: false,
        },
        props.menuItems);

        //this.clickCallback = props.menuCallback;

        //console.log('menu constructor ', this.state);
    }



    listMenuItems  (){
        //p('to list menu: ', this.state);
        var list = [];
        for (var k in this.state){
            if(typeof k === 'string'){
                if(k.startsWith("_")){ continue; }

                list.push(
                      <Item name={k} key={k}
                      content={this.state[k]}
                      clickCallback={this.props.menuCallback} />
                );
            }
        }
        //return list.join("\r\n");
        return list;
    }

    renderBasicHeader (){
        return (
            <div className="menu" 
                style={styles.menu_wrap}
            >

                  {this.listMenuItems()}

            </div>
        );
    }

    render (){
        return this.renderBasicHeader();
    }
}

const styles = {
    menu_wrap: {
        fontFamily: "Monospace, Helvetica, Arial, sans-serif",
        fontSize: "1.2em",
        display: "inline-block",
        float: "right",
        paddingLeft: "1em",
        paddingRight: "1em",

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
        borderRadius: "4px",
        //':hover': {
        //    paddingBottom: "0em",
        //},
    }
}

function buildMenu(items, clickCallback){
    //console.log('build menu: ', items);

    // items = {
    //     "menu-name-without-space": "menu text to show on",
    //     firstMenu: "First Menu",
    //     secondMenu: "2nd menu content",
    //     thirdMenu: "BIG three",
    // };
    //
    // clickCallback will get "menu name" as parameter.

    return <Menu menuItems={items} menuCallback={clickCallback}  />;
}

function renderNavMenu(items, clickCallback){
    var m = buildMenu(items, clickCallback);

    return ReactDOM.render(m, document.getElementById('nav'));
}

//Menu = Radium(Menu);
export {Menu, buildMenu, renderNavMenu};
