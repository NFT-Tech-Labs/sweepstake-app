/* eslint-disable react/prop-types */
import React, { useState } from "react";
import classNames from "classnames/bind";
import styles from "./teamSelect.module.scss";
import PropTypes from "prop-types";
import Select, { components } from "react-select";
import json from "country-region-data/data.json";
import ReactCountryFlag from "react-country-flag";
import { Title, Icon } from "@components";

const cx = classNames.bind(styles);

const TeamSelect = ({ className, label, options, ...props }) => {
  let classes = cx({ teamSelect: true }, className);

  const teams = [
    "NL",
    "EC",
    "QA",
    "SN",
    "US",
    "WS",
    "IR",
    "GB",
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

  const filteredTeams = json.filter((item) =>
    teams.includes(item?.countryShortCode)
  );

  const Control = ({ children, ...props }) => {
    return (
      <components.Control {...props}>
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

  return (
    <div className={classes}>
      <Title tag={"h5"} color={"light"} text={"Select your team"} />
      <Select
        className={styles.select}
        defaultValue={{ value: "HR", label: "Croatia" }}
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
