
const { Map, List } = require('immutable')

const map1 = Map({ a: 1, b: 2, c: 3 })
const map2 = map1.set('b', 50)
map1.get('b') // 2
map2.get('b') // 50


function foo(){
    return [1,2,3];
}
