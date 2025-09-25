export const FORM_REGEX = {
  email: /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/,
  mobile: /^\d{10}$/,
};
export const FORM_FIELDS = {
  name: {
    label: 'Full Name',
    id: 'name',
    name: 'name',
    placeholder: 'Enter your name',
    icon: 'bi bi-person',
  },
  age: {
    label: 'Age',
    id: 'age',
    name: 'age',
    placeholder: 'Enter your age',
    icon: 'bi bi-calendar3',
  },
  mobileNumber: {
    label: 'Phone Number',
    id: 'mobileNumber',
    name: 'mobileNumber',
    placeholder: 'Enter your number',
    icon: 'bi bi-telephone',
  },
  email: {
    label: 'Email ID',
    id: 'email',
    name: 'email',
    placeholder: 'Enter your email',
    icon: 'bi bi-envelope',
  },
  companyName: {
    label: 'Working Company Name',
    id: 'companyName',
    name: 'companyName',
    placeholder: 'Working company name',
    icon: 'bi bi-building',
  },
  jobTitle: {
    label: 'Job Title',
    id: 'jobTitle',
    name: 'jobTitle',
    placeholder: 'Job title',
    icon: 'bi bi-briefcase',
  },
  address: {
    label: 'Address',
    id: 'address',
    name: 'address',
    placeholder: 'Enter your address',
    icon: 'bi bi-house-door',
  },
  benefit_company: {
    label: 'Benefits for the Company',
    id: 'benefit_company',
    name: 'benefit_company',
    placeholder: 'Enter benefits for the company',
    icon: 'bi bi-building-check',
  },
  benefit_industry: {
    label: 'Benefits for the Industry',
    id: 'benefit_industry',
    name: 'benefit_industry',
    placeholder: 'Enter benefits for the industry',
    icon: 'bi bi-building-check',
  },
};
// src/constants/formMessages.js

export const FORM_ERRORS = {
  nameRequired: 'Full name is required',
  ageRequired: 'Age is required',
  ageInvalid: 'Please enter a valid age',
  mobileRequired: 'Phone number is required',
  mobileInvalid: 'Please enter a valid 10-digit phone number',
  emailRequired: 'Email is required',
  emailInvalid: 'Please enter a valid email address',
  companyRequired: 'Company name is required',
  jobTitleRequired: 'Job title is required',
  addressRequired: 'Address is required',
};

export const FORM_STATUS = {
  success: {
    title: 'Successfully Submitted!',
    message: "Thank you for providing your information. We'll be in touch soon.",
    button: 'Submit Another Response',
  },
  already: {
    title: 'Already Submitted!',
    message: 'This account has already submitted information.',
    button: 'Try Another Account',
  },
};

export const FORM_MISC = {
  infoSecure: 'Your information is secure and will never be shared',
};
