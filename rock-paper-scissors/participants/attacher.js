import React from 'react';
import { loadStdlib } from '@reach-sh/stdlib'; // eslint-disable-line import/no-extraneous-dependencies

import * as backend from '../../build/index.main.mjs';
import { AuthContext } from '../../providers/auth';
import Player from './player';
import renderView from '../views/renderView';
import AttacherViews from '../views/AttacherViews';

const reach = loadStdlib('ALGO');

// This class interfaces with the reach backend

// Bob
class Attacher extends Player {
  static contextType = AuthContext;

  constructor(props) {
    super(props);
    this.state = { view: 'Attach' };
  }

  attach(ctcInfoStr) {
    const ctc = this.context.auth.acc.attach(backend, JSON.parse(ctcInfoStr));
    this.setState({ view: 'Attaching' });
    backend.Bob(ctc, this);
  }

  async acceptWager(wagerAtomic) { // Fun([UInt], Null)
    const wager = reach.formatCurrency(wagerAtomic, 4);
    return new Promise(resolveAcceptedP => {
      this.setState({ view: 'AcceptTerms', wager, resolveAcceptedP });
    });
  }

  termsAccepted() {
    this.state.resolveAcceptedP();
    this.setState({ view: 'WaitingForTurn' });
  }

  render() { return renderView(this, AttacherViews); }
}

export default Attacher;
