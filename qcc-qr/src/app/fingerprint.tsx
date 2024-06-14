"use client";

import React, { useState, useEffect } from "react";
import { getFingerprint, getFingerprintData } from "@thumbmarkjs/thumbmarkjs";
import { run } from "node:test";

function getAllInfo(result) {
  let systemObject = result.system;
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
  pluginsArray = Array.from(new Set(pluginsArray.join("|").split("|")));
  console.log("Plugins array:", pluginsArray);
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
  const [fingerprint, setFingerprint] = useState<any>({});
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
    //<div className=" flex space-x-2 flex-col space-y-3">
    <div>
      <span className=" overflow-hidden text-wrap space-y-3">
        {/* <p>Timezone: {fingerprint.TZ}</p> */}
        {fingerprint.ApplePayVersion > 0 ? (
          <p>Apple Pay Version: {fingerprint.ApplePayVersion}</p>
        ) : (
          <></>
        )}
        <p>Browser Info: {fingerprint.BrowserInfo}</p>
        <p>Cookies Enabled: {String(fingerprint.CookieEnabled)}</p>
        <p>Platform: {fingerprint.Platform}</p>
        <p className=" text-wrap">User Agent: {fingerprint.UserAgent}</p>
        {fingerprint.Plugins ? (
          <div>
            <div>Plugins:</div>
            <div>
              {fingerprint.Plugins.map((plugin, index) => {
                return <div key={index}>{plugin}</div>;
              })}
            </div>
          </div>
        ) : (
          <></>
        )}
      </span>
    </div>
  );
}

export default Fingerprint;
