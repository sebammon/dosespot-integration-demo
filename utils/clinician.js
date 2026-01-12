import fetch from "node-fetch";
import { getAccessToken } from "./auth.js";

export async function createClinician({
  firstName,
  lastName,
  dateOfBirth,
  npiNumber,
}) {
  const token = await getAccessToken();

  const res = await fetch(
    `${process.env.DOSESPOT_BASE_URL}/webapi/v2/api/clinicians`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Subscription-Key": process.env.DOSESPOT_SUBSCRIPTION_KEY,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        FirstName: firstName,
        LastName: lastName,
        DateOfBirth: new Date(dateOfBirth).toISOString(),
        // hardcoded demo fields
        Address1: "123 Demo St",
        City: "Boston",
        State: "MA",
        ZipCode: "02110",
        PrimaryPhone: "6175551234",
        PrimaryPhoneType: 7, // Primary
        PrimaryFax: "6175551234",
        ClinicianRoleType: [1], // PrescribingClinician
        NPINumber: npiNumber,
        Active: true,
      }),
    },
  );

  if (!res.ok) {
    const err = await res.text();
    throw new Error(err);
  }

  const data = await res.json();

  if (data.Result?.ResultCode === "ERROR") {
    throw new Error(JSON.stringify(data.Result));
  }

  return data;
}
