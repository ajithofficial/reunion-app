import express from 'express';
import cors from 'cors';
import { createTable } from './config/connectDB.js';
import formRoutes from './routes/formRoutes.js';
import tableRoutes from './routes/tableRoutes.js';

const app = express();
app.use(cors());
app.use(express.json());

createTable();

app.use("/api", formRoutes);
app.use("/api", tableRoutes);

const admin = {
    name: "Admin",
    mobileNumber: "1234567890"
};

app.get("/api/login", (req, res) => {
    const { name, mobileNumber } = req.query;

    if (!name || !mobileNumber) {
        return res.status(400).json({ message: "Name and Mobile Number required" });
    }

    if (name === admin.name && mobileNumber === admin.mobileNumber) {
        return res.status(200).json({ message: "Welcome Admin!" });
    } else {
        return res.status(200).json({ message: "Access Denied!" });
    }
});

app.listen(5000, () => {
    console.log('Server running on port 5000');
});
