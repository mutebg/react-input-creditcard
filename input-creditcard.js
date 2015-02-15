var InputCreditCard = React.createClass({
  propTypes: {
      placeholder: React.PropTypes.string,
      disabled: React.PropTypes.bool,
      readonly: React.PropTypes.bool,
      required: React.PropTypes.bool,
      value: React.PropTypes.string,
      name: React.PropTypes.string,
  },
  componentWillMount: function() {
    if ( this.props.value ) {
      this.cardNumber(this.props.value);
    }
  },
  getInitialState: function() {
    return {
      number: '',
      type: '',
      numberLength: 16,
      cards: [
        {
          type: 'amex',
          pattern: /^3[47]/,
          length: 15
        },{
          type: 'dinersclub',
          pattern: /^(36|38|30[0-5])/,
          length: 14,
        }, {
          type: 'discover',
          pattern: /^(6011|65|64[4-9]|622)/,
          length: 16,
        }, {
          type: 'jcb',
          pattern: /^35/,
          length: 16,
        }, {
          type: 'maestro',
          pattern: /^(5018|5020|5038|6304|6759|676[1-3])/,
          length: 19,
        }, {
          type: 'mastercard',
          pattern: /^5[1-5]/,
          length: 16,
        }, {
          type: 'visa',
          pattern: /^4/,
          length: 16,
        }
      ]
    }
  },
  cardFromNumber: function(num) {
    var card, _i, _len;
    num = (num + '').replace(/\D/g, '');
    for (_i = 0, _len = this.state.cards.length; _i < _len; _i++) {
      card = this.state.cards[_i];
      if (card.pattern.test(num)) {
        return card;
      }
    }
  },
  formatCardNumber: function(number, length) {
    var noSpaceNumber = number.replace(/[^0-9\.]+/g, '');
    var returnNumber = '';
    for(var i = 0; i <= length; i= i+4 ) {
      returnNumber += noSpaceNumber.slice(i, i+4) + ' ';
    }
    return returnNumber.trim();
  },
  cardNumber: function(number) {
    var formatedNumber = number;
    var currentCardType = '';
    var currentCardNumberLength = 16;
    
    if ( number ) {
      currentCardType = this.cardFromNumber(number);
      if ( currentCardType ) {
        currentCardNumberLength = currentCardType.length
        this.setState({type: currentCardType.type});
        this.setState({numberLength: currentCardNumberLength});
      }

      formatedNumber = this.formatCardNumber(number, currentCardNumberLength);
    }
    
    this.setState({number: formatedNumber});
  },
  handleChange: function(event) {
    this.cardNumber(event.target.value);
  },
  render: function() {
    return (
      <div className="react-input-creditcard">
        <div className="icon" data-icon={this.state.type}></div>
        <input type="text" className="input" 
          onChange={this.handleChange} 
          value={this.state.number}
          name={this.props.name} 
          placeholder={this.props.placeholder} 
          disabled={this.props.disabled}
          readonly={this.props.required}
        />
      </div>
    );
  }
});

React.render(
  <InputCreditCard value="4100111122223333" placeholder="Enter your card number" />,
  document.getElementById('input-creditcard')
);