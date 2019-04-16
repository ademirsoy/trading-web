import React, { Component } from 'react';
import { get, patch } from '../lib/api-client';
import {isAuthenticated, redirect} from "../lib/session-manager";

class Broker extends Component {

    constructor(props){
        super(props);

        this.state = {
            assets: []
        }
    }

    componentWillMount() {
        if(!isAuthenticated()) {
            redirect('/login');
        }
    }

    componentDidMount() {
        get('/financial-assets')
            .then(data => this.setState({...this.state, assets: data}))

    }

    modifySpread(asset) {
        asset.modify = true;

        this.setState({
            ...this.state,
            assets: this.state.assets.map(a => {
                if (a.id === asset.id) {
                    return asset;
                }
                return a;
            })
        });
    }

    onSpreadChange(asset, value) {
        asset.spread = value;

        this.setState({
            ...this.state,
            assets: this.state.assets.map(a => {
                if (a.id === asset.id) {
                    return asset;
                }
                return a;
            })
        });
    }

    updateSpread(asset, event) {
        asset.spread = event.target.value;
        asset.modify = false;
        patch('/financial-assets/' + asset.id, asset)
            .then(() => {
                this.setState({
                    ...this.state,
                    assets: this.state.assets.map(a => {
                        if (a.id === asset.id) {
                            return asset;
                        }
                        return a;
                    })
                });
            })
    }

    renderSymbols() {
        return this.state.assets.map(asset =>
            <tr key={asset.id}>
                <td>{asset.symbol}</td>
                <td>{asset.rate}</td>
                <td>{asset.modify ?
                    <input type="number"
                           min={0}
                           step={0.01}
                           className="text-center"
                           value={asset.spread}
                           onChange={(event) => this.onSpreadChange(asset, event.target.value)}
                           onBlur={(event) => this.updateSpread(asset, event)} />
                    :
                    <span onClick={() => this.modifySpread(asset)}>{asset.spread}</span>}
                </td>
            </tr>
        );
    }

    render() {
        return (
            <div className="row">
                <div className="panel panel-default">
                    <div className="panel-heading">
                        <h3 className="panel-title">Spread Management</h3>
                    </div>
                    <div className="panel-body">
                        <div className="col-md-8 col-md-offset-2">
                            <h5 className="pull-right">*Click on the spread values to modify</h5>
                            <table className="table table-bordered">
                                <thead>
                                <tr>
                                    <th>Symbol</th>
                                    <th>Rate</th>
                                    <th>Spread</th>
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

export default Broker;