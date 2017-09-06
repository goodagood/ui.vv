
const displayOne = require("../es5ed/element/item.viewer.js");

function showOneItem(id, dataCache, elementId, mState){

    // get the data object
    var dobj = dataCache.getObjById(id);

    displayOne.renderItemViewer(dobj, dataCache, elementId, mState);
}


module.exports.showOneItem = showOneItem;

