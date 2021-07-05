import React, { useState, useContext } from 'react';
import { loadStdlib } from '@reach-sh/stdlib'; // eslint-disable-line import/no-extraneous-dependencies
import { useAsyncError } from './utils/hooks';
import { AuthContext } from './providers/auth';

const reach = loadStdlib('ALGO');
const { standardUnit } = reach;

const Connector = () => {
  const { setAuthData, auth } = useContext(AuthContext);
  const [funding, setFunding] = useState(false);
  const throwError = useAsyncError();

  const connectWallet = async () => {
    try {
      const acc = await reach.getDefaultAccount();
      const balAtomic = await reach.balanceOf(acc);
      const bal = reach.formatCurrency(balAtomic, 4);
      setAuthData({ acc, bal });
      // setBal(bal);
    } catch (e) {
      throwError(e.message);
    }
  };

  const disconnectWallet = () => {
    setAuthData(null);
  };

  const fundAccount = async (fundAmount) => {
    try {
      setFunding(true);
      const faucet = await reach.getFaucet();
      await reach.transfer(faucet, auth.acc, reach.parseCurrency(fundAmount));
      const balAtomic = await reach.balanceOf(auth.acc);
      const bal = reach.formatCurrency(balAtomic, 4);
      setAuthData({ ...auth, bal });
      setFunding(false);
    } catch (e) {
      throwError(e.message);
    }
  };

  return (
    <div className="p-2">
      {auth.acc ? (
        <div>
          <button className="p-2 bg-black text-white my-4" onClick={() => disconnectWallet()}>
            Disconnect Wallet
          </button>
          {!funding ? <button className="p-2 bg-black text-white my-4 ml-4" onClick={() => fundAccount(10)}>Fund Wallet</button> : (
            <button className="p-2 bg-black text-white my-4 ml-4">Funding 10 {standardUnit}...</button>
          )}
          <p>Wallet Balance: {auth.bal} {standardUnit}</p>
        </div>
      ) : (
        <button className="p-2 bg-black text-white my-4" onClick={() => connectWallet()}>
          Connect Wallet
        </button>
      )}
    </div>
  );
};

export default Connector;
