import React, { Component } from 'react'
import './SendCoin.css'

import MetaCoinArtifact from 'contracts/MetaCoin.sol';
import Web3 from 'web3';

import contract from 'truffle-contract';

const MetaCoin = contract(MetaCoinArtifact);

const provider = new Web3.providers.HttpProvider('http://localhost:8545')
MetaCoin.setProvider(provider);

class SendCoin extends Component {
  constructor(props) {
    super(props)

    this.handleSendMeta = this.handleSendMeta.bind(this)
  }

  handleSendMeta(e) {
    e.preventDefault();
    const receipent = this.recipientAddressInput.value;
    const value = this.sendAmountInput.value;
    const sender = this.props.sender;
    MetaCoin.deployed().then(function(meta) {
      console.log(`Recipient Address: ${receipent}`)
      meta.sendCoin(receipent, value, {
        from: sender
      }).then(function() {
        console.log('SENT')
      }).catch(function(e) {
        console.log(e);
      });
    });
  }

  render() {
    return (
      <form className='SendCoin'>
        <label htmlFor='recipient_address'>Recipient Address</label>
        <input id='recipient_address' className='RecipientAddress' type='text' ref={(i) => {
        if (i) {
          this.recipientAddressInput = i
        }
      }} />
        <label htmlFor='send_amount'>Amount</label>
        <input id='send_amount' className='SendAmount' type='text' ref={(i) => {
        if (i) {
          this.sendAmountInput = i
        }
      }} />
        <button className='SendBtn' onClick={this.handleSendMeta}>Send</button>
      </form>
    )
  }
}

export default SendCoin
