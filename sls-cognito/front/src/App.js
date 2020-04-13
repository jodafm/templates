import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { withAuthenticator } from 'aws-amplify-react';
import Amplify from 'aws-amplify';


const url1 = 'https://mel5wpitcl.execute-api.us-east-1.amazonaws.com/dev'
const url2 = 'https://cqtvoll6r7.execute-api.us-east-1.amazonaws.com/dev/'


const getDataFromUrl = async (url) => { 
  const myHeaders = new Headers();
  const key = Object.keys(localStorage).find(x => x.includes('idToken'))
  myHeaders.append('authorization', 'Bearer ' + localStorage[key]);
  const myRequest = new Request(url, {
    method: 'GET',
    headers: myHeaders,
    mode: 'cors'
  });

  const res = await fetch(myRequest)
  return await res.json()
}

Amplify.configure({
  Auth: {
    region: 'us-east-1',
    userPoolId: 'us-east-1_6GJ4axLvL',
    userPoolWebClientId: '1a84ev0vtj2c9v84ttunr7qm4b'
  }
})

class App extends Component {
  getData = async () => {
    const x = await getDataFromUrl(url1)
    console.log(x)
    
    const xx = await getDataFromUrl(url2)
    console.log(xx)
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>

        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
        <button onClick={() => this.getData()}>Click Me</button>

      </div>
    );
  }
}

export default withAuthenticator(App);
