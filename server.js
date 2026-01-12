import Fastify from "fastify";
import formbody from "@fastify/formbody";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";
import { createClinician } from "./utils/clinician.js";
import { generateSSO } from "./utils/sso.js";
import "dotenv/config";

const app = Fastify({
  logger: true,
});

app.register(formbody);

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const viewsDir = path.join(__dirname, "views");

app.get("/", (_, reply) => {
  const file = fs.readFileSync(path.join(viewsDir, "index.html"));

  reply.type("text/html").send(file);
});

app.get("/clinician", (_, reply) => {
  const file = fs.readFileSync(path.join(viewsDir, "clinician.html"));

  reply.type("text/html").send(file);
});

app.post("/clinician", async (req, reply) => {
  const clinician = await createClinician(req.body);

  reply.redirect(`/dosespot?clinicianId=${clinician.Id}`);
});

app.get("/dosespot", async (req, reply) => {
  const file = fs.readFileSync(path.join(viewsDir, "dosespot.html"));

  reply.type("text/html").send(file);
});

app.post("/dosespot/login", async (req, reply) => {
  const sso = generateSSO({
    clinicId: process.env.DOSESPOT_CLINIC_ID,
    userId: req.body.clinicianId,
    clinicKey: process.env.DOSESPOT_CLINIC_KEY,
    patientId: req.body.patientId || "81748605",
  });

  const query = new URLSearchParams(sso).toString();
  const url = `${process.env.DOSESPOT_BASE_URL}/LoginSingleSignOn.aspx?${query}`;

  reply.send({ data: url });
});

await app.listen({ port: 3000 });
