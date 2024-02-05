import express from "express";
import cors from "cors";
import mongoose from "mongoose";

import { MONGO_URI, PORT } from "./config/dotenv.js";
import resourcesRoutes from "./routes/resources.routes.js";

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => res.redirect("/api/resources"));
app.use("/api/resources", resourcesRoutes);

mongoose.connect(MONGO_URI);
mongoose.connection.on("error", (error) => console.log(error));
mongoose.connection.on("connected", () => console.log("Mongo DB connected!"));

app.listen(PORT, () => console.log(`Server up at PORT ${PORT}!`));
