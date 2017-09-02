
// do we need to set menu for reading?
// context?
function setMenuReading(mobj, opt){
    //opt: {id: id string of mongodb _id object}

    mobj.opt = opt;
    mobj.context = mobj.getMenuData().context4read
    mobj.currentItem = 'read';
}

