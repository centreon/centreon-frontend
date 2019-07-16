/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable react/jsx-no-bind */
/* eslint-disable react/jsx-filename-extension */
/* eslint-disable react/prop-types */

import React from "react";
import ReactDOM from "react-dom";
import classnames from "classnames";
import Button from "@material-ui/core/Button";
import ArrowForward from "@material-ui/icons/ArrowForwardIos";
import ArrowBack from "@material-ui/icons/ArrowBackIos";
import styles from "./panels.scss";
import styles2 from "./PanelItem/panel-item.scss";
import PanelItem from "./PanelItem";
import PanelHeaderTitle from "./PanelHeaderTitle";
import IconPowerSettings from "../MaterialComponents/Icons/IconPowerSettings";
import IconPowerSettingsDisable from "../MaterialComponents/Icons/IconPowerSettingsDisable";
import IconAttach from "../MaterialComponents/Icons/IconAttach";
import BAForm from "../Forms/BAForm";
import IconCloseNew from "../MaterialComponents/Icons/IconClose";
import InputField from "../InputField";
import TableDefault from "../Table/TableDefault";
import MultiSelectPanel from "../MultiSelectPanel";
import BAModel from "../Mocks/oneBa.json";
import TABLE_COLUMN_TYPES from "../Table/ColumnTypes";

const multiselectsConfiguration = {
  reporting_timeperiods: {
    dataKey: "timeperiods",
    tableConfiguration: [
      {
        id: "name",
        numeric: false,
        disablePadding: true,
        label: "Name",
        type: TABLE_COLUMN_TYPES.string
      },
      {
        id: "alias",
        numeric: false,
        label: "Alias",
        type: TABLE_COLUMN_TYPES.string
      }
    ]
  },
  bam_kpi: {
    dataKey: "kpis",
    tableConfiguration: [
      {
        id: "name",
        numeric: false,
        disablePadding: true,
        label: "Objects",
        type: TABLE_COLUMN_TYPES.string
      },
      {
        id: "type",
        numeric: false,
        disablePadding: true,
        label: "Type",
        type: TABLE_COLUMN_TYPES.string
      },
      {
        id: "type",
        numeric: false,
        disablePadding: true,
        label: "Mode",
        subkey:"impact",
        type: TABLE_COLUMN_TYPES.string
      },
      {
        id: "warning",
        numeric: false,
        disablePadding: true,
        label: "Warning",
        subkey:"impact",
        type: TABLE_COLUMN_TYPES.string
      },
      {
        id: "critical",
        numeric: false,
        disablePadding: true,
        label: "Critical",
        subkey:"impact",
        type: TABLE_COLUMN_TYPES.string
      },
      {
        id: "unknown",
        numeric: false,
        label: "Unknown",
        subkey:"impact",
        type: TABLE_COLUMN_TYPES.string
      }
    ]
  },
  groups: {
    dataKey: "businessViews",
    tableConfiguration: [
      {
        id: "name",
        numeric: false, 
        label: "Name",
        type: TABLE_COLUMN_TYPES.string
      },
      {
        id: "description",
        numeric: false,
        label: "Description",
        type: TABLE_COLUMN_TYPES.string
      },
      {
        id: "visible",
        numeric: false,
        label: "Visible",
        type: TABLE_COLUMN_TYPES.boolean
      }
    ]
  },
  bam_contact: {
    dataKey: "contactGroups",
    tableConfiguration: [
      {
        id: "name",
        numeric: false,
        label: "Name",
        type: TABLE_COLUMN_TYPES.string
      },
      {
        id: "activate",
        numeric: false,
        label: "Activate",
        type: TABLE_COLUMN_TYPES.boolean
      }]
  },
  bam_esc: {
    dataKey: "escalations",
    tableConfiguration: [
      {
        id: "name",
        numeric: false,
        label: "Name",
        type: TABLE_COLUMN_TYPES.string
      }]
  }
};

class BAPanel extends React.Component {
  state = {
    multiselectActive: false,
    multiSelectKey: null,
    activeMultiselectKey: "",
    nameEditingToggled: false
  };

  toggleMultiselect = multiSelectKey => {
    if (!multiSelectKey) {
      this.setState({
        multiselectActive: false,
        multiSelectKey: null
      });
    } else {
      this.setState({
        multiSelectKey,
        multiselectActive: true
      });
    }
  };

  toggleNameEditing = () => {
    const { nameEditingToggled } = this.state;
    this.setState({
      nameEditingToggled: !nameEditingToggled
    });
  };

  focusNameEditInput(component) {
    if (component) {
      ReactDOM.findDOMNode(component).focus();
    }
  }

  render() {
    const {
      customClass,
      active,
      onSave,
      onClose,
      values = BAModel.result,
      errors,
      valueChanged = () => {},
      defaultImage,
      uploadedImage,
      centreonImages,
      eventHandlerCommands,
      escalations,
      timeperiods,
      kpis,
      contactGroups,
      businessViews
    } = this.props;
    const {
      multiselectActive,
      nameEditingToggled,
      multiSelectKey
    } = this.state;
    return (
      <div
        className={classnames(
          styles.panels,
          styles[customClass || ""],
          styles[active ? "panels-active" : ""],
          styles[multiselectActive ? "panels-second-active" : ""]
        )}
      >
        <div className={classnames(styles["panels-dialog"])}>
          <div className={classnames(styles["panels-inner"])}>
            <div className={classnames(styles["panels-header"])}>
              {values.icon ? (
                <IconAttach
                  uploadedImage
                  imgSource={
                    centreonImages.find(x => x.id == values.icon)
                      ? centreonImages.find(x => x.id == values.icon).preview
                      : ""
                  }
                />
              ) : (
                <IconAttach defaultImage />
              )}
              {values.activate ? (
                <IconPowerSettings />
              ) : (
                <IconPowerSettingsDisable />
              )}

              {nameEditingToggled ? (
                <InputField
                  placeholder="Click here to add name"
                  type="text"
                  name="name"
                  value={values.name}
                  inputSize={"header"}
                  onChange={event => {
                    valueChanged("name", event);
                  }}
                  onBlur={this.toggleNameEditing}
                  reference={this.focusNameEditInput}
                />
              ) : (
                <PanelHeaderTitle
                  label={values.name ? values.name : "Click here to add name"}
                  onClick={this.toggleNameEditing}
                />
              )}

              <IconCloseNew onClick={onClose} />
              <Button
                variant="contained"
                color="primary"
                style={{
                  position: "absolute",
                  right: 60,
                  top: 9,
                  backgroundColor: "#0072CE",
                  fontSize: 11
                }}
                onClick={onSave}
              >
                Save
              </Button>
            </div>
            <div className={classnames(styles["panels-body"])}>
              <PanelItem
                panelItemType="big"
                panelItemShow={multiselectActive ? "panel-item-show-big" : ""}
              >
                <div className={classnames(styles2["panel-item-inner"])}>
                  <BAForm
                    values={values}
                    errors={{}}
                    centreonImages={centreonImages}
                    eventHandlerCommands={eventHandlerCommands}
                    escalations={escalations}
                    timeperiods={timeperiods}
                    kpis={kpis}
                    contactGroups={contactGroups}
                    businessViews={businessViews}
                    remoteServers={[]}
                    notificationOptionChanged={() => {}}
                    toggleMultiselect={this.toggleMultiselect}
                    valueChanged={valueChanged}
                    selectedMultiselect={multiSelectKey}
                  />
                </div>
                <span
                  className={classnames(
                    styles["panels-arrow"],
                    multiselectActive ? styles["panels-arrow-right"] : ""
                  )}
                  {...(multiselectActive && {
                    onClick: () => {
                      this.toggleMultiselect(false);
                    }
                  })}
                >
                  {multiselectActive ? <ArrowForward /> : null}
                </span>
              </PanelItem>
              <MultiSelectPanel
                styles={styles2}
                active={multiselectActive}
                title={
                  "Manage extra reporting time periods used in Centreon BI indicators"
                }
                data={
                  multiselectsConfiguration[multiSelectKey]
                    ? this.props[
                        multiselectsConfiguration[multiSelectKey].dataKey
                      ]
                    : []
                }
                tableConfiguration={
                  multiselectsConfiguration[multiSelectKey]
                    ? multiselectsConfiguration[multiSelectKey]
                        .tableConfiguration
                    : []
                }
                onSearch={() => {}}
                key={multiSelectKey}
                onPaginate={() => {}}
                onPaginationLimitChanged={() => {}}
                onSort={() => {}}
                currentPage={0}
                totalRows={150}
                currentlySelected={multiSelectKey ? values[multiSelectKey] : []}
                paginationLimit={5}
                onSelect={selected => {
                  valueChanged(multiSelectKey, null, selected);
                }}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default BAPanel;
