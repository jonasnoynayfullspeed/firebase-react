import React, { Component } from 'react';

class UserList extends Component {
	constructor(props, context) {
		super(props, context);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    handleSubmit(e) {
        e.preventDefault();
    }

    render() {
        
        return (
          <div className={"chatApp__conv userList"}>
           	<div className={"chatApp__convTitle"}>User List</div>
          
            <div className={"chatApp__convSendMessage clearfix"}>
                <div className={"chatApp__convTimeline"}> 
                    <div className={"chatApp__convMessageItem chatApp__convMessageItem--left clearfix"}>
                        <img className="chatApp__convMessageAvatar" />
                        <div className="chatApp__convMessageValue">Test name</div>
                    </div>         
                </div>
                <form onSubmit={this.handleSubmit}>
                    <input
                        type="text"
                        ref={message => (this.messageInput = message)}
                        className={"chatApp__convInput"}
                        placeholder="Add User"
                        tabIndex="0"
                    />
                    <div className={'chatApp__convButton '} onClick={this.handleSubmit}>
                        <i>⇨</i>
                    </div>
                </form>
            </div>
          </div>
        );
      }
}

export default UserList;