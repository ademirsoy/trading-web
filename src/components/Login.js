import React, {Component} from 'react';
import { post } from '../lib/api-client';
import { isAuthenticated, redirect } from '../lib/session-manager';

class Login extends Component {

    constructor(props) {
        super(props);

        this.state = {
            username: "",
            password: ""
        };
    }

    componentWillMount() {
        if(isAuthenticated()) {
            redirect('/');
        }
    }

    validateForm() {
        return this.state.username.length > 0 && this.state.password.length > 0;
    };

    handleChange = event => {
        this.setState({
            [event.target.id]: event.target.value
        });
    };

    handleSubmit = event => {
        event.preventDefault();
        post('/login/auth', this.state)
            .then((response) => {
                localStorage.setItem('token', response.token);
                redirect('/')
            })
    };

    render() {
        return (
            <div className="login">
                <form onSubmit={this.handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="username">Username</label>
                        <input type="text"
                               className="form-control"
                               value={this.state.username}
                               onChange={this.handleChange}
                               id="username"
                               placeholder="Username"/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <input type="password"
                               className="form-control"
                               value={this.state.password}
                               onChange={this.handleChange}
                               id="password"
                               placeholder="Password"/>
                    </div>
                    <button
                        className="btn btn-lg btn-default"
                        disabled={!this.validateForm()}
                        onSubmit={this.handleSubmit}
                        type="submit"
                    >
                        Login
                    </button>
                </form>
            </div>
        );
    }
}

export default Login;
