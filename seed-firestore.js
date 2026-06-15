const { initializeApp, cert } = require("firebase-admin/app");
const { getFirestore } = require("firebase-admin/firestore");
const fs = require("fs");
const path = require("path");

initializeApp({
  credential: cert(require("./service-account.json")),
  projectId: "personal-dashboard-2b869",
});

const db = getFirestore();

async function seed() {
  const dataPath = path.join(__dirname, "dashboard_data.json");
  const data = JSON.parse(fs.readFileSync(dataPath, "utf8"));

  await db.collection("personal_os").doc("dashboard_data").set(data);
  console.log("Done");
  process.exit(0);
}

seed().catch((err) => {
  console.error(err);
  process.exit(1);
});
