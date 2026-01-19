import express from "express";
import cors from "cors";
import router from "./routes/apiRouter.js";
import cookieParser from "cookie-parser";

const app = express();

// Allowed origins
const allowedOrigins = [
  "https://qr-scan-frontend.vercel.app",       // frontend
  "https://qr-admin-frontend-six.vercel.app"   // admin panel
];

app.use(cors({
  origin: function(origin, callback){
    if(!origin) return callback(null, true); // for Postman or server-to-server
    if(allowedOrigins.indexOf(origin) === -1){
      const msg = `CORS policy: Access denied from ${origin}`;
      return callback(new Error(msg), false);
    }
    return callback(null, true);
  },
  credentials: true // cookies & auth headers
}));

app.use(express.json());
app.use(cookieParser());

// API routes
app.use("/api", router);

export default app;
