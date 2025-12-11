const express = require("express");
const path = require("path");

const app = express();

app.use(express.static(path.join(__dirname, "public")));

app.get("/api", (req, res) => {
  res.json({ message: "🚀 CI/CD Success! Deployed from Jenkins → EC2" });
});

const PORT = 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
