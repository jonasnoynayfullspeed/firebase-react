import React, { Component } from 'react';
import ChatBox from './ChatBox';
import { connect } from 'react-redux';
import { messageActions } from '../actions/message.actions';

function detectURL(message) {
	var urlRegex = /(((https?:\/\/)|(www\.))[^\s]+)/g;
	return message.replace(urlRegex, function(urlMatch) {
		return '<a href="' + urlMatch + '">' + urlMatch + '</a>';
	})
}

class ChatRoom extends Component {
	constructor(props, context) {
		super(props, context);
		this.state = {
			messages: [{
				id: 1,
				sender: 'jonas',
				senderAvatar: 'https://i.pravatar.cc/150?img=32',
				message: 'Hello 👋'
			},
			{
				id: 2,
				sender: 'jonas',
				senderAvatar: 'https://i.pravatar.cc/150?img=56',
				message: 'Hey!'
			},
			{
				id: 3,
				sender: 'admin',
				senderAvatar: 'https://i.pravatar.cc/150?img=56',
				message: 'How are you?'
			},
			{
				id: 4,
				sender: 'admin',
				senderAvatar: 'https://i.pravatar.cc/150?img=32',
				message: 'Great! It\'s been a while... 🙃'
			},
			{
				id: 5,
				sender: 'jonas',
				senderAvatar: 'https://i.pravatar.cc/150?img=56',
				message: 'Indeed.... We\'re gonna have to fix that. 🌮🍻'
			}
			],
			isTyping: [],
		};
		this.sendMessage = this.sendMessage.bind(this);
		this.typing = this.typing.bind(this);
		this.resetTyping = this.resetTyping.bind(this);
	}

	/* adds a new message to the chatroom */
	async sendMessage(sender, senderId, senderAvatar, message) {
		let messageFormat = detectURL(message);
		let newMessageItem = {
			sender: sender,
			senderId: senderId,
			senderAvatar: senderAvatar,
			message: messageFormat
		};

		this.props.dispatch(messageActions.createMessage(newMessageItem));
	}

	typing(writer) {
		let { writers } = this.props;
		if( ! writers[writer] ) {
			writers[writer] = true;
			this.props.dispatch(messageActions.setTyping(writers));
		}
	}

	resetTyping(writer) {
		let { writers } = this.props;
		
		writers[writer] = false;
		this.props.dispatch(messageActions.setTyping(writers));
	}
	
	componentDidMount() {
		this.props.dispatch(messageActions.getMessageList());
		this.props.dispatch(messageActions.listenTyping());
	}
	render() {
		let users = {};
		let chatBoxes = [];
		let sendMessage = this.sendMessage;
		let typing = this.typing;
		let resetTyping = this.resetTyping;

		const { user, admin, messageList, writers } = this.props;

		users[0] = user;
		users[1] = admin;
		
		Object.keys(users).map(function(key) {
			var user = users[key];
			chatBoxes.push(
				<ChatBox
					key={key}
					owner={user.name}
					ownerId={user.id}
					ownerAvatar={user.avatar}
					sendMessage={sendMessage}
					typing={typing}
					resetTyping={resetTyping}
					messages={messageList}
					isTyping={writers}
				/>
			);
		});
		return (
			<div className={"chatApp__room"}>
				{chatBoxes}
			</div>
		);
	}
}

const mapStateToProps = (state) => {
    return {
        user: state.user.user,
        admin: state.user.admin,
		messageList: state.message.messageList,
		writers: state.message.writers
    }
}

export default connect(mapStateToProps)(ChatRoom);