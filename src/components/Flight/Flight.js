import React, {Component} from 'react';
import Form from '../Form/Form';
import axios from "axios/index";
import moment from 'moment';
import './Flight.css';

axios.defaults.baseURL = 'https://api.skypicker.com';

class Flight extends Component {

    constructor() {
        super();
        this.state = {
            response: [],
            cityTo: '',
            cityFrom: '',
            limit: '5',
            stopover: false
        }
        this.cityToHandler = this.cityToHandler.bind(this);
        this.cityFromHandler = this.cityFromHandler.bind(this);
        this.limitHandler = this.limitHandler.bind(this);
        this.stopoverHandler = this.stopoverHandler.bind(this);
    }

    axiosHandler() {
        let response = axios.get(`/flights?flyFrom=${this.state.cityFrom}&to=${this.state.cityTo}&dateFrom=29/06/2018&dateTo=01/07/2018&limit=${this.state.limit}&${this.state.stopover ? 'directFlights=1' : null}`)
            .then(res => {
                console.log(res.data.data);
                this.setState({
                    response: res.data.data
                });

            })
            .catch(err => console.log(err));
    }

    componentDidMount() {
        this.axiosHandler();
    }

    componentDidUpdate(prevProps, prevState) {
        if(this.state.cityTo != prevState.cityTo 
            || this.state.cityFrom != prevState.cityFrom 
            || this.state.limit != prevState.limit
            || this.state.stopover != prevState.stopover){
            this.axiosHandler();
        } 
    }

    cityToHandler(event) {
        this.setState({cityTo: event.target.value});
    }

    cityFromHandler(event) {
        this.setState({cityFrom: event.target.value});
    }

    limitHandler(event) {
        this.setState({limit: event.target.value});
    }

    stopoverHandler(event) {
        this.setState({stopover: event.target.checked ? true : false});
    }


    render() {

        return (
            <div>
                <div>
                    <form>
                        To: <br/>
                        <select name="cityTo" onChange={this.cityToHandler}>
                            <option value="Barcelona">Barcelona</option>
                            <option value="Milan">Milan</option>
                            <option value="Athens">Athens</option>
                            <option value="Madrid">Madrid</option>
                            <option value="Valencia">Valencia</option>
                        </select>
                        <br/>
                        From: <br/>
                        <select name="cityFrom" onChange={this.cityFromHandler}>
                            <option value="Prague">Prague</option>
                            <option value="Berlin">Berlin</option>
                            <option value="Warsaw">Warsaw</option>
                            <option value="Bratislava">Bratislava</option>
                        </select>
                        <br/>
                        How many: <br/>
                        <input onChange={this.limitHandler} type="number"/>
                        <br/>
                        Direct flights: <br/>
                        <input onChange={this.stopoverHandler} type="checkbox"/>
                        <h1>{this.state.cityFrom}</h1>
                        <h1>{this.state.cityTo}</h1>
                    </form>
                </div>
                
                { this.state.response.length ? <div className={'Flights'}>
                    {this.state.response.map((flight, index) => {
                        return (
                            <div className={'Flight'}>
                                <div><strong>City of departure:</strong> {flight.cityFrom}</div>
                                <div><strong>City of arrival:</strong> {flight.cityTo}</div>
                                <div><strong>Price:</strong> {flight.price} EUR</div>
                                <div><strong>Time of departure:</strong> <br/>{moment(flight.dTime * 1000).format("DD MMM YYYY hh:mm a")}</div>
                                <div><strong>Time of arrival:</strong> <br/>{moment(flight.aTime * 1000).format("DD MMM YYYY hh:mm a")}</div>
                                <div><strong>Stopovers:</strong> {flight.route.length-1}</div>
                            </div>
                        )
                    })}
                </div> : <h1>Please select a flight by selecting the city of departure and arrival!</h1>}
            </div>
        )
    }
}

export default Flight;