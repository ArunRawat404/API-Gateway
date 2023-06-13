const rateLimit = require("express-rate-limit");
const express = require("express");
const { createProxyMiddleware } = require("http-proxy-middleware");

const { ServerConfig } = require("./config");
const apiRoutes = require("./routes");

const app = express();

const limiter = rateLimit({
    windowMs: 2 * 60 * 1000, // 2 minutes
    max: 30 // limit each IP to 4 requests per window
})

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Apply the rate limiting middleware to all requests
app.use(limiter);

/** 
Proxy
Client -> API Gateway(localhost:5000) -> Flight Service or Booking Service
**/
app.use("/flightsService", createProxyMiddleware({
    target: ServerConfig.FLIGHT_SERVICE,
    changeOrigin: true,
    pathRewrite: { "^/flightsService": "/" }
}));
app.use("/bookingService", createProxyMiddleware({
    target: ServerConfig.BOOKING_SERVICE,
    changeOrigin: true,
    pathRewrite: { "^/bookingService": "/" }
}));

// whenever we get a url that starts with /api will redirect all request to apiRoutes
app.use("/api", apiRoutes);

app.listen(ServerConfig.PORT, () => {
    console.log(`Server is up and running on PORT ${ServerConfig.PORT}`);
});



