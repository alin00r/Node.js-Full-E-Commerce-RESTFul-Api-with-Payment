/* eslint-disable import/no-extraneous-dependencies */
const path = require("path");
// eslint-disable-next-line import/no-extraneous-dependencies
const hpp = require("hpp");
const cors = require("cors");
const compression = require("compression");
const ratelimit = require("express-rate-limit");
const mongoSanitize = require("express-mongo-sanitize");
const xss = require("xss-clean");

const express = require("express");
const dotenv = require("dotenv");
const morgan = require("morgan");

dotenv.config({ path: "config.env" });
const ApiError = require("./utils/apiError");
const globalError = require("./middlewares/errorMiddleware");
const dbConnection = require("./config/database");

// Routes
const mountRoutes = require("./routes");
const { webhookCheckout } = require("./controllers/orderController");

// Connect with db
dbConnection();

// express app
const app = express();

// Enable CROS
app.use(cors());
app.options("*", cors());

// compress all responses
app.use(compression());

// checkout webhook
app.post(
    "/webhook-checkout",
    express.raw({ type: "application/json" }),
    webhookCheckout
);

// Middlewares
app.use(express.json({ limit: "20kb" }));
app.use(express.static(path.join(__dirname, "uploads")));

if (process.env.NODE_ENV === "development") {
    app.use(morgan("dev"));
    console.log(`mode ${process.env.NODE_ENV}`);
}
// To apply data sanitization
app.use(mongoSanitize());
app.use(xss());

const limiter = ratelimit({
    windowMs: 60 * 60 * 1000, //1 hour
    max: 100,
    message: "Too many accounts created from this IP, please try again after an hour",
});
// Apply the rate limitimg middleware to  all requests
app.use("/api/v1/auth", limiter);

// Middleware to protect against HTTP Parameter Pollution attacks
app.use(
    hpp({
        whitelist: [
            "price",
            "sold",
            "quantity",
            "ratingsAverage",
            "ratingsQuantity",
        ],
    })
);

// Mount Routes
mountRoutes(app);

app.all("*", (req, res, next) => {
    next(new ApiError(`Can't find this route: ${req.originalUrl}`, 404));
});
// Global error handling middleware For express
app.use(globalError);

const PORT = process.env.PORT || 8000;
const server = app.listen(PORT, () => {
    console.log(`App running on port ${PORT}`);
});

// Handle rejection outside express
process.on("unhandledRejection", (err) => {
    console.error(`UnhandledRegjection Errors: ${err.name}| ${err.message}`);
    server.close(() => {
        console.error("Shutting down....");
        process.exit(1);
    });
});