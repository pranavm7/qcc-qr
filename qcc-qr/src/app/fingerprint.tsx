"use client";

import React, { useState, useEffect } from "react";
import { getFingerprint, getFingerprintData } from "@thumbmarkjs/thumbmarkjs";
import { run } from "node:test";

function getAllInfo(result) {
  let systemObject = result.system;
  ////// logging all the info
  // getTimezone(result);
  // getPlugins(result);
  // console.log("Apple Pay version:", getApplePayVersion(systemObject));
  // console.log("Browser info:", getBrowserInfo(systemObject));
  // console.log("Cookie enabled:", getCookieEnabled(systemObject));
  // console.log("Platform:", getPlatform(systemObject));
  // console.log("User agent:", getUserAgent(systemObject));
  //////
  // This object can/should be refactored into a type
  //////
  let resultObj = {
    TZ: getTimezone(result),
    Plugins: getPlugins(result),
    ApplePayVersion: getApplePayVersion(systemObject),
    BrowserInfo: getBrowserInfo(systemObject),
    CookieEnabled: getCookieEnabled(systemObject),
    Platform: getPlatform(systemObject),
    UserAgent: getUserAgent(systemObject),
  };
  console.log("Result object:", resultObj);
  return resultObj;
}

function getGrantedPermissions(result) {
  let permissions = result.permissions;
  let grantedPermissions = Object.keys(permissions).reduce((key, value) => {
    if (permissions[value] === "granted") {
      key[value] = permissions[value];
    }
    return key;
  }, {});

  if (Object.keys(grantedPermissions).length === 0) {
    throw new Error("No permissions granted by default!");
  }
}

function getTimezone(result) {
  let location = result.locales.timezone;
  return location;
}

function getPlugins(result) {
  let pluginsArray = result.plugins.plugins;
  return pluginsArray;
}

function getApplePayVersion(result) {
  return result.applePayVersion;
}

function getBrowserInfo(result) {
  return `${result.browser.name} ${result.browser.version}`;
}

function getCookieEnabled(result) {
  return result.cookieEnabled;
}

function getPlatform(result) {
  return result.platform;
}

function getUserAgent(result) {
  return result.useragent;
}

function Fingerprint() {
  const [fingerprint, setFingerprint] = useState({});
  useEffect(() => {
    getFingerprintData()
      .then((result) => {
        // Trigger all the functions to parse the fingerprint data from the result
        let fingerprintObj = {};
        fingerprintObj = getAllInfo(result);
        try {
          getGrantedPermissions(result);
        } catch (error) {
          console.log("Browser has secure defaults");
        }
        // set the new array with the fingerprint data
        setFingerprint(fingerprintObj);
      })
      .catch((error) => {
        console.error("Error getting fingerprint:", error);
      });
  }, []);

  return (
    <>
      <span>Timezone: {fingerprint.TZ}</span>
      <span>Plugins: {fingerprint.Plugins}</span>
      <span>Apple Pay Version: {fingerprint.ApplePayVersion}</span>
      <span>Browser Info: {fingerprint.BrowserInfo}</span>
      <span>Cookie Enabled: {fingerprint.CookieEnabled}</span>
      <span>Platform: {fingerprint.Platform}</span>
      <span>User Agent: {fingerprint.UserAgent}</span>
    </>
  );
}

export default Fingerprint;
