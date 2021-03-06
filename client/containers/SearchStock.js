import React, { Component } from 'react';

import axios from 'axios';
import checkSymbol from 'check-ticker-symbol';

import '../styles/searchStock.css';

class SearchStock extends Component {
  constructor(props) {
    super(props);

    this.state = {
      searchField: '',
      messageText: ''
    };

    this.handleAdd = this.handleAdd.bind(this);
    this.validateSymbol = this.validateSymbol.bind(this);
    this.handleSearchFieldChange = this.handleSearchFieldChange.bind(this);
  }

  handleSearchFieldChange(event) {
    if (this.state.messageText) {
      this.setState({ messageText: '' });
    }

    const value = event.target.value;
    this.setState({
      searchField: value
    });
  }

  // validates whether the symbol user entered is valid
  validateSymbol(symbol) {
    return checkSymbol.valid(symbol);
  }

  handleAdd(event) {
    event.preventDefault();
    const symbol = this.state.searchField;
    // validate stock symobol
    if (this.validateSymbol(symbol)) {
      axios.post('/addStock', {
        symbol
      })
        .then(({ data }) => {
          if (data.error) {
            this.setState({
              messageText: data.error
            });
          } else {
            this.setState({
              messageText: '',
              searchField: ''
            });
          }
        });
    } else {
      this.setState({
        messageText: 'The stock symbol you entered was not valid'
      });
    }
  }

  render() {
    return (
      <div>
        <form>
          <div className='intro'>
            <p>
              Enter a stock symbol to track. Click on 
              the <i className="fa fa-times-circle" aria-hidden="true" /> to remove a stock.
            </p>
          </div>
          <input 
            onChange={this.handleSearchFieldChange}
            value={this.state.searchField}
            type='text'
            placeholder='Symbol' 
          />
          <button 
            onClick={this.handleAdd}
          >
            Add Stock
          </button>
        </form>
        <div
          className='message-area'
        >
          {this.state.messageText}
        </div>
      </div>
    );
  }
}

export default SearchStock;
