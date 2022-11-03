import React, { Component } from "react";

import Title from "./Title";
import MessageList from "./MessageList";
import InputMessage from "./InputMessage";
import TypingIndicator from "./TypingIndicator";

class ChatBox extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      isLoading: false,
    };
    this.sendMessageLoading = this.sendMessageLoading.bind(this);
    var timeout = null;
  }
  /* catch the sendMessage signal and update the loading state then continues the sending instruction */
  sendMessageLoading(sender, senderId, senderAvatar, message) {
    this.setState({ isLoading: true });
    this.props.sendMessage(sender, senderId, senderAvatar, message);
    setTimeout(() => {
      this.setState({ isLoading: false });
    }, 400);
  }
  render() {
    return (
      <div className={"chatApp__conv"}>
        <Title owner={this.props.owner} />
        <MessageList owner={this.props.owner} ownerAvatar={this.props.ownerAvatar} messages={this.props.messages} />
        <div className={"chatApp__convSendMessage clearfix"}>
          <TypingIndicator
            owner={this.props.owner}
            isTyping={this.props.isTyping}
          />
          <InputMessage
            isLoading={this.state.isLoading}
            owner={this.props.owner}
            ownerId={this.props.ownerId}
            ownerAvatar={this.props.ownerAvatar}
            sendMessage={this.props.sendMessage}
            sendMessageLoading={this.sendMessageLoading}
            typing={this.props.typing}
            resetTyping={this.props.resetTyping}
          />
        </div>
      </div>
    );
  }
}

export default ChatBox;
