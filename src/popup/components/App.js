import React, {Component} from 'react';

let jsonString = JSON.parse(localStorage.getItem('json'));
let list = [];
let j = 0;

for(let jsonRow of jsonString){
     j++;
    list.push(<div key={j} className="row">
        <p> {j + ".  "}
            <a href={"http://" + jsonRow.domain} target="_blank">{jsonRow.name}</a>
        </p>
        </div>);
}

class App extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
          {list}
      </div>
    );
  }
}

export default App;

