/* eslint-disable react/prop-types */
import React, { useState, useEffect } from "react";
import classNames from "classnames/bind";
import styles from "./teamSelect.module.scss";
import PropTypes from "prop-types";
import Select, { components } from "react-select";
import json from "country-region-data/data.json";
import ReactCountryFlag from "react-country-flag";
import { Title, Icon } from "@components";

const cx = classNames.bind(styles);

const TeamSelect = ({ className, onChange, label, options, ...props }) => {
  const [selectedTeam, setSelectedTeam] = useState(null);
  let classes = cx({ teamSelect: true }, className);

  //   {
  //     countryName: "England",
  //     countryShortCode: "EN",
  //   },
  //   {
  //     countryName: "Wales",
  //     countryShortCode: "WL",
  //   }
  const teams = [
    "NL",
    "EC",
    "QA",
    "SN",
    "US",
    "WL",
    "IR",
    "EN",
    "AR",
    "SA",
    "MX",
    "PL",
    "FR",
    "AU",
    "DK",
    "TN",
    "CR",
    "JP",
    "ES",
    "DE",
    "BE",
    "MA",
    "HR",
    "CA",
    "RS",
    "BR",
    "CM",
    "CH",
    "GH",
    "PT",
    "KR",
    "UY",
  ];

  const filteredTeams = json?.filter((item) =>
    teams.includes(item?.countryShortCode)
  );
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
      {props.data.label}
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
    </components.Option>
  );

  useEffect(() => {
    onChange(selectedTeam);
  }, [selectedTeam]);

  return (
    <div className={classes}>
      <Title tag={"h5"} color={"light"} text={"Select your team"} />
      {json && (
        <Select
          onChange={(e) => setSelectedTeam(e)}
          className={styles.select}
          defaultValue={{ value: "AR", label: "Argentina" }}
          components={{ Option: IconOption, Control }}
          options={filteredTeams?.map((item, index) => {
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
