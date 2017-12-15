import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import Apple from './components/apple';

class App extends Component {
    render () {
        return (
            <div className="App">
                <header className="App-header">
                    <img src={logo} className="App-logo" alt="logo"/>
                    <h1 className="App-title">Welcome to React</h1>
                </header>
                <p className="App-intro">
                    To get started, edit <code>src/App.js</code> and save to reload.
                </p>

                <Apple color={'orange'} x={200} y={250} />
                <Apple color={'purple'} x={350} y={250} />
                <Apple color={'pink'} x={300} y={350} />
            </div>
        );
    }
}

export default App;
