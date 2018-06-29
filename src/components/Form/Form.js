import React, {Component} from 'react';

class Form extends Component {

    constructor(props) {
        super(props);
        this.state = {
            
        };
    
        this.cityToHandler = this.cityToHandler.bind(this);
        this.cityFromHandler = this.cityFromHandler.bind(this);

    }

    cityToHandler(event) {
        this.setState({cityTo: event.target.value});
    }

    cityFromHandler(event) {
        this.setState({cityFrom: event.target.value});
    }

    render() {
        return (
            <div>
                <form>
                    From: <br/>
                    <select name="cityTo" onChange={this.cityToHandler}>
                        <option value="Barcelona">Barcelona</option>
                        <option value="Milano">Milano</option>
                        <option value="Athens">Athens</option>
                        <option value="Madrid">Madrid</option>
                        <option value="Valencia">Valencia</option>
                    </select>
                    <br/>
                    To: <br/>
                    <select name="cityFrom" onChange={this.cityFromHandler}>
                        <option value="Prague">Prague</option>
                        <option value="Berlin">Berlin</option>
                        <option value="Warsaw">Warsaw</option>
                        <option value="Pardubice">Pardubice</option>
                    </select>
                    <h1>{this.state.cityFrom}</h1>
                    <h1>{this.state.cityTo}</h1>
                </form>
            </div>
        )

    }
}

export default Form;