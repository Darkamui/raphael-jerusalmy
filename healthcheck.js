// eslint-disable-next-line @typescript-eslint/no-require-imports
const http = require("http");

const options = {
  host: "localhost",
  port: process.env.PORT || 3002,
  timeout: 2000,
  method: "GET",
  path: "/api/health",
};

const request = http.request(options, (res) => {
  // eslint-disable-next-line no-console
  console.log(`Health check status: ${res.statusCode}`);
  if (res.statusCode === 200) {
    process.exit(0);
  } else {
    process.exit(1);
  }
});

request.on("error", (err) => {
  console.error("Health check failed:", err.message);
  process.exit(1);
});

request.on("timeout", () => {
  console.error("Health check timeout");
  request.destroy();
  process.exit(1);
});

request.end();
