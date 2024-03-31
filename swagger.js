const swaggerAutogen = require("swagger-autogen")();

const doc = {
    info: {
        title: "E-commerce",
        description: "",
    },
    host: "localhost:8000",
    schemas: ["http"],
};

const outputFile = "./swagger-output.json";
const endpointsFile = ["./routes/index.js"];

swaggerAutogen(outputFile, endpointsFile, doc).then(() => {
    // eslint-disable-next-line global-require
    require("./server");
});