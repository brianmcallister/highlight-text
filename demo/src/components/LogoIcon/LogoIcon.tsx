import React from 'react';

import './_logo-icon.scss';

/**
 * Base CSS class.
 * @private
 */
const baseClass = 'logo-icon';

/**
 * LogoIcon component.
 */
export const LogoIcon = (): JSX.Element => (
  <svg
    className={baseClass}
    width="16"
    height="16"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 12 12"
  >
    <path
      fillRule="evenodd"
      d="M6.32226893.05062544c1.44833138.3468103 4.19103317 2.92379242 5.24643317 4.74784395 0 0 .4309755.66964309.4312977 1.20918367C12.0009869 7.6607139 7.67557247 12 6.02290076 12c-.10489525 0-.22054702-.0174733-.34516969-.0506254-1.44833138-.3468103-4.19103319-2.92379246-5.2464332-4.74784399 0 0-.43097552-.66964309-.4312977-1.20918367C-.00098694 4.3392861 4.32442753 0 5.97709924 0c.10489525 0 .22054702.01747327.34516969.05062544z"
    />
  </svg>
);
