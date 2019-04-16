import React, {Component} from 'react';
import { post } from '../lib/api-client';

class TradeOrder extends Component {

    constructor(props) {
        super(props);

        this.state = {
            amount: 0
        };
        this.handleAmountChange = this.handleAmountChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }


    handleAmountChange(event) {
        this.setState({
            ...this.state,
            amount: event.target.value
        })
    }

    handleSubmit(asset, orderType) {
        let trade = {
            symbol: asset.symbol,
            amount: this.state.amount,
            rate: orderType === 'BUY' ? asset.bid : asset.offer,
            type: orderType
        };

        post('/trades', trade).then(() => window.location.reload())
    }

    render() {
        const {asset, orderType} = this.props;
        return (
            <div>
                <form className="form-inline">
                    <div className="form-group">
                        <label className="form-element" htmlFor="amount">{asset.symbol}</label>
                        <input
                            type="number"
                            min={0}
                            onChange={this.handleAmountChange}
                            className="form-control form-element"
                            id="amount"
                            placeholder="Amount"
                        />
                    </div>
                    <button type="submit" className="btn btn-default"
                            onClick={() => this.handleSubmit(asset, orderType)}>{orderType}
                    </button>
                </form>
            </div>
        );
    }
}

export default TradeOrder;