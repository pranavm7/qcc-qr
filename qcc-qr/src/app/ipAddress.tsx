"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import { get } from "http";

function IPAddress() {
  //creating IP state
  const [ip, setIP] = useState("");
  const [ipData, setIPData] = useState(<></>);
  const [loading, setLoading] = useState(true);

  //   const getIP = async () => {
  //     const res = await axios.get("https://api.ipify.org/?format=json");
  //     // console.log(res.data);
  //     setIP(res.data.ip);
  //   };

  function displayData(data) {
    //     city: "Cincinnati"
    // country: "United States"
    // countryCode: "US"
    // hosting: false
    // isp: "Charter Communications"
    // mobile: false
    // org: "Spectrum"
    // proxy: false
    // query: "<REDACTED>"
    // regionName: "Ohio"
    // status: "success"
    // timezone: "America/New_York"
    // zip: "<REDACTED>"
    return (
      <div>
        <span className="space-y-5">
          Location Details:
          <p>
            {data.city}, {data.regionName}, {data.country}
          </p>
          {/* <p>{data.regionName}</p>
          <p>{data.country}</p> */}
          <p>
            Internet Provider: {data.isp} || {data.org}
          </p>
          <p>Timezone: {data.timezone}</p>
          {data.proxy ? <p>Proxy: Yes</p> : <></>}
          {data.mobile ? <p>Mobile: Yes</p> : <></>}
        </span>
      </div>
    );
  }

  const getIPData = async () => {
    const res = await axios.get("http://ip-api.com/json?fields=17033019");
    console.log(res.data);
    if (res.data.status === "success") {
      setLoading(false);
      setIP(res.data.query);
      setIPData(displayData(res.data));
    }
    return;
  };

  useEffect(() => {
    //passing getData method to the lifecycle method
    // getIP();
    getIPData();
  }, []);

  return (
    <div className="pt-5">
      {!loading ? (
        <>
          <div className="text-lg space-y-4">
            <p>Your IP Address:{ip}</p>
          </div>
          <span className="p-5">{ipData}</span>
        </>
      ) : (
        <></>
      )}
    </div>
  );
}

export default IPAddress;
