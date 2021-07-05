import React, { useState, useContext } from 'react';
import { loadStdlib } from '@reach-sh/stdlib'; // eslint-disable-line import/no-extraneous-dependencies
import { useAsyncError } from './utils/hooks';
import Connector from './connector';
import { AuthContext } from './providers/auth';

const reach = loadStdlib('ALGO');

const Faucet = () => {
  const { setAuthData, auth } = useContext(AuthContext);
  const throwError = useAsyncError();
  const [amount, setAmount] = useState(0);
  const [funding, setFunding] = useState(false);
  const { standardUnit } = reach;

  const fundAccount = async (fundAmount) => {
    try {
      setFunding(true);
      const faucet = await reach.getFaucet();
      await reach.transfer(faucet, auth.acc, reach.parseCurrency(fundAmount));
      const balAtomic = await reach.balanceOf(auth.acc);
      const bal = reach.formatCurrency(balAtomic, 4);
      setAuthData({ ...auth, bal });
      setAmount(0);
      setFunding(false);
    } catch (e) {
      throwError(e.message);
    }
  };

  return (
    <div>
      <h1 className="text-2xl">Faucet for Local Testnet</h1>
      {auth.acc && (
        <div className="p-2">
          <h2 className="text-lg">Fund account</h2>
          <p>Would you like to fund your account with additional {standardUnit}?</p>
          <input
            type="number"
            placeholder={amount}
            onChange={(e) => setAmount(e.currentTarget.value)}
          />
          <button className="p-2 mx-2 bg-black text-white" onClick={() => fundAccount(amount)}>Fund Account</button>
          {funding && <p>Funding account...</p>}
        </div>
      )}
    </div>
  );
};

export default Faucet;
