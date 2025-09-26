import { db } from '../config/connectDB.js';
import { FORM_MESSAGES } from '../constants/formMessages.js';

const formData = (req, res) => {
    const { name, age, mobileNumber, email, companyName, jobTitle, address, benefit_company, benefit_industry } = req.body;

    // ✅ Validation
    if (!name) {
        return res.status(400).json({ message: FORM_MESSAGES.NAME_REQUIRED });
    }

    if (!mobileNumber) {
        return res.status(400).json({ message: FORM_MESSAGES.MOBILE_REQUIRED });
    }

    if (!email) {
        return res.status(400).json({ message: FORM_MESSAGES.EMAIL_REQUIRED });
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
                    message: FORM_MESSAGES.DUPLICATE_MOBILE
                });
            }
            console.error("Error inserting data:", err);
            return res.status(500).json({ error: FORM_MESSAGES.DB_ERROR });
        }

        res.status(200).json({
            message: FORM_MESSAGES.INSERT_SUCCESS,
            insertedId: result.insertId
        });
    });
};

export { formData };
