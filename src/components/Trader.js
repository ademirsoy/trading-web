import React, { Component } from 'react';
import TradeOrder from './TraderOrder';
import { get } from '../lib/api-client';
import { isAuthenticated, redirect } from '../lib/session-manager';
import './../App.css';

class Trader extends Component {

    constructor(props){
        super(props);

        this.state = {
            rates: []
        }
    }

    componentWillMount() {
        if(!isAuthenticated()) {
            redirect('/login');
        }
    }

    componentDidMount() {
        get('/financial-assets')
            .then(data => this.setState({...this.state, rates: data}));
    }

    openTradeDialog(rate, type) {
        this.setState({
            ...this.state,
            rates: this.state.rates.map(selected => {
                if (selected.id === rate.id) {
                    type === 'BUY' ? selected.showBuyDialog = true : selected.showSellDialog = true;
                    return selected;
                }
                return selected;
            })
        });
    }

    renderTradeButtons(rate) {
        return (
            <div>
                <button onClick={() => this.openTradeDialog(rate, 'BUY')}
                        type="button" className="btn btn-success form-element">Buy</button>
                <button onClick={() => this.openTradeDialog(rate, 'SELL')}
                        type="button" className="btn btn-danger">Sell</button>
            </div>
        );
    }

    renderSymbols() {
        return this.state.rates.map(rate =>
            <tr key={rate.id}>
                <td>{rate.symbol}</td>
                <td>{rate.bid}</td>
                <td>{rate.offer}</td>
                <td className="action-column">
                    {rate.showBuyDialog ?
                        <TradeOrder asset={rate} orderType="BUY"/> :
                        (rate.showSellDialog ?
                            <TradeOrder asset={rate} orderType="SELL" /> :
                            this.renderTradeButtons(rate))}
                </td>
            </tr>
        );
    }

    render() {
        return (
            <div className="row">
                <div className="panel panel-default">
                    <button
                        type="button"
                        onClick={() => window.location.reload()}
                        className="pull-right btn btn-default btn-sm refresh-button"
                    >
                        <span className="glyphicon glyphicon-refresh"/> Refresh
                    </button>
                    <div className="panel-heading">
                        <h3 className="panel-title">Symbols</h3>
                    </div>
                    <div className="panel-body">
                        <div className="table-responsive col-md-8 col-md-offset-2">
                            <table className="table table-bordered">
                                <thead>
                                <tr>
                                    <th>Symbol</th>
                                    <th>Bid</th>
                                    <th>Offer</th>
                                    <th>Action</th>
                                </tr>
                                </thead>
                                <tbody>
                                {this.renderSymbols()}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Trader;