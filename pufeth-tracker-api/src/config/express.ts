import express from "express";
import cors from "cors";
import corsOptions from "./corsOptions";
import router from "../api/routes";

const app = express();

app.use(cors(corsOptions));
app.use(express.json());
app.use('/api', router);

export default app;