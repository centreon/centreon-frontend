import * as React from 'react';

import { UserContext } from './types';

const defaultUser = {
  alias: '',
  locale: navigator.language,
  name: '',
  timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
  use_deprecated_pages: false,
};

const defaultAcl = {
  actions: {
    host: {
      acknowledgement: false,
      check: false,
      comment: false,
      disacknowledgement: false,
      downtime: false,
      submit_status: false,
    },
    service: {
      acknowledgement: false,
      check: false,
      comment: false,
      disacknowledgement: false,
      downtime: false,
      submit_status: false,
    },
  },
};

const defaultDowntime = {
  duration: 3600,
  fixed: true,
  with_services: false,
};

const defaultRefreshInterval = 15;

const defaultAcknowledgement = {
  force_active_checks: false,
  notify: true,
  is_persistent_comment: false,
  is_sticky: false,
  with_services: true,
};

const defaultContext: UserContext = {
  ...defaultUser,
  acknowledgement: defaultAcknowledgement,
  acl: defaultAcl,
  downtime: defaultDowntime,
  refreshInterval: defaultRefreshInterval,
};

const Context = React.createContext<UserContext>(defaultContext);

const useUserContext = (): UserContext => React.useContext(Context);

export default Context;

export {
  useUserContext,
  defaultUser,
  defaultAcl,
  defaultDowntime,
  defaultRefreshInterval,
  defaultAcknowledgement,
};
