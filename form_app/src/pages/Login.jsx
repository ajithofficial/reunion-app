import React, { useState, useRef } from "react";
import axios from "axios";
import { useNavigate } from "react-router";
import { LOGIN_ERRORS, LOGIN_TEXTS } from "../constants/messages";
import { ROUTES } from "../constants/routes";
import { API_PATHS } from "../constants/api";

const LoginModal = () => {
    const [name, setName] = useState("");
    const [mobileNumber, setMobileNumber] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [errors, setErrors] = useState({});
    const navigate = useNavigate();
    const modalRef = useRef(null);

    const validateForm = () => {
        const newErrors = {};
        if (!name.trim()) newErrors.name = LOGIN_ERRORS.nameRequired;
        else if (name.length < 2) newErrors.name = LOGIN_ERRORS.nameShort;

        if (!mobileNumber.trim()) newErrors.mobileNumber = LOGIN_ERRORS.mobileRequired;
        else if (!/^\d{10}$/.test(mobileNumber)) newErrors.mobileNumber = LOGIN_ERRORS.mobileInvalid;

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const API_URL = process.env.REACT_APP_API_URL;
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validateForm()) return;
        setIsLoading(true);
        try {
            const res = await axios.get(`${API_URL}${API_PATHS.LOGIN}`, {
                params: { name, mobileNumber },
            });
            if (res.data.message === "Welcome Admin!") {
                document.querySelectorAll('.modal-backdrop').forEach(el => el.remove());
                document.body.classList.remove('modal-open');
                navigate(ROUTES.TABLE);
            } else {
                setErrors({ general: LOGIN_ERRORS.accessDenied });
            }
        } catch (error) {
            setErrors({ general: LOGIN_ERRORS.general });
        } finally {
            setIsLoading(false);
        }
    };

    const handleClose = () => {
        setName("");
        setMobileNumber("");
        setErrors({});
    };

    return (
        <div
            className="modal fade"
            id="loginModal"
            tabIndex="-1"
            aria-labelledby="loginModalLabel"
            aria-hidden="true"
            data-bs-backdrop="static"
        >
            <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content">
                    <div className="modal-header bg-primary text-white">
                        <h5 className="modal-title" id="loginModalLabel">
                            <i className="bi bi-person-circle me-2"></i> {LOGIN_TEXTS.adminLogin}
                        </h5>
                        <button
                            type="button"
                            className="btn-close btn-close-white"
                            data-bs-dismiss="modal"
                            aria-label="Close"
                            onClick={handleClose}
                        ></button>
                    </div>
                    <div className="modal-body">
                        {errors.general && (
                            <div className="alert alert-danger" role="alert">
                                <i className="bi bi-exclamation-triangle-fill me-2"></i>
                                {errors.general}
                            </div>
                        )}

                        <form onSubmit={handleSubmit}>
                            <div className="mb-3">
                                <label htmlFor="name" className="form-label">
                                    {LOGIN_TEXTS.name} <span className="text-danger">*</span>
                                </label>
                                <input
                                    type="text"
                                    className={`form-control ${errors.name ? 'is-invalid' : ''}`}
                                    id="name"
                                    placeholder="Enter your name"
                                    value={name}
                                    onChange={(e) => {
                                        setName(e.target.value);
                                        if (errors.name) setErrors({ ...errors, name: '' });
                                    }}
                                    disabled={isLoading}
                                />
                                {errors.name && <div className="invalid-feedback">{errors.name}</div>}
                            </div>
                            <div className="mb-4">
                                <label htmlFor="mobileNumber" className="form-label">
                                    {LOGIN_TEXTS.mobileNumber} <span className="text-danger">*</span>
                                </label>
                                <input
                                    type="text"
                                    className={`form-control ${errors.mobileNumber ? 'is-invalid' : ''}`}
                                    id="mobileNumber"
                                    placeholder="Enter your 10-digit mobile number"
                                    value={mobileNumber}
                                    onChange={(e) => {
                                        const value = e.target.value.replace(/\D/g, '');
                                        setMobileNumber(value);
                                        if (errors.mobileNumber) setErrors({ ...errors, mobileNumber: '' });
                                    }}
                                    maxLength="10"
                                    disabled={isLoading}
                                />
                                {errors.mobileNumber && <div className="invalid-feedback">{errors.mobileNumber}</div>}
                            </div>
                            <button
                                type="submit"
                                className="btn btn-primary w-100 py-2"
                                disabled={isLoading}
                            >
                                {isLoading ? (
                                    <>
                                        <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                                        {LOGIN_TEXTS.loggingIn}
                                    </>
                                ) : (
                                    <>
                                        <i className="bi bi-box-arrow-in-right me-2"></i>
                                        {LOGIN_TEXTS.login}
                                    </>
                                )}
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LoginModal;
