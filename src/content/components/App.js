import '../../css/message.css';
import React, {Component} from 'react';
import $ from "jquery";

class App extends Component {
  constructor(props) {
      super(props);
      this.handleClick = this.handleClick.bind(this)
  }

    handleClick(){
        $('#rcr-anchor').remove();
        let hostname = window.location.hostname;
        chrome.runtime.sendMessage({hostname: hostname, message: "Closed"});
    }

  render() {
      return (
          <div className="messages" style={style}>
              <div className="messageBlock">
                  <h1 className="messageText">{this.props.message}</h1>
                  <button className="buttonHello" onClick={this.handleClick}>HELLO</button>
              </div>
          </div>
      );
  }
}

let backgroundUrl = chrome.extension.getURL("images/background.jpg");
let scroll = document.documentElement.scrollTop || document.body.scrollTop;
let top = scroll + 400 + 'px';
let left = Math.floor(document.body.clientWidth/2) - 175 + 'px';

let style = {
    backgroundImage: "url(" + backgroundUrl +")",
    top: top,
    left: left,
};

export default App;
