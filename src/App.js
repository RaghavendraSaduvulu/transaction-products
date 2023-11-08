import { Component } from "react";

class App extends Component {
  componentDidMount() {
    this.getProductTransactionsDetails();
  }

  getProductTransactionsDetails = async () => {
    const url = "https://s3.amazonaws.com/roxiler.com/product_transaction.json";
    const options = {
      method: "GET",
      headers: {
        "Content-type": "application/json",
      },
    };
    const response = await fetch(url, options);
    console.log(response);
  };

  render() {
    return (
      <div className="app">
        <h1>working</h1>
      </div>
    );
  }
}

export default App;
