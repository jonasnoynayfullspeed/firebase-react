import React, { Component } from "react";

class MessageItem extends Component {
	render() {
		/* message position formatting - right if I'm the author */
		let messagePosition = (( this.props.owner == this.props.sender ) ? 'chatApp__convMessageItem--right' : 'chatApp__convMessageItem--left');
		let messageSender = ( this.props.owner != this.props.sender ) ? this.props.sender : false;
		return (
			<div className={"chatApp__convMessageItem " + messagePosition + " clearfix"}>
				<p>{messageSender}</p>
				<img src={this.props.senderAvatar} alt={this.props.sender} className="chatApp__convMessageAvatar" />
				<div className="chatApp__convMessageValue" dangerouslySetInnerHTML={{__html: this.props.message}}></div>
			</div>
		);
	}
}

export default MessageItem;