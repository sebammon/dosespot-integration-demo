import fetch from "node-fetch";

export async function getAccessToken() {
  const url = `${process.env.DOSESPOT_BASE_URL}/webapi/v2/connect/token`;

  const body = new URLSearchParams({
    grant_type: "password",
    client_id: process.env.DOSESPOT_CLINIC_ID,
    client_secret: process.env.DOSESPOT_CLINIC_KEY,
    username: process.env.DOSESPOT_ADMIN_USER_ID,
    password: process.env.DOSESPOT_CLINIC_KEY,
    scope: "api",
  });

  const res = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      "Subscription-Key": process.env.DOSESPOT_SUBSCRIPTION_KEY,
    },
    body,
  });

  if (!res.ok) {
    throw new Error("Failed to authenticate with DoseSpot");
  }

  const data = await res.json();

  return data.access_token;
}
