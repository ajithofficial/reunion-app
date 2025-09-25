import { db } from "../config/connectDB.js";

const fetchEmployeesData = (req, res) => {
    const fetchSql = "SELECT * FROM users";
    db.query(fetchSql, (err, results) => {
        if (err) {
            console.error("Error fetching data:", err);
            return res.status(500).json({ error: "Database error" });
        }

        res.status(200).json({
            message: "Employees data fetched successfully",
            data: results,
        });
    });
};

export { fetchEmployeesData };
