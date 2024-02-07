import React, { useState } from 'react';
import axios from 'axios';
import './EventRegistration.css';

const EventRegistration = () => {
    // Updated initial form values to match backend expectations
    const initialValues = {
        first_name: '',
        last_name: '',
        email: '',
        phone: '',
        job_title: '',
        company_name: '',
        company_size: '',
        subject: ''
    };

    // State variables
    const [formValues, setFormValues] = useState(initialValues);
    const [formErrors, setFormErrors] = useState({});
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [feedback, setFeedback] = useState('');
    const [status, setStatus] = useState('');

    // Form validation function updated to include all fields
    const validate = (values) => {
        const errors = {};
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;

        if (!values.first_name) {
            errors.first_name = 'First name is required!';
        }
        if (!values.last_name) {
            errors.last_name = 'Last name is required!';
        }
        if (!values.email) {
            errors.email = 'Email is required!';
        } else if (!regex.test(values.email)) {
            errors.email = 'This is not a valid email format!';
        }
        if (!values.phone) {
            errors.phone = 'Phone is required!';
        }
        if (!values.job_title) {
            errors.job_title = 'Job title is required!';
        }
        if (!values.company_name) {
            errors.company_name = 'Company name is required!';
        }
        if (!values.company_size) {
            errors.company_size = 'Company size is required!';
        }
        if (!values.subject) {
            errors.subject = 'Subject is required!';
        }

        return errors;
    };

    // Form input change handler
    const onChangeHandler = (e) => {
        const { name, value } = e.target;
        setFormValues({ ...formValues, [name]: value });
    };

    // Form submit handler
    const handleSubmit = async (e) => {
        e.preventDefault();
        const errors = validate(formValues);
        setFormErrors(errors);

        // Check if there are no errors before submitting
        if (Object.keys(errors).length === 0) {
            try {
                const response = await axios.post('http://127.0.0.1:5000/api/v1/events-registration', formValues);
                if (response.data.success) {
                    setFeedback('You have successfully registered for this event!');
                    setStatus('success');
                } else {
                    setFeedback('An error occurred: ' + response.data.error);
                    setStatus('error');
                }
            } catch (error) {
                console.log(error);
                setFeedback('An error occurred while sending data');
                setStatus('error');
            }
        }

        setIsSubmitted(true);
    };

    // Render the component.
    return (
        <div className="section">
            <div className="form-container">
                <h1>Event Attendee Registration</h1>
                <form onSubmit={handleSubmit}>
                    {/* First Name Input */}
                    <div className="input-container">
                        <label htmlFor="first_name">First Name</label>
                        <input
                            id="first_name"
                            type="text"
                            name="first_name"
                            value={formValues.first_name}
                            onChange={onChangeHandler}
                        />
                        <p style={{ color: 'red', fontWeight: 'bold' }}>
                            {formErrors.first_name}
                        </p>
                    </div>

                    {/* Last Name Input */}
                    <div className="input-container">
                        <label htmlFor="last_name">Last Name</label>
                        <input
                            id="last_name"
                            type="text"
                            name="last_name"
                            value={formValues.last_name}
                            onChange={onChangeHandler}
                        />
                        <p style={{ color: 'red', fontWeight: 'bold' }}>
                            {formErrors.last_name}
                        </p>
                    </div>

                    {/* Email Input */}
                    <div className="input-container">
                        <label htmlFor="email">Email</label>
                        <input
                            id="email"
                            type="text"
                            name="email"
                            value={formValues.email}
                            onChange={onChangeHandler}
                        />
                        <p style={{ color: 'red', fontWeight: 'bold' }}>
                            {formErrors.email}
                        </p>
                    </div>

                    {/* Phone Input */}
                    <div className="input-container">
                        <label htmlFor="phone">Phone</label>
                        <input
                            id="phone"
                            type="text"
                            name="phone"
                            value={formValues.phone}
                            onChange={onChangeHandler}
                        />
                        <p style={{ color: 'red', fontWeight: 'bold' }}>
                            {formErrors.phone}
                        </p>
                    </div>

                    {/* Job Title Input */}
                    <div className="input-container">
                        <label htmlFor="job_title">Job Title</label>
                        <input
                            id="job_title"
                            type="text"
                            name="job_title"
                            value={formValues.job_title}
                            onChange={onChangeHandler}
                        />
                    </div>

                    {/* Company Name Input */}
                    <div className="input-container">
                        <label htmlFor="company_name">Company Name</label>
                        <input
                            id="company_name"
                            type="text"
                            name="company_name"
                            value={formValues.company_name}
                            onChange={onChangeHandler}
                        />
                    </div>

                    {/* Company Size Input */}
                    <div className="input-container">
                        <label htmlFor="company_size">Company Size</label>
                        <input
                            id="company_size"
                            type="text"
                            name="company_size"
                            value={formValues.company_size}
                            onChange={onChangeHandler}
                        />
                    </div>

                    {/* Subject Input */}
                    <div className="input-container">
                        <label htmlFor="subject">Subject</label>
                        <select
                            id="subject"
                            name="subject"
                            value={formValues.subject}
                            onChange={onChangeHandler}
                        >
                            <option value="">Select a subject</option>
                            <option value="React: From First Steps to Professional">React: From First Steps to Professional</option>
                            <option value="A Tour of React Design Patterns">A Tour of React Design Patterns</option>
                            <option value="Web Components">Web Components</option>
                            <option value="Build a Fullstack App from Scratch with Flask and React">Build a Fullstack App from Scratch with Flask and React</option>
                        </select>
                        <p style={{ color: 'red', fontWeight: 'bold' }}>
                            {formErrors.subject}
                        </p>
                    </div>

                    {/* Submit Button */}
                    <div className="btn-section">
                        <button type="submit">Join Now</button>
                    </div>

                    {/* Feedback Message */}
                    {feedback && (
                        <div className={`feedback ${status}`}>{feedback}</div>
                    )}
                </form>
            </div>
        </div>
    );
};

export default EventRegistration;
