const express = require("express");
const rateLimit = require("express-rate-limit");

const { ServerConfig } = require("./config");
const apiRoutes = require("./routes");

const app = express();

const limiter = rateLimit({
    windowMs: 2 * 60 * 1000, // 2 minutes
    max: 4 // limit each IP to 4 requests per window
})

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Apply the rate limiting middleware to all requests
app.use(limiter);

// whenever we get a url that starts with /api will redirect all request to apiRoutes
app.use("/api", apiRoutes);

app.listen(ServerConfig.PORT, () => {
    console.log(`Server is up and running on PORT ${ServerConfig.PORT}`);
});

