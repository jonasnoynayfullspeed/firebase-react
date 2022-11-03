import React, { Component } from 'react';

class Loading extends Component {


    render() {
        return (
            <div className={"chatApp__loaderWrapper"}>
                <div className={"chatApp__loaderText"}>Loading...</div>
                <div className={"chatApp__loader"}></div>
            </div>
        );
    }
}

export default Loading;