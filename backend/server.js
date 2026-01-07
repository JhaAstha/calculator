
const express = require("express");
const cors = require("cors");
const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

// Endpoint to evaluate expressions
app.post("/calculate", (req, res) => {
    const { expression } = req.body;
    try {
        // WARNING: eval is only safe for controlled inputs
        const result = eval(expression);
        res.json({ result });
    } catch (error) {
        res.status(400).json({ error: "Invalid Expression" });
    }
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});