import React, {Component} from 'react';
import axios from 'axios';
import Flight from './components/Flight/Flight';
import './App.css';



class App extends Component {

    state = {};

    render() {
        return (
            <Flight/>
        );
    }
}

export default App;
