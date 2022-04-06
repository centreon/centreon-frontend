import React from 'react';

export interface User {
  alias: string;
  default_page?: string | null;
  isExportButtonEnabled: boolean;
  locale: string;
  name: string;
  timezone: string;
  use_deprecated_pages: boolean;
}

export interface CloudServices {
  areCloudServicesEnabled: boolean;
  setAreCloudServicesEnabled: React.Dispatch<React.SetStateAction<boolean>>;
}

export interface Acknowledgement {
  default_acknowledgement_persistent: boolean;
  default_acknowledgement_sticky: boolean;
  default_acknowledgement_notify: boolean;
  default_acknowledgement_force_active_checks: boolean;
  default_acknowledgement_with_services :boolean;
}

export type UserContext = {
  acknowledgement: Acknowledgement;
  acl: Acl;
  cloudServices: CloudServices | undefined;
  downtime: Downtime;
  refreshInterval: number;
} & User;

export interface ActionAcl {
  acknowledgement: boolean;
  check: boolean;
  comment: boolean;
  downtime: boolean;
  submit_status: boolean;
}

export interface Actions {
  host: ActionAcl;
  service: ActionAcl;
}

export interface Acl {
  actions: Actions;
}

export interface Downtime {
  default_duration: number;
  default_fixed: boolean;
  default_with_services: boolean;
}
