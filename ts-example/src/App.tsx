import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import Demo from './pages/Demo';
import logo from './logo.svg';
import './App.css';

import Home from './pages/Home'
import Face from './pages/Face'

function App() {
	let [f, setF] = useState(false);

	document.addEventListener('mask',(e:any) => {
		console.log("%c Line:11 🍺 e", "color:#6ec1c2", e);
		if(e.detail.url){
			setF(true)
		}
	})
	
  return (
    <div className="App">
      <header className="App-header">
				<Home />
				<Face />
				{
					f ? ReactDOM.createPortal(<Demo></Demo>,document.getElementById("root") as any) : ''
				}
      </header>
    </div>
  );
}

export default App;
