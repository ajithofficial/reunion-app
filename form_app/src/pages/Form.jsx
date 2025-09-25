import React, { useState, useCallback } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../AppForm.css';
import { useDispatch, useSelector } from 'react-redux';
import { clearInputDatas, formInput, postFormData } from '../redux/formSlice';
import { FORM_ERRORS, FORM_STATUS, FORM_MISC, FORM_FIELDS, FORM_REGEX } from '../constants/formMessages';
import LoginModal from './Login';
import { FormInput, FormTextArea } from '../components/FormFields';

const Form = () => {

  const dispatch = useDispatch();
  const formData = useSelector(store => store.formData);
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [submitStatus, setSubmitStatus] = useState("");

  const handleChange = useCallback((e) => {
    const { name, value } = e.target;
    dispatch(formInput({ name, value }));
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  }, [dispatch, errors]);

  const validateForm = useCallback(() => {
    let formErrors = {};
    if (!formData?.name) formErrors.name = FORM_ERRORS.nameRequired;
    if (!formData?.age) formErrors.age = FORM_ERRORS.ageRequired;
    else if (isNaN(formData?.age) || formData?.age < 1 || formData?.age > 120)
      formErrors.age = FORM_ERRORS.ageInvalid;
    if (!formData?.mobileNumber) formErrors.mobileNumber = FORM_ERRORS.mobileRequired;
    else if (!FORM_REGEX.mobile.test(formData?.mobileNumber))
      formErrors.number = FORM_ERRORS.mobileInvalid;
    if (!formData?.email) formErrors.email = FORM_ERRORS.emailRequired;
    else if (!FORM_REGEX.email.test(formData?.email))
      formErrors.email = FORM_ERRORS.emailInvalid;
    if (!formData?.companyName) formErrors.companyName = FORM_ERRORS.companyRequired;
    if (!formData?.jobTitle) formErrors.jobTitle = FORM_ERRORS.jobTitleRequired;
    if (!formData?.address) formErrors.address = FORM_ERRORS.addressRequired;
    setErrors(formErrors);
    return Object.keys(formErrors).length === 0;
  }, [formData]);

  const handleSubmit = useCallback(async (e) => {
    e.preventDefault();
    if (validateForm()) {
      const repos = await dispatch(postFormData(formData));
      if (repos.payload?.message === "User with this Mobile Number already exists") {
        setSubmitStatus("already");
      } else {
        setSubmitStatus("success");
      }
      setSubmitted(true);
    }
  }, [validateForm, dispatch, formData]);

  const resetForm = useCallback(() => {
    dispatch(clearInputDatas());
    setErrors({});
    setSubmitted(false);
  }, [dispatch]);

  return (
    <div className="container my-5">
      <div className="row justify-content-center">
        <div className="col-md-10 col-lg-8">
          <div className="card shadow-lg border-0 invitation-card">
            <div className="card-header invitation-header text-center py-4">
              <h2 className="card-title mb-1 text-white">Personal Information</h2>
              <p className="invitation-subtitle mb-0">We'd love to know more about you</p>
            </div>

            <div className="card-body p-5">
              {submitted ? (
                submitStatus === "success" ? (
                  <div className="text-center py-4">
                    <div className="success-icon mb-3">
                      <svg xmlns="http://www.w3.org/2000/svg" width="80" height="80" fill="currentColor" className="bi bi-check-circle-fill text-success" viewBox="0 0 16 16">
                        <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z" />
                      </svg>
                    </div>
                    <h3 className="text-success mb-3">{FORM_STATUS.success.title}</h3>
                    <p className="text-muted mb-4">{FORM_STATUS.success.message}</p>
                    <button className="btn btn-outline-primary btn-invitation" onClick={resetForm}>
                      {FORM_STATUS.success.button}
                    </button>
                  </div>
                ) : (
                  <div className="text-center py-4">
                    <div className="success-icon mb-3">
                      <svg xmlns="http://www.w3.org/2000/svg" width="80" height="80" fill="currentColor" className="bi bi-exclamation-circle-fill text-warning" viewBox="0 0 16 16">
                        <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM7 4a1 1 0 1 0 2 0 1 1 0 0 0-2 0zm.93 2.412a.5.5 0 0 0-.86.5l.35 1.25a.25.25 0 0 0 .48 0l.35-1.25a.5.5 0 0 0-.45-.5z" />
                      </svg>
                    </div>
                    <h3 className="text-warning mb-3">{FORM_STATUS.already.title}</h3>
                    <p className="text-muted mb-4">{FORM_STATUS.already.message}</p>
                    <button className="btn btn-outline-primary btn-invitation" onClick={resetForm}>
                      {FORM_STATUS.already.button}
                    </button>
                  </div>
                )
              ) :
                (
                  <form onSubmit={handleSubmit}>
                    <div className="row">
                      <div className="col-md-6">
                        <FormInput
                          type="text"
                          id={FORM_FIELDS.name.id}
                          name={FORM_FIELDS.name.name}
                          value={formData?.name || ""}
                          onChange={handleChange}
                          placeholder={FORM_FIELDS.name.label}
                          icon={FORM_FIELDS.name.icon}
                          error={errors.name}
                        />
                      </div>

                      <div className="col-md-6">
                        <FormInput
                          type="number"
                          id={FORM_FIELDS.age.id}
                          name={FORM_FIELDS.age.name}
                          value={formData?.age || ""}
                          onChange={handleChange}
                          placeholder={FORM_FIELDS.age.label}
                          icon={FORM_FIELDS.age.icon}
                          error={errors.age}
                        />
                      </div>
                    </div>

                    <div className="row">
                      <div className="col-md-6">
                        <FormInput
                          type="tel"
                          id={FORM_FIELDS.mobileNumber.id}
                          name={FORM_FIELDS.mobileNumber.name}
                          value={formData?.mobileNumber || ""}
                          onChange={handleChange}
                          placeholder={FORM_FIELDS.mobileNumber.label}
                          icon={FORM_FIELDS.mobileNumber.icon}
                          error={errors.mobileNumber}
                          maxLength={10}
                        />
                      </div>

                      <div className="col-md-6">
                        <FormInput
                          type="email"
                          id={FORM_FIELDS.email.id}
                          name={FORM_FIELDS.email.name}
                          value={formData?.email || ""}
                          onChange={handleChange}
                          placeholder={FORM_FIELDS.email.label}
                          icon={FORM_FIELDS.email.icon}
                          error={errors.email}
                        />
                      </div>
                    </div>

                    {/* <div className="mb-4">
                      <label htmlFor="mobileNumber" className="form-label invitation-label">Phone Number</label>
                      <div className="input-group">
                        <span className="input-group-text invitation-input-icon">
                          <i className="bi bi-telephone"></i>
                        </span>
                        <input
                          type="tel"
                          className={`form-control invitation-input`}
                          id="mobileNumber"
                          name="mobileNumber"
                          value={formData?.mobileNumber || ""}
                          onChange={handleChange}
                          placeholder="Enter your number"
                        />
                      </div>
                      {errors.mobileNumber && <div className="invalid-feedback d-block">{errors.mobileNumber}</div>}
                    </div> */}

                    <FormInput
                      type="text"
                      id={FORM_FIELDS.companyName.id}
                      name={FORM_FIELDS.companyName.name}
                      value={formData?.companyName || ""}
                      onChange={handleChange}
                      placeholder={FORM_FIELDS.companyName.label}
                      icon={FORM_FIELDS.companyName.icon}
                      error={errors.companyName}
                    />

                    <FormInput
                      type="text"
                      id={FORM_FIELDS.jobTitle.id}
                      name={FORM_FIELDS.jobTitle.name}
                      value={formData?.jobTitle || ''}
                      onChange={handleChange}
                      placeholder={FORM_FIELDS.jobTitle.label}
                      icon={FORM_FIELDS.jobTitle.icon}
                      error={errors.jobTitle}
                    />

                    <FormTextArea
                      id={FORM_FIELDS.address.id}
                      name={FORM_FIELDS.address.name}
                      value={formData?.address || ""}
                      onChange={handleChange}
                      placeholder={FORM_FIELDS.address.label}
                      icon={FORM_FIELDS.address.icon}
                      error={errors.address}
                      rows={3}
                    />

                    <div className="mb-4">
                      <FormTextArea
                      id={FORM_FIELDS.benefit_company.id}
                      name={FORM_FIELDS.benefit_company.name}
                      value={formData?.benefit_company || ""}
                      onChange={handleChange}
                      placeholder={FORM_FIELDS.benefit_company.label}
                      icon={FORM_FIELDS.benefit_company.icon}
                      // error={errors.address}
                      rows={3}
                    />
                    </div>

                    <div className="mb-4">
                      <FormTextArea
                      id={FORM_FIELDS.benefit_industry.id}
                      name={FORM_FIELDS.benefit_industry.name}
                      value={formData?.benefit_industry || ""}
                      onChange={handleChange}
                      placeholder={FORM_FIELDS.benefit_industry.label}
                      icon={FORM_FIELDS.benefit_industry.icon}
                      // error={errors.address}
                      rows={3}
                    />
                    </div>

                    <div className="d-grid mt-4">
                      <button type="submit" className="btn btn-lg btn-invitation">Submit Information</button>
                    </div>
                  </form>
                )}
            </div>

            <div className="card-footer invitation-footer text-center py-3">
              <p className="mb-2">{FORM_MISC.infoSecure}</p>
              <button
                type="button"
                className="btn btn-outline-secondary px-4"
                data-bs-toggle="modal"
                data-bs-target="#loginModal"
              >
                <i className="bi bi-box-arrow-in-right me-2"></i> Login
              </button>
              <LoginModal />
            </div>
          </div>
        </div>
      </div>

    </div>
  );
};

export default Form;