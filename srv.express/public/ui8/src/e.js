
const EventEmitter = require('events');

class Emitter extends EventEmitter {}

module.exports.Emitter = Emitter;


//const myEmitter = new Emitter();
//myEmitter.on('event', () => {
//	console.log('an event occurred!');
//});
//myEmitter.emit('event');

if(require.main === module){
    let p = console.log;
    p(Object.keys(myEmitter));
    //de.emit('demoEvent');
}
