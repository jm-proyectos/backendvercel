import express from "express";
import connectDB from './db.js'; 
import ping from "ping";
import cors from "cors";
//import cookieParser from "cookie-parser";
const app = express();
const PORT = process.env.PORT || 3000;
const FRONTEND_URL = process.env.FRONTEND_URL;

connectDB();

import servicioRoutes from "./routes/servicios.routes.js";

app.use(cors());
//app.use(
//    cors({
//      credentials: true,
//      origin: FRONTEND_URL,
//    })
//);

//app.use(cookieParser());
app.use(express.json());

app.get("/",(req,res)=>{
    res.json("Servicios");
});



app.get("/ping/:host", async (req, res) => {
  const host = req.params.host;
  try {
    const result = await ping.promise.probe(host, { timeout: 3 });
    res.json({
      host,
      alive: result.alive,
      time: result.time || null,
    });
  } catch (err) {
    res.status(500).json({ error: "Ping failed", details: err.message });
  }
});


app.get("/ping2/:host", async (req, res) => {
  const host = req.params.host;
  res.json({host});
});


app.use("/api/servicios", servicioRoutes);


// Inicia el servidor
app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});
