
/*
 * menuItems : {
 *   menuId: menuString
 *   string of the name, same as i18n keys: string of text to display
 * }
 */


function nav(menuItems){
}


function listItems(menuItems){
    var tags = [];

    var keys = Object.keys(menuItems);

    var tags = keys.map(function(key){
        return `<a href='' data-name="${key}"> menuItems[key] </a>`;
    });
}
