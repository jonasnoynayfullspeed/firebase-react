import React, { Component } from "react";

class InputMessage extends React.Component {
	constructor(props, context) {
		super(props, context);
		this.handleSendMessage = this.handleSendMessage.bind(this);
		this.handleTyping = this.handleTyping.bind(this);
	}
	handleSendMessage(event) {
		event.preventDefault();
		if( this.messageInput.value.length > 0 ) {
			this.props.sendMessageLoading(this.ownerInput.value, this.ownerIdInput.value, this.ownerAvatarInput.value, this.messageInput.value);
			this.messageInput.value = '';
		}
	}
	handleTyping(event) {
		if( this.messageInput.value.length > 0 ) {
			this.props.typing(this.ownerInput.value);
		}
		else {
			this.props.resetTyping(this.ownerInput.value);
		}
	}
	render() {
		var loadingClass = this.props.isLoading ? 'chatApp__convButton--loading' : '';
		let sendButtonIcon = <i className={"material-icons"}>send</i>;
		return (
			<form onSubmit={this.handleSendMessage}>
				<input
					type="hidden"
					ref={owner => (this.ownerInput = owner)}
					value={this.props.owner}
				/>
				<input
					type="hidden"
					ref={ownerAvatar => (this.ownerAvatarInput = ownerAvatar)}
					value={this.props.ownerAvatar}
				/>
				<input
					type="hidden"
					ref={ownerId => (this.ownerIdInput = ownerId)}
					value={this.props.ownerId}
				/>
				<input
					type="text"
					ref={message => (this.messageInput = message)}
					className={"chatApp__convInput"}
					placeholder="Text message"
					onKeyDown={this.handleTyping}
					onKeyUp={this.handleTyping}
					tabIndex="0"
				/>
				<div className={'chatApp__convButton ' + loadingClass} onClick={this.handleSendMessage}>
				{sendButtonIcon}
				</div>
			</form>
		);
	}
}

export default InputMessage;