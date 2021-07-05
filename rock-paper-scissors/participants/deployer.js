import React from 'react';
import { loadStdlib } from '@reach-sh/stdlib'; // eslint-disable-line import/no-extraneous-dependencies

import * as backend from '../../build/index.main.mjs';
import { AuthContext } from '../../providers/auth';
import Player from './player';
import renderView from '../views/renderView';
import DeployerViews from '../views/DeployerViews';

const reach = loadStdlib('ALGO');

// This class interfaces with the reach backend

// Alice
class Deployer extends Player {
  static contextType = AuthContext;

  constructor(props) {
    super(props);
    this.state = { view: 'SetWager' };
  }

  setWager(wager) { this.setState({ view: 'Deploy', wager }); }

  async deploy() {
    console.log('Beginning deploy');
    const ctc = this.context.auth.acc.deploy(backend);
    this.setState({ view: 'Deploying', ctc });
    this.wager = reach.parseCurrency(this.state.wager); // UInt
    backend.Alice(ctc, this);
    const ctcInfoStr = JSON.stringify(await ctc.getInfo(), null, 2);
    console.log(`CTC: ${JSON.stringify(ctc)}`);
    console.log(`info str: ${ctcInfoStr}`);
    this.setState({ view: 'WaitingForAttacher', ctcInfoStr });
  }

  render() {
    return renderView(this, DeployerViews);
  }
}

export default Deployer;
