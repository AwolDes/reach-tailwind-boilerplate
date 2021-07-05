import React from 'react';

// Maybe I can define classes here anyway, and still use what I have?
// Player is extended, then bob and alice can render views defined in other files?

class Player extends React.Component {
  random() { return reach.hasRandom.random(); }
  async getHand() { // Fun([], UInt)
    const hand = await new Promise(resolveHandP => {
      this.setState({view: 'GetHand', playable: true, resolveHandP});
    });
    this.setState({view: 'WaitingForResults', hand});
    return handToInt[hand];
  }
  seeOutcome(i) { this.setState({view: 'Done', outcome: intToOutcome[i]}); }
  informTimeout() { this.setState({view: 'Timeout'}); }
  playHand(hand) { this.state.resolveHandP(hand); }
}

// Alice
class Deployer extends Player {
  constructor(props) {
    super(props);
    this.state = {view: 'SetWager'};
  }
  setWager(wager) { this.setState({view: 'Deploy', wager}); }
  async deploy() {
    console.log('Beginning deploy')
    const ctc = this.props.acc.deploy(backend);
    console.log('71')
    this.setState({view: 'Deploying', ctc});
    this.wager = reach.parseCurrency(this.state.wager); // UInt
    backend.Alice(ctc, this);
    console.log('74')
    const ctcInfoStr = JSON.stringify(ctc.getInfo(), null, 2);
    console.log('76')
    this.setState({view: 'WaitingForAttacher', ctcInfoStr});
    console.log('78')
  }
  render() { return renderView(this, DeployerViews); }
}

// Bob
class Attacher extends Player {
  constructor(props) {
    super(props);
    this.state = {view: 'Attach'};
  }
  attach(ctcInfoStr) {
    const ctc = this.props.acc.attach(backend, JSON.parse(ctcInfoStr));
    this.setState({view: 'Attaching'});
    backend.Bob(ctc, this);
  }
  async acceptWager(wagerAtomic) { // Fun([UInt], Null)
    const wager = reach.formatCurrency(wagerAtomic, 4);
    return await new Promise(resolveAcceptedP => {
      this.setState({view: 'AcceptTerms', wager, resolveAcceptedP});
    });
  }
  termsAccepted() {
    this.state.resolveAcceptedP();
    this.setState({view: 'WaitingForTurn'});
  }
  render() { return renderView(this, AttacherViews); }
}