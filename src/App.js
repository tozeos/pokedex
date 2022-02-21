import './App.css';
import React, {Component} from 'react';
import Display from "./components/display";

class App extends Component {
    render() {
        return (
            <div className="App">
                <Display />
            </div>
        );
    }
}

export default App;