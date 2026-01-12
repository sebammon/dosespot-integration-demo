import crypto from "crypto";

function sha512Base64(input) {
  return crypto
    .createHash("sha512")
    .update(input, "utf8")
    .digest("base64")
    .replace(/==$/, "");
}

export function generateSSO({ clinicId, userId, clinicKey, patientId }) {
  const phrase = crypto.randomBytes(24).toString("hex").slice(0, 32);

  const clinicHash = sha512Base64(phrase + clinicKey);
  const encryptedClinicId = phrase + clinicHash;

  const userPhrase = phrase.slice(0, 22);
  const userHash = sha512Base64(userId + userPhrase + clinicKey);

  return {
    SingleSignOnClinicId: clinicId,
    SingleSignOnUserId: userId,
    PatientID: patientId,
    SingleSignOnPhraseLength: 32,
    SingleSignOnCode: encodeURIComponent(encryptedClinicId),
    SingleSignOnUserIdVerify: encodeURIComponent(userHash),
  };
}
