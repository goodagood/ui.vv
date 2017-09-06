
import React     from 'react';
import ReactDOM from 'react-dom';

function cBabel(){
	ReactDOM.render(
	  <h1>Hello, world!</h1>,
	  document.getElementById('hireact')
	);
}

function foo(){
    console.log('foo');
}

export {cBabel, foo};

