import React from 'react';
import PropTypes from 'prop-types';
import { cdnUrl } from '../../utils/assets';

const VendorCard = ({
  name, logo
}) => (
  <div className="vendor-card bg-white">
    <div className="relative pb-2/3">
      <img className="absolute h-full w-full object-contain" src={cdnUrl(logo)} alt={`${name} logo`} />
    </div>
    <p>{name}</p>
  </div>
);

VendorCard.propTypes = {
  id: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  logo: PropTypes.string.isRequired,
};

export default VendorCard;
