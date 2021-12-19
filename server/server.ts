import express from "express";
import path from "path";
import {INITIAL_STATE} from "./server.utils";

const PORT = process.env.PORT || 5000;

const app = express();

app.use(express.json());
// Serve the React static files after build
app.use(express.static("../client/build"));

app.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`);
});

app.put("/api/widgets", (req, res) => {
    setTimeout(() => res.status(200).json(req.body), 3000);
});

app.get("/api/widgets", (req, res) => {
    setTimeout(() => res.json(INITIAL_STATE), 3000);
});

app.get("/api/data/bar", (req, res) => {
    const bars: any = req.query.bars;
    const requestedBars: number = bars ? parseInt(bars) : 0;
    const result: number[] = [];
    for (let i = 0; i < requestedBars; i++) {
        result.push(Math.round(100 * Math.random()));
    }
    setTimeout(() => res.json({data: result}), 3000);
});

app.get("/api/data/pie", (req, res) => {
    const result: number[] = [];
    for (let i = 0; i < 3; i++) {
        result.push(Math.round(100 * Math.random()));
    }
    setTimeout(() => res.json({data: result}), 2000);
});

// All other unmatched requests will return the React app
app.get("/", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
});