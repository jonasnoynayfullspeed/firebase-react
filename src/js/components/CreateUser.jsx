import React, { Component } from 'react';
import { connect } from 'react-redux';
import { userActions } from '../actions/user.actions';

class CreateUser extends Component {
    constructor(props, context) {
		super(props, context);
		this.state = {
            name: ''
        }

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(e) {
        e.preventDefault();
        this.props.dispatch(userActions.createUser(this.state.name));
    }

    handleChange(e) {
        this.setState({
            name: e.target.value
        });
    }

    render() {
        return (
            <div className={"chatApp__createUser"}>
                <form onSubmit={this.handleSubmit}>
                    <div className={"chatApp__createUserLabel"}>Input Your Name</div>
                    <input className={"chatApp__createUserInput"} type="text" placeholder="Your name" value={this.state.name} onChange={this.handleChange} />
                    <button className={"chatApp__createUserSubmit"} type="submit">Enter Chatroom</button>
                </form>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        user: state.user.user
    }
}

export default connect(mapStateToProps)(CreateUser);