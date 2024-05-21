"use client";

import React, { useState, useEffect } from "react";
import { getFingerprint, getFingerprintData } from "@thumbmarkjs/thumbmarkjs";

function Fingerprint() {
  const [fingerprint, setFingerprint] = useState("");

  useEffect(() => {
    getFingerprint()
      .then((result) => {
        setFingerprint(result.toString());
      })
      .catch((error) => {
        console.error("Error getting fingerprint:", error);
      });
    getFingerprintData().then((result) => {
      console.log("Fingerprint data:", result);
    });
  }, []);

  return <>{fingerprint}</>;
}

export default Fingerprint;
