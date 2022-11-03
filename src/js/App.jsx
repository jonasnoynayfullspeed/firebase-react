import React, { Component } from 'react';
import ChatRoom from './components/ChatRoom';
import Loading from './components/Loading';
import CreateUser from './components/CreateUser';
import { connect } from 'react-redux';
import { userActions } from './actions/user.actions';
import { messageActions } from './actions/message.actions';

class App extends Component {

	constructor(props, context) {
		super(props, context);
	
		this.state = {
			loading: true
		}
	}

	async componentDidMount() {
		const { user, admin } = this.props;

		if(! admin) {
			await this.props.dispatch(userActions.getAdmin());
		}
		
		const localUserId = localStorage.getItem('userId');

		if(!user && localUserId != null) {
			await this.props.dispatch(userActions.getUser(localUserId));
		}

		this.setState({ loading: false });

		//setTimeout(() => this.setState({ loading: false }), 400);
	}
	

	render() {
		let { loading } = this.state;
		const { user } = this.props;

		if(loading) {
			return <Loading />
		}		
		
		if(user == null) {
			
			return <CreateUser />
		}

		return <ChatRoom />
	}
}

const mapStateToProps = (state) => {
    return {
        user: state.user.user,
		admin: state.user.admin
    }
}

export default connect(mapStateToProps)(App);
