import React, { useState } from 'react';
import { AiFillLike, AiFillSound } from 'react-icons/ai';
import PropTypes from 'prop-types';

import underDevelopment from '../assets/under_development.svg';

const UnderDevelopment = ({ location }) => {
  const [notified, setNotified] = useState(false);

  const notifyOrg = () => {
    setNotified(true);
  };

  return (
    <div className="flex justify-center flex-wrap">
      <img src={underDevelopment} alt="No Vendor Controls" className="w-full h-64 mt-16" />
      <h1 className="w-full pt-16 text-lg text-center text-red-600 font-extrabold">This feature is under development!</h1>
      <button type="button" className="btn bg-va-green-800 hover:bg-va-green-900 mt-5 inline" onClick={() => notifyOrg()}>{!notified ? (
        <p>I need this now! <AiFillSound className="inline" /></p>
      ) : (
        <p> You&apos;ll be the first to hear about it <AiFillLike className="inline" /></p>
      )}
      </button>
    </div>
  );
};

UnderDevelopment.propTypes = {
  location: PropTypes.object.isRequired
};

export default UnderDevelopment;
