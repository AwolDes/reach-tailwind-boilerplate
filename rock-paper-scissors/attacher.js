import React, { useContext, useState } from 'react';
import { loadStdlib } from '@reach-sh/stdlib'; // eslint-disable-line import/no-extraneous-dependencies
import * as backend from './build/index.main.mjs';
import { useAsyncError } from './utils/hooks';
import { AuthContext } from './providers/auth';

const reach = loadStdlib('ALGO');
const { standardUnit } = reach;

const Attach = ({ attach }) => {
  const [ctcInfoStr, setInfoStr] = useState({});
  return (
    <div>
      Please paste the contract info to attach to:
      <br />
      <textarea spellcheck="false"
        className='ContractInfo'
        onChange={(e) => setInfoStr(e.currentTarget.value)}
        placeholder='{}'
      />
      <br />
      <button
        disabled={!ctcInfoStr}
        onClick={() => attach(ctcInfoStr)}
      >Attach</button>
    </div>
  );
}

const Attaching = () => {
  return (
    <div>
      Attaching, please wait...
    </div>
  );
}

const AcceptTerms = ({ wager, termsAccepted }) => {
  const [disabled, setDisabled] = useState(false);
  return (
    <div>
      The terms of the game are:
      <br /> Wager: {wager} {standardUnit}
      <br />
      <button
        disabled={disabled}
        onClick={() => {
          setDisabled(false);
          termsAccepted();
        }}
      >Accept terms and pay wager</button>
    </div>
  );
}

const WaitingForTurn = () => {
  return (
    <div>
      Waiting for the other player...
      <br />Think about which move you want to play.
    </div>
  );
}

const renderView = (state, attach, termsAccepted, wager) => {
  switch(state) {
    case 0:
      return <Attach attach={attach}/>
    case 1:
      return <Attaching />
    case 2:
      return <AcceptTerms termsAccepted={termsAccepted} wager={wager}/>
    case 3:
      return <WaitingForTurn />
    default:
      return <p>Invalid state</p>
  }
}

const Attacher = () => {
  const [attacherState, setAttacherState] = useState(0);
  const [wager, setWager] = useState(null);
  const [resolveAcceptedP, setResolveAccepted] = useState(null);
  const { auth } = useContext(AuthContext);

  const attach = (ctcInfoStr) => {
    const ctc = auth.acc.attach(backend, JSON.parse(ctcInfoStr));
    setAttacherState(1)
    // this = bob class extended from player :/
    backend.Bob(ctc, this);
  }

  // used in reach on the backend
  const acceptWager = async(wagerAtomic) => { // Fun([UInt], Null)
    const wager = reach.formatCurrency(wagerAtomic, 4);
    return await new Promise(resolveAcceptedP => {
      setWager(wager);
      setResolveAccepted(resolveAcceptedP);
      setAttacherState(2);
    });
  }

  const termsAccepted = () => {
    resolveAcceptedP();
    setAttacherState(3);
  }

  return (
    <div>
      {renderView(attacherState, attach, termsAccepted, wager)}
    </div>
  )
};

export default Attacher;