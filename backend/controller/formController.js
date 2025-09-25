import { db } from '../config/connectDB.js';

const formData = (req, res) => {
    const { name, age, mobileNumber, email, companyName, jobTitle, address, benefit_company, benefit_industry } = req.body;

    // ✅ Validation
    if (!name) {
        return res.status(400).json({ message: "Name is required" });
    }

    if (!mobileNumber) {
        return res.status(400).json({ message: "Mobile Number is required" });
    }

    if (!email) {
        return res.status(400).json({ message: "Email is required" });
    }

    const sql = `
        INSERT INTO users (name, age, mobileNumber, email, companyName, jobTitle, address, benefit_company, benefit_industry) 
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;

    const values = [name, age, mobileNumber, email, companyName, jobTitle, address, benefit_company, benefit_industry];

    db.query(sql, values, (err, result) => {
        if (err) {
            if (err.code === "ER_DUP_ENTRY") {
                // ✅ Duplicate mobile number
                return res.status(400).json({
                    message: "User with this Mobile Number already exists"
                });
            }
            console.error("Error inserting data:", err);
            return res.status(500).json({ error: "Database error" });
        }

        res.status(200).json({
            message: "Form data inserted successfully",
            insertedId: result.insertId
        });
    });
};

export { formData };
