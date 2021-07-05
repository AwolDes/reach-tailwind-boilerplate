import React, { useState, useContext } from 'react';
import { loadStdlib } from '@reach-sh/stdlib'; // eslint-disable-line import/no-extraneous-dependencies
import { useAsyncError } from './utils/hooks';
import { AuthContext } from './providers/auth';

const reach = loadStdlib('ALGO');

const Connector = () => {
  const { setAuthData, auth } = useContext(AuthContext);
  // const [balance, setBal] = useState(0);
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

  return (
    <div className="p-2">
      <button className="p-2 bg-black text-white my-4" onClick={() => connectWallet()}>
        Connect Wallet
      </button>
      {auth.acc && <p>Wallet Balance: {auth.bal}</p>}
    </div>
  );
};

export default Connector;
