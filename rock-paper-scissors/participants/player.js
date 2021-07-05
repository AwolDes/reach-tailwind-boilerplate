import React from 'react';
import { loadStdlib } from '@reach-sh/stdlib'; // eslint-disable-line import/no-extraneous-dependencies

import AuthProvider from '../../providers/auth';

const reach = loadStdlib('ALGO');
const { standardUnit } = reach;

const handToInt = { ROCK: 0, PAPER: 1, SCISSORS: 2 };
const intToOutcome = ['Bob wins!', 'Draw!', 'Alice wins!'];
const defaults = {
  defaultFundAmt: '10',
  defaultWager: '3',
  standardUnit
};

// This class interfaces with the reach backend

class Player extends React.Component {
  async getHand() { // Fun([], UInt)
    const hand = await new Promise(resolveHandP => {
      this.setState({ view: 'GetHand', playable: true, resolveHandP });
    });
    this.setState({ view: 'WaitingForResults', hand });
    return handToInt[hand];
  }

  seeOutcome(i) { this.setState({ view: 'Done', outcome: intToOutcome[i] }); }

  informTimeout() { this.setState({ view: 'Timeout' }); }

  playHand(hand) {
    const { resolveHandP } = this.state;
    resolveHandP(hand);
  }

  random() { return reach.hasRandom.random(); }
}

export default Player;
