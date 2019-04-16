import React, { Component } from 'react';
import {isAuthenticated, redirect} from "../lib/session-manager";
import {get} from "../lib/api-client";

class TradeList extends Component {

    constructor(props){
        super(props);

        this.state = {
            trades: []
        }
    }

    componentWillMount() {
        if(!isAuthenticated()) {
            redirect('/login');
        }
    }

    componentDidMount() {
        get('/trades')
            .then(data => this.setState({...this.state, trades: data}))
    }

    renderSymbols() {
        return this.state.trades.map(trade =>
            <tr key={trade.id}>
                <td>{trade.symbol}</td>
                <td>{trade.amount}</td>
                <td>{trade.rate}</td>
                <td>{trade.type}</td>
            </tr>
        );
    }

    render() {
        return (
            <div className="panel panel-default">
                <div className="panel-heading">
                    <h3 className="panel-title">Trades</h3>
                </div>
                <div className="panel-body">
                    <div className="table-responsive col-md-8 col-md-offset-2">
                        <table className="table table-bordered">
                            <thead>
                            <tr>
                                <th>Symbol</th>
                                <th>Amount</th>
                                <th>Rate</th>
                                <th>Type</th>
                            </tr>
                            </thead>
                            <tbody>
                            {this.renderSymbols()}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        );
    }
}

export default TradeList;