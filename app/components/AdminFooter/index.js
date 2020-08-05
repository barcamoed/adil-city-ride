/**
 *
 * AdminFooter
 *
 */

import React from 'react';

import { FormattedMessage } from 'react-intl';
import messages from './messages';

function AdminFooter() {
  return (
    <div>
      <FormattedMessage {...messages.header} />
    </div>
  );
}

AdminFooter.propTypes = {};

export default AdminFooter;
