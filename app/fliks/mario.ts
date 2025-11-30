const marioHTML = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Mario 3 Mini Game in React</title>
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <link href="https://fonts.googleapis.com/css?family=VT323" rel="stylesheet">
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/meyer-reset/2.0/reset.min.css">
  <style>
body {
  font-family: "VT323", sans-serif;
  background: #000000;
  overflow: hidden; /* Prevent scroll bars */
}
body:after {
  content: "";
  display: block;
  position: fixed;
  top: 50%;
  right: 18%;
  left: 18%;
  border: 0.5vw solid white;
  bottom: 44%;
  padding-top: 39%;
  transform: translateY(-50%);
  box-sizing: border-box;
  pointer-events: none; /* Allow clicks through the frame */
}

.viewport {
  display: block;
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  width: 100%;
  overflow: hidden;
  box-sizing: border-box;
}
.viewport:before {
  content: "";
  display: block;
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  width: 20%;
  background: #000000;
  z-index: 10;
}
.viewport:after {
  content: "";
  display: block;
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  width: 20%;
  background: #000000;
  z-index: 10;
}

.game {
  position: absolute;
  top: 50%;
  right: 0;
  left: 0;
  transform: translateY(-50%);
}

.results {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  transform: translateY(100%);
  transition: transform 1s ease;
  color: #B53121;
  font-size: 6vw;
  text-shadow: 2px 2px 2px #fff;
  z-index: 20;
}
.results.shown {
  transform: translateY(0);
}

.columns {
  background-color: #FDCBC4;
  background-size: 100% 100%;
  animation-timing-function: linear;
  animation-fill-mode: forwards;
}
.columns.columns-top {
  background-image: url("https://s3-us-west-2.amazonaws.com/s.cdpn.io/233661/mario-top.svg");
}
.columns.columns-center {
  background-image: url("https://s3-us-west-2.amazonaws.com/s.cdpn.io/233661/mario-center.svg");
}
.columns.columns-bottom {
  background-image: url("https://s3-us-west-2.amazonaws.com/s.cdpn.io/233661/mario-bottom.svg");
}
.columns:after {
  content: "";
  display: block;
  padding-top: 12.07%;
}

@keyframes ltr-transition-0 {
  0% { background-position: 0vw; }
  100% { background-position: 33.3333vw; }
}
@keyframes ltr-transition-1 {
  0% { background-position: 33.3333vw; }
  100% { background-position: 66.6666vw; }
}
@keyframes ltr-transition-2 {
  0% { background-position: 66.6666vw; }
  100% { background-position: 100vw; }
}

@keyframes rtl-transition-0 {
  0% { background-position: -33.3333vw; }
  100% { background-position: -66.6666vw; }
}
@keyframes rtl-transition-1 {
  0% { background-position: -100vw; }
  100% { background-position: -133.3333vw; }
}
@keyframes rtl-transition-2 {
  0% { background-position: -166.6666vw; }
  100% { background-position: -200vw; }
}
  </style>
</head>
<body>
  <div class="app"></div>
  
  <script src='https://cdnjs.cloudflare.com/ajax/libs/react/15.6.1/react.min.js'></script>
  <script src='https://cdnjs.cloudflare.com/ajax/libs/react-dom/15.6.1/react-dom.min.js'></script>
  <script src='https://codepen.io/dariocorsi/pen/aKEBxW/de198bdaf7bb0bf03ac880d82fdfa5d5.js'></script>
  
  <script>
    class App extends React.Component {

  constructor() {
    super();
    this.state = {
      rows: [
      {
        name: 'top',
        index: 0,
        value: 0,
        endValue: 0,
        speed: 200,
        isRunning: true,
        key: Math.random(),
        direction: 'ltr' },

      {
        name: 'center',
        value: 0,
        index: 1,
        endValue: 0,
        speed: 200,
        isRunning: true,
        key: Math.random(),
        direction: 'rtl' },

      {
        name: 'bottom',
        value: 0,
        index: 2,
        endValue: 0,
        speed: 200,
        isRunning: true,
        key: Math.random(),
        direction: 'ltr' }],


      prize: 'none',
      activeRowIndex: 0 };

    this.handleClick = this.handleClick.bind(this);
    this.updateActiveRow = this.updateActiveRow.bind(this);
    this.setEndValue = this.setEndValue.bind(this);
    this.setRotatingValue = this.setRotatingValue.bind(this);
    this.cancelInterval = this.cancelInterval.bind(this);
    this.resetGame = this.resetGame.bind(this);
    this.determinePrize = this.determinePrize.bind(this);
    document.body.addEventListener('touchstart', this.handleClick.bind(this));
    window.addEventListener('keypress', this.handleClick.bind(this));
    window.addEventListener('mousedown', this.handleClick.bind(this));
  }

  handleClick() {
    var index = this.state.activeRowIndex;
    // If click occurs while a row is active
    if (index < this.state.rows.length) {
      //Cancel the row's timer
      this.cancelInterval(index);
      //And set the value it ended on
      this.setEndValue(index, this.state.rows[index].value);
      this.determinePrize();
    }
    // Update the active row index every click
    this.updateActiveRow();
  }

  updateActiveRow() {
    //If the active section isn't a row
    if (this.state.activeRowIndex < this.state.rows.length) {
      var index = this.state.activeRowIndex + 1;
      this.setState({ activeRowIndex: index });
    } else {
      this.resetGame();
    }
  }

  determinePrize() {
    var rows = this.state.rows;
    var endValues = rows.map(function (row) {
      return row.endValue;
    });

    var prize = '';
    endValues.forEach(function (value, index) {
      if (endValues[index] !== endValues[0]) {
        prize = 3; //code for 'No Prize'
      } else {
        prize = endValues[0];
      }
    });

    console.log(prize);
    this.setState({ prize: prize });
  }

  resetGame() {
    //Generate new key for each row. This forces re-rendering and resetting of timers.
    var rows = this.state.rows.map(function (row) {
      //Generate new key
      row.key = Math.random();
      //Reset running timer
      row.isRunning = true;
      return row;
    });

    //Set the state
    this.setState({ rows: rows });
    this.setState({ activeRowIndex: 0 });
  }

  setRotatingValue(index, value) {
    var rows = this.state.rows;
    var row = rows[index];
    row.value = value;
    rows[index] = row;
    this.setState({ rows: rows });
  }

  setEndValue(index, value) {
    var rows = this.state.rows;
    var row = rows[index];
    row.endValue = value;
    rows[index] = row;
    this.setState({ rows: rows });
  }

  cancelInterval(index) {
    var rows = this.state.rows;
    var row = rows[index];
    row.isRunning = false;
    rows[index] = row;
    this.setState({ rows: rows });
  }

  render() {
    var rows = this.state.rows.map(function (row) {
      return /*#__PURE__*/(
        React.createElement(Row, {
          name: row.name,
          index: row.index,
          data: this.state,
          setEndValue: this.setEndValue,
          setRotatingValue: this.setRotatingValue,
          isRunning: row.isRunning,
          speed: row.speed,
          key: row.key,
          direction: row.direction }));


    }, this);

    return /*#__PURE__*/(
      React.createElement("div", { key: this.state.key, ref: "game" }, /*#__PURE__*/
      React.createElement("div", { className: "viewport" }, /*#__PURE__*/
      React.createElement("div", { className: "game" }, /*#__PURE__*/
      React.createElement("div", { className: "rows" },
      rows)), /*#__PURE__*/


      React.createElement(Results, { shown: this.state.activeRowIndex === 3, prize: this.state.prize }))));



  }}


class Row extends React.Component {
  constructor() {
    super();
    this.state = { value: 0 };
    this.counterIntervalFunction = this.counterIntervalFunction.bind(this);
    this.clearCounterInterval = this.clearCounterInterval.bind(this);
  }

  componentWillMount() {
    var interval = setInterval(this.counterIntervalFunction, this.props.speed);
    this.setState({ interval: interval });
  }
  
  componentWillUnmount() {
    this.clearCounterInterval();
  }

  counterIntervalFunction() {
    if (this.props.isRunning && this.props.direction === 'ltr') {
      var value = this.state.value < 2 ? this.state.value + 1 : 0;
      this.setState({ value: value });
      this.props.setRotatingValue(this.props.index, this.state.value);
    } else if (this.props.isRunning && this.props.direction === 'rtl') {
      var value = this.state.value > 0 ? this.state.value - 1 : 2;
      this.setState({ value: value });
      this.props.setRotatingValue(this.props.index, this.state.value);
    } else
    {
      this.clearCounterInterval();
    }
  }

  clearCounterInterval() {
    clearInterval(this.state.interval);
  }

  render() {
    var activeRowIndex = this.props.data.activeRowIndex;
    var activeClass = this.props.index === activeRowIndex ? 'active' : '';
    var columnsClassList = 'columns columns-' + this.props.name;
    var wrapperClassList = 'row ' + activeClass;
    var animation = this.props.direction + '-transition-' + this.state.value;
    var style = {
      animationName: animation,
      animationDuration: this.props.speed + 'ms' };


    return /*#__PURE__*/(
      React.createElement("div", { className: wrapperClassList }, /*#__PURE__*/
      React.createElement("div", { className: columnsClassList, style: style }, /*#__PURE__*/
      React.createElement("div", { className: "column" }), /*#__PURE__*/
      React.createElement("div", { className: "column" }), /*#__PURE__*/
      React.createElement("div", { className: "column" }))));



  }}



class Results extends React.Component {
  constructor() {
    super();
    this.state = {
      messages: [
      '3UP',
      '5UP',
      '2UP',
      'No Prize'] };


  }

  render() {
    var shown = this.props.shown ? 'shown' : '';
    var classList = 'results ' + shown;
    return /*#__PURE__*/(
      React.createElement("div", { className: classList },
      this.state.messages[this.props.prize]));


  }}


// Render the app

ReactDOM.render( /*#__PURE__*/
React.createElement(App, null),
document.querySelector('.app'));
  </script>
</body>
</html>
`;

export default marioHTML;
