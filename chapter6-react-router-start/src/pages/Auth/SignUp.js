import React, { useState, useEffect } from "react";

const SignUp = () => {

    // initialValues is an object holding initial form input state.
    const initialValues = { name: "", email: "", password: "" };

    // State variables for form
    const [formValues, setFormValues] = useState(initialValues);
    const [formErrors, setFormErrors] = useState({});
    const [isSubmit, setIsSubmit] = useState(false);

    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const nameHandler = (e) => {
        setName(e.target.value)
    }

    const emailHandler = (e) => {
        setEmail(e.target.value)
    }

    const passwordHandler = (e) => {
        setPassword(e.target.value)
    }

    const onSubmitHandler = (e) => {
        e.preventDefault()
        e.preventDefault();
        setFormErrors(validateForm(formValues));
        setIsSubmit(true);
    }

    const onChangeHandler = (e) => {
        const { name, value } = e.target;
        setFormValues({ ...formValues, [name]: value });
    };

    const validateForm = (values) => {
        const errors = {};
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
        if (!values.name) {
            errors.name = "Name is required!";
        }
        return errors;
    };

    // Used to log successfully submitted values if there are
    // no form errors.
    useEffect(() => {
        if (Object.keys(formErrors).length === 0 && isSubmit) {
            console.log(formValues);
        }
    }, [formErrors]);

    return (

        <div className="signUpContainer">
            <form onSubmit={onSubmitHandler}>
                <h2>Create an Account</h2>
                <div className="signUpForm">
                    <label htmlFor="name">Name</label>
                    <p style={{ color: 'red', fontWeight: 'bold' }}>{formErrors.name}</p>
                    <input id="name" type='text' name='name' value={formValues.name} onChange={onChangeHandler} />

                    <label htmlFor="email">Email Address</label>
                    <input id='email' type='email' name='email' value={email} onChange={emailHandler} />

                    <label htmlFor="password">Password</label>
                    <input id='password' type='password' name='password' value={password} onChange={passwordHandler} />

                    <button>Register</button>

                    <div className="signUpFormOutput">
                        <span>Name: {name}</span>
                        <span>Email: {email}</span>
                        <span>Password: {password}</span>
                    </div>

                </div>
            </form>
        </div>

    )
}

export default SignUp