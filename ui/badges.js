import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';

export const RiskRatingBadge = ({ riskRating }) => (
  <div className={classNames({
    'dashboard-text': true,
    capitalize: true,
    'dashboard-text--good': riskRating === 'low',
    'dashboard-text--warning': riskRating === 'medium',
    'dashboard-text--alert': riskRating === 'high',
    'dashboard-text--critical': riskRating === 'critical',
  })}
  >{riskRating || 'Not reviewed'}
  </div>
);

RiskRatingBadge.propTypes = {
  riskRating: PropTypes.string.isRequired
};

export const ComplianceRatingBadge = ({ complianceRating }) => (
  <div className={classNames({
    'dashboard-text': true,
    'dashboard-text--good': complianceRating >= 70,
    'dashboard-text--warning': complianceRating <= 70,
    'dashboard-text--alert': complianceRating <= 30,
  })}
  >{complianceRating}/100
  </div>
);

ComplianceRatingBadge.propTypes = {
  complianceRating: PropTypes.string.isRequired
};
