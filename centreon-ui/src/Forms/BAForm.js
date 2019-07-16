/* eslint-disable react/jsx-filename-extension */
/* eslint-disable react/prop-types */
/* eslint-disable react/prefer-stateless-function */
/* eslint-disable import/no-named-as-default */

import React from "react";
import { withStyles } from "@material-ui/core/styles";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import IconWarning from "@material-ui/icons/Warning";
import IconError from "@material-ui/icons/Error";
import classnames from "classnames";
import InputField from "../InputField";
import InputFieldMultiSelectValue from "../InputField/InputFieldMultiSelectValue";
import InputFieldSelect from "../InputField/InputFieldSelectCustom";
import CustomRow from "../Custom/CustomRow";
import CustomColumn from "../Custom/CustomColumn";
import IconInfo from "../Icon/IconInfo";
import MaterialSwitch from "../MaterialComponents/Switch";
import CheckboxDefault from "../MaterialComponents/Checkbox";
import ButtonCustom from "../Button/ButtonCustom";
import { MultiSelectHolder } from "../";
import MultiSelectContainer from "../MultiSelectHolder/MultiSelectContainer";
import commandsMock from "../Mocks/command.json";
import timeperiodsMock from "../Mocks/timeperiod.json";
import kpiMock from "../Mocks/kpi.json";
import escalationMock from "../Mocks/escalation.json";
import contactGroupsMock from "../Mocks/contactGroups.json";
import businessViewsMock from "../Mocks/businessViews.json";

const styles = theme => ({
  root: {
    width: "100%"
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: "700"
  },
  customStyle: {
    margin: "0 !important",
    backgroundColor: "transparent",
    boxShadow: "none",
    borderBottom: "1px solid #bcbdc0",
    borderRadius: "0 !important"
  },
  additionalStyles: {
    display: "block"
  },
  helperStyles: {
    paddingBottom: 0
  },
  containerStyles: {
    padding: "10px 24px 10px 24px"
  }
});

class BAForm extends React.Component {
  render() {
    const {
      classes,
      values,
      centreonImages,
      valueChanged = () => {},
      notificationOptionChanged = () => {},
      errors,
      toggleMultiselect = () => {},
      eventHandlerCommands,
      escalations,
      timeperiods,
      kpis,
      contactGroups,
      businessViews,
      remoteServers,
      selectedMultiselect
    } = this.props;
    return (
      <div className={classes.root}>
        <div className={classes.containerStyles}>
          <CustomRow>
            <CustomColumn customColumn="md-6">
              <InputField
                placeholder="Add a description"
                type="text"
                name="description"
                value={values.description}
                onChange={event => {
                  valueChanged("description", event);
                }}
              />
            </CustomColumn>
            <CustomColumn customColumn="md-6">
              <InputFieldSelect
                icons={true}
                options={centreonImages}
                value={values.icon}
                customStyle="no-margin"
                onChange={event => {
                  valueChanged("icon", event);
                }}
              />
            </CustomColumn>
            <CustomColumn customColumn="md-6">
              <CustomColumn customColumn="md-12" additionalStyles={["p-0"]}>
                <IconInfo iconText="Automatically inherit KPI downtimes" />
              </CustomColumn>
              <FormControlLabel
                control={
                  <MaterialSwitch
                    value={values.inherit_kpi_downtimes}
                    checked={values.inherit_kpi_downtimes}
                    onChange={event => {
                      valueChanged("inherit_kpi_downtimes", event);
                    }}
                  />
                }
                label="Enable"
              />
            </CustomColumn>
            <CustomColumn customColumn="md-6">
              <IconInfo iconText="Display on remote server" />
              <InputFieldSelect
                options={remoteServers}
                value={values.additional_poller}
                onChange={event => {
                  valueChanged("additional_poller", event);
                }}
              />
            </CustomColumn>
          </CustomRow>
        </div>
        <ExpansionPanel className={classes.customStyle}>
          <ExpansionPanelSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <Typography className={classes.heading}>Indicator</Typography>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails
            className={classnames(
              classes.additionalStyles,
              classes.helperStyles
            )}
          >
            <CustomRow additionalStyles={["mb-0"]}>
              <CustomColumn customColumn="md-6" additionalStyles={["mb-0"]}>
                <IconInfo iconText="Status calculation method" />
                <InputFieldSelect
                  value={1}
                  options={[{ id: 1, name: "Impact", alias: "impact" }]}
                  disabled
                />
              </CustomColumn>
              <CustomColumn customColumn="md-3" additionalStyles={["mb-0"]}>
                <IconInfo iconText="Warning threshold" />
                <CustomRow additionalStyles={["mt-05", "mb-0"]}>
                  <CustomColumn
                    customColumn="md-3"
                    additionalStyles={["mt-03"]}
                  >
                    <IconWarning style={{ color: "#FF9913" }} />
                  </CustomColumn>
                  <CustomColumn customColumn="md-9">
                    <InputField
                      type="number"
                      name="level_w"
                      value={values.level_w}
                      onChange={event => {
                        valueChanged("level_w", event);
                      }}
                    />
                  </CustomColumn>
                </CustomRow>
              </CustomColumn>
              <CustomColumn customColumn="md-3" additionalStyles={["mb-0"]}>
                <IconInfo iconText="Critical threshold" />
                <CustomRow additionalStyles={["mt-05"]}>
                  <CustomColumn
                    customColumn="md-3"
                    additionalStyles={["mt-03"]}
                  >
                    <IconError style={{ color: "#E00B3D" }} />
                  </CustomColumn>
                  <CustomColumn customColumn="md-9">
                    <InputField
                      type="text"
                      name="level_c"
                      value={values.level_c}
                      onChange={event => {
                        valueChanged("level_c", event);
                      }}
                    />
                  </CustomColumn>
                </CustomRow>
              </CustomColumn>
            </CustomRow>
          </ExpansionPanelDetails>
          <ExpansionPanelDetails className={classes.additionalStyles}>
            <MultiSelectContainer
              label={"Number of indicators"}
              values={values.bam_kpi}
              options={kpis}
              selected={selectedMultiselect == "bam_kpi"}
              onEdit={() => {
                toggleMultiselect("bam_kpi");
              }}
              error={""}
              labelKey={"name"}
              valueKey={"id"}
            />
          </ExpansionPanelDetails>
        </ExpansionPanel>
        <ExpansionPanel className={classes.customStyle}>
          <ExpansionPanelSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel2a-content"
            id="panel2a-header"
          >
            <Typography className={classes.heading}>Business View</Typography>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails className={classes.additionalStyles}>
            <MultiSelectContainer
              label={"Number of views"}
              values={values.groups}
              options={businessViews}
              selected={selectedMultiselect == "groups"}
              onEdit={() => {
                toggleMultiselect("groups");
              }}
              error={""}
              labelKey={"name"}
              valueKey={"id"}
            />
          </ExpansionPanelDetails>
        </ExpansionPanel>
        <ExpansionPanel className={classes.customStyle}>
          <ExpansionPanelSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel3a-content"
            id="panel3a-header"
          >
            <Typography className={classes.heading}>Notification</Typography>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails className={classes.additionalStyles}>
            <CustomRow>
              <CustomColumn customColumn="md-6">
                <CustomColumn customColumn="md-12" additionalStyles={["p-0"]}>
                  <IconInfo iconText="View notifications" />
                </CustomColumn>
                <FormControlLabel
                  control={
                    <MaterialSwitch
                      value={values.notifications_enabled}
                      checked={values.notifications_enabled}
                      onChange={event => {
                        valueChanged("notifications_enabled", event);
                      }}
                    />
                  }
                  label="Enable"
                />
              </CustomColumn>
              <CustomColumn customColumn="md-6">
                <InputField
                  placeholder="*60 seconds"
                  type="text"
                  name="test"
                  label="Interval (*60 seconds)"
                  value={values.notification_interval}
                  onChange={event => {
                    valueChanged("notification_interval", event);
                  }}
                />
              </CustomColumn>
              <CustomColumn customColumn="md-6" additionalStyles={["pr-0"]}>
                <CustomRow additionalStyles={["m-0"]}>
                  <CustomColumn customColumn="md-6">
                    <CheckboxDefault
                      label="Recovery"
                      checked={values.notification_options.indexOf("r") > -1}
                      onChange={() => {
                        notificationOptionChanged("r");
                      }}
                      error={errors.notification_options}
                    />
                  </CustomColumn>
                  <CustomColumn customColumn="md-6">
                    <CheckboxDefault
                      label="Warning"
                      checked={values.notification_options.indexOf("w") > -1}
                      onChange={() => {
                        notificationOptionChanged("w");
                      }}
                      error={errors.notification_options}
                    />
                  </CustomColumn>
                  <CustomColumn customColumn="md-6">
                    <CheckboxDefault
                      label="Critical"
                      checked={values.notification_options.indexOf("c") > -1}
                      onChange={() => {
                        notificationOptionChanged("c");
                      }}
                      error={errors.notification_options}
                    />
                  </CustomColumn>
                  <CustomColumn customColumn="md-6">
                    <CheckboxDefault
                      label="Flapping"
                      checked={values.notification_options.indexOf("f") > -1}
                      onChange={() => {
                        notificationOptionChanged("f");
                      }}
                      error={errors.notification_options}
                    />
                  </CustomColumn>
                </CustomRow>
              </CustomColumn>
              <CustomColumn customColumn="md-6">
                <IconInfo iconText="Time period" />
                <InputFieldSelect
                  options={timeperiods}
                  value={values.notification_period}
                  onChange={event => {
                    valueChanged("notification_period", event);
                  }}
                />
              </CustomColumn>
            </CustomRow>
          </ExpansionPanelDetails>
          <ExpansionPanelDetails className={classes.additionalStyles}>
            <MultiSelectContainer
              label={"Contact groups"}
              values={values.bam_contact}
              options={contactGroups}
              selected={selectedMultiselect == "bam_contact"}
              onEdit={() => {
                toggleMultiselect("bam_contact");
              }}
              error={""}
              labelKey={"name"}
              valueKey={"id"}
            />
          </ExpansionPanelDetails>
        </ExpansionPanel>
        <ExpansionPanel className={classes.customStyle}>
          <ExpansionPanelSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel4a-content"
            id="panel4a-header"
          >
            <Typography className={classes.heading}>Reporting</Typography>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails className={classes.additionalStyles}>
            <CustomRow>
              <CustomColumn customColumn="md-6">
                <InputField
                  placeholder="(0-100%)"
                  type="text"
                  name="test"
                  label="SLA warning percentage thresholds"
                  value={values.sla_month_percent_warn}
                  onChange={event => {
                    valueChanged("sla_month_percent_warn", event);
                  }}
                />
              </CustomColumn>
              <CustomColumn customColumn="md-6">
                <InputField
                  placeholder="minutes"
                  type="text"
                  name="test"
                  label="SLA warning duration threshold"
                  value={values.sla_month_duration_warn}
                  onChange={event => {
                    valueChanged("sla_month_duration_warn", event);
                  }}
                />
              </CustomColumn>
              <CustomColumn customColumn="md-6">
                <InputField
                  placeholder="(0-100%)"
                  type="text"
                  name="test"
                  label="SLA critical percentage thresholds"
                  value={values.sla_month_percent_crit}
                  onChange={event => {
                    valueChanged("sla_month_percent_crit", event);
                  }}
                />
              </CustomColumn>
              <CustomColumn customColumn="md-6">
                <InputField
                  placeholder="minutes"
                  type="text"
                  name="test"
                  label="SLA critical duration threshold"
                  value={values.sla_month_duration_crit}
                  onChange={event => {
                    valueChanged("sla_month_duration_crit", event);
                  }}
                />
              </CustomColumn>
            </CustomRow>
            <MultiSelectContainer
              label={
                "Extra reporting time periods used in Centreon BI indicators"
              }
              values={values.reporting_timeperiods}
              options={timeperiods}
              selected={selectedMultiselect == "reporting_timeperiods"}
              onEdit={() => {
                toggleMultiselect("reporting_timeperiods");
              }}
              error={""}
              labelKey={"name"}
              valueKey={"id"}
            />
          </ExpansionPanelDetails>
        </ExpansionPanel>
        <ExpansionPanel className={classes.customStyle}>
          <ExpansionPanelSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel5a-content"
            id="panel5a-header"
          >
            <Typography className={classes.heading}>Escalation</Typography>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails className={classes.additionalStyles}>
            <MultiSelectContainer
              label={"Number of escalations"}
              values={values.bam_esc}
              options={escalations}
              selected={selectedMultiselect == "bam_esc"}
              onEdit={() => {
                toggleMultiselect("bam_esc");
              }}
              error={""}
              labelKey={"name"}
              valueKey={"id"}
            />
          </ExpansionPanelDetails>
        </ExpansionPanel>
        <ExpansionPanel className={classes.customStyle}>
          <ExpansionPanelSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel6a-content"
            id="panel6a-header"
          >
            <Typography className={classes.heading}>Event handler</Typography>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails className={classes.additionalStyles}>
            <CustomRow additionalStyles={["w-100"]}>
              <CustomColumn customColumn="md-6">
                <CustomColumn customColumn="md-12" additionalStyles={["p-0"]}>
                  <IconInfo iconText="View event handler" />
                </CustomColumn>
                <FormControlLabel
                  control={
                    <MaterialSwitch
                      value={values.event_handler_enabled}
                      checked={values.event_handler_enabled}
                      onChange={event => {
                        valueChanged("event_handler_enabled", event);
                      }}
                    />
                  }
                  label="Enable"
                />
              </CustomColumn>
              <CustomColumn customColumn="md-6">
                <IconInfo iconText="Event handler command" />
                <InputFieldSelect
                  options={eventHandlerCommands}
                  value={values.event_handler_command}
                  onChange={event => {
                    valueChanged("event_handler_command", event);
                  }}
                />
              </CustomColumn>
            </CustomRow>
          </ExpansionPanelDetails>
        </ExpansionPanel>
      </div>
    );
  }
}

export default withStyles(styles)(BAForm);
