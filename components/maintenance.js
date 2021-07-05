import React from 'react';
import Emoji from 'react-emoji-render';

import maintenance from '../assets/maintenance.svg';

const MaintenanceMode = () => (
  <div className="flex justify-center flex-wrap">
    <img src={maintenance} alt="Maintnenace Mode is Active" className="w-full h-64 mt-16" />
    <h1 className="w-full pt-16 text-xl text-center text-red-600 font-extrabold">We&apos;re currently offline</h1>
    <Emoji className="pt-5 text-lg" text=":construction: We'll be back soon :construction:" />
    <p className="w-full pt-16 text-lg text-center">Contact admin@vendorassure.com if you have any questions.</p>
  </div>
);

export default MaintenanceMode;
