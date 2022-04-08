const defaultUser = {
  alias: '',
  default_page: '/monitoring/resources',
  isExportButtonEnabled: false,
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
  default_downtime_duration: 600,
  default_downtime_fixed: true,
  default_downtime_with_services: false,
};

const defaultRefreshInterval = 15;

const defaultAcknowledgement = {
  default_acknowledgement_force_active_checks: false,
  default_acknowledgement_notify: true,
  default_acknowledgement_persistent: false,
  default_acknowledgement_sticky: false,
  default_acknowledgement_with_services: true,
};

export {
  defaultUser,
  defaultAcl,
  defaultDowntime,
  defaultRefreshInterval,
  defaultAcknowledgement,
};
