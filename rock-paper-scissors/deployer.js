import React, { useContext, useState } from 'react';
import { loadStdlib } from '@reach-sh/stdlib'; // eslint-disable-line import/no-extraneous-dependencies
import * as backend from './build/index.main.mjs';
import { useAsyncError } from './utils/hooks';
import { AuthContext } from './providers/auth';

const reach = loadStdlib('ALGO');
const { standardUnit } = reach;

const sleep = (milliseconds) => new Promise(resolve => setTimeout(resolve, milliseconds));

const SetWager = ({ deployWager }) => {
  const [wager, setWager] = useState(0);
  
  return (
    <div>
      <input
        type='number'
        placeholder={wager}
        onChange={(e) => setWager(e.currentTarget.value)}
      /> {standardUnit}
      <br />
      <button
        onClick={() => deployWager(wager)}
      >Set wager</button>
    </div>
  );
}

const Deploy = ({ wager, deploy }) => {
  return (
    <div>
      Wager (pay to deploy): <strong>{wager}</strong> {standardUnit}
      <br />
      <button
        onClick={() => deploy()}
      >Deploy</button>
    </div>
  );
}

const Deploying = () => {
  return (
    <div>Deploying... please wait.</div>
  );
}

const WaitingForAttacher = ({ ctcInfoStr }) => {
  const copyToClipborad = async(button) => {
    navigator.clipboard.writeText(ctcInfoStr);
    const origInnerHTML = button.innerHTML;
    button.innerHTML = 'Copied!';
    button.disabled = true;
    await sleep(1000);
    button.innerHTML = origInnerHTML;
    button.disabled = false;
  }

  return (
    <div>
      Waiting for Attacher to join...
      <br /> Please give them this contract info:
      <pre className='ContractInfo'>
        {ctcInfoStr}
      </pre>
      <button
        onClick={(e) => copyToClipborad(e.currentTarget)}
      >Copy to clipboard</button>
    </div>
  )
}

const renderView = (state, deployWager, wager, deploy, ctcInfoStr) => {
  switch(state) {
    case 0:
      return <SetWager deployWager={deployWager}/>
    case 1:
      return <Deploy wager={wager} deploy={deploy}/>
    case 2:
      return <Deploying />
    case 3:
      return <WaitingForAttacher ctcInfoStr={ctcInfoStr} />
    default:
      return <p>Invalid state</p>
  }
}

const Deployer = () => {
  const [deployerState, setDeployerState] = useState(0);
  const [wager, setWager] = useState(null);
  const [ctcInfoStr, setCtcInfoStr] = useState();
  const { auth } = useContext(AuthContext);

  const deployWager = (wager) => {
    setDeployerState(1);
    setWager(wager);
  }
  
  const deploy = async() => {
    console.log('Beginning deploy')
    const ctc = auth.acc.deploy(backend);
    setDeployerState(2);
    setWager(reach.parseCurrency(wager)); // UInt
    // this = Alice class, extended from player :/
    backend.Alice(ctc, this);
    const attacherInfoStr = JSON.stringify(ctc.getInfo(), null, 2);
    setDeployerState(3);
    setCtcInfoStr(attacherInfoStr);
  }
  
  return (
    <div>
      {renderView(deployerState, deployWager, wager, deploy, ctcInfoStr)}
    </div>
  )
};

export default Deployer;
