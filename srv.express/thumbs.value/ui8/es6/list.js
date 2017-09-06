
// must for reactjs
import React from 'react';
import ReactDOM from 'react-dom';



//import Radium from 'radium';

//import {buildMenu} from './menu.top.js';
//import BasicHeader from './header.js';
//import TitleDescriptionThumbs from './tdt.js';
//import BasicFooter from './footer.js';

/*
 * render front page with one title description.
 */
//function listContents (contentList, menuCallback){
function ContentList (props){

    var contentList = props.contentList;
    var menu        = props.menuInterface;

    //console.log(typeof contentList, Object.keys(contentList));
    //console.log(typeof contentList, menuItems, typeof menuCallback);

    function mkList (){
        return contentList.map((content)=>{
            //console.log(content.id);
            let id = content.getIdStr();
            let opt= {"id": id};

            function clickTriger(){
                menu.opt = opt;
                menu.currentItem = 'read';
            }

            function countThumbs(){
                let thumbs, up, down, net;
                net = '?';

                thumbs = content.prepare_thumbs_obj();
                if(thumbs){
                    up = thumbs.number_of_up_thumbs();
                    down = thumbs.number_of_down_thumbs();
                    if(Number.isInteger(up) && Number.isInteger(down)) net = up - down;
                }

                return `${net} (^${up}, ${down}v) `;
            }

            return(
                <li
                        key={id} 
                        onClick={clickTriger}
                >
                    <span>{countThumbs()}</span>
                    {content.getWords().slice(0, 100)}
                        
                </li>
            );
        });
    }


    // style
    const s = {
        display: 'block',
        clear: 'both',
    };

    return (
        <div className="frontPage" style={s}>

            <hr style={s} />

            <ul>
                {mkList()}
            </ul>

        </div>
    );
}

function listContents (contentList, menu){
    const listJsx = <ContentList contentList={contentList} menuInterface={menu} />;
    return ReactDOM.render(listJsx, document.getElementById('main'));
}

export {listContents};
