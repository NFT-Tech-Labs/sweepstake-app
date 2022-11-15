/* eslint-disable react/prop-types */
import React, { useState, useEffect } from "react";
import classNames from "classnames/bind";
import styles from "./teamSelect.module.scss";
import PropTypes from "prop-types";
import { teams } from "utils/data";
import Select, { components } from "react-select";
// import json from "country-region-data/data.json";
import ReactCountryFlag from "react-country-flag";
import { Title, Icon } from "@components";

const cx = classNames.bind(styles);

const TeamSelect = ({
  className,
  onChange,
  defaultValue,
  disabled,
  label,
  options,
  ...props
}) => {
  const [selectedTeam, setSelectedTeam] = useState(null);
  let classes = cx({ teamSelect: true }, className);

  const sortedTeam = teams.sort(function (a, b) {
    if (a.countryName < b.countryName) {
      return -1;
    }
    if (a.countryName > b.countryName) {
      return 1;
    }
    return 0;
  });

  const Control = ({ children, ...props }) => {
    return (
      <components.Control {...props}>
        {props?.selectProps?.value?.value === "EN" &&
          props?.selectProps?.value?.value !== "WL" && (
            <Icon name={"EN"} className={styles.customIconEN} />
          )}
        {props?.selectProps?.value?.value === "WL" &&
          props?.selectProps?.value?.value !== "EN" && (
            <Icon name={"WL"} className={styles.customIcon} />
          )}
        {props?.selectProps?.value?.value !== "EN" &&
          props?.selectProps?.value?.value !== "WL" && (
            <ReactCountryFlag
              countryCode={props?.selectProps?.value?.value}
              svg
              style={{
                width: "1.5em",
                height: "1.5em",
                marginLeft: 10,
              }}
              title={props?.selectProps?.value?.label}
            />
          )}
        {children}
      </components.Control>
    );
  };

  const IconOption = (props) => (
    <components.Option className={styles.option} {...props}>
      {props.data?.label}
      {props.data?.value === "EN" && props.data?.value !== "WL" && (
        <Icon name={"EN"} className={styles.customIconEN} />
      )}
      {props.data?.value === "WL" && props.data?.value !== "EN" && (
        <Icon name={"WL"} className={styles.customIcon} />
      )}
      {props.data?.value !== "EN" && props.data?.value !== "WL" && (
        <ReactCountryFlag
          countryCode={props.data?.value}
          svg
          style={{
            width: "1.5em",
            height: "1.5em",
            marginLeft: 10,
          }}
          title={props.data?.label}
        />
      )}
    </components.Option>
  );

  useEffect(() => {
    onChange(selectedTeam);
  }, [selectedTeam]);

  return (
    <div className={classes}>
      <Title tag={"h5"} color={"light"} text={"Select your preferred team"} />
      {teams && (
        <Select
          onChange={(e) => setSelectedTeam(e)}
          className={styles.select}
          defaultValue={defaultValue}
          isDisabled={disabled}
          components={{ Option: IconOption, Control }}
          options={sortedTeam?.map((item, index) => {
            return {
              label: item.countryName,
              value: item.countryShortCode,
              key: index,
            };
          })}
          {...props}
        />
      )}
    </div>
  );
};

TeamSelect.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node,
  label: PropTypes.string,
  options: PropTypes.array,
};

TeamSelect.defaultProps = {
  className: "",
  children: null,
  label: "",
  options: null,
};

export default TeamSelect;
