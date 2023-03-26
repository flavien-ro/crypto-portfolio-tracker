import express from "express";
import {
  getNFTs,
  getWalletPortfolio,
  getWalletPositions,
  getWalletTransactions,
} from "./controllers/getInfo.js";
import cors from "cors";
import dotenv from "dotenv";
import Moralis from "moralis";

const app = express();
const port = 3001;

dotenv.config();

const MORALIS_API_KEY = process.env.API_MORALIS;

app.use(cors());
app.use(express.json());

app.get("/getNFTs", getNFTs);
app.get("/getWalletPortfolio", getWalletPortfolio);
app.get("/getWalletPositions", getWalletPositions);
app.get("/getWalletTransactions", getWalletTransactions);

Moralis.start({
  apiKey: MORALIS_API_KEY,
}).then(() => {
  app.listen(port, () => {
    console.log("listening to " + port);
  });
});
