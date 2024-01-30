import React from "react";
import './SignInForm.css'

const SignInForm = () => {

    return (
        <>
            <div className="signInContainer">
                <form>
                    <div className="signInForm">

                        <label htmlFor="email">Email Address</label>
                        <input type="email" />

                        <label htmlFor="password">Password</label>
                        <input type="password" />

                        <button data-testid="SignIn">Sign In</button>

                    </div>
                </form>
            </div>
        </>
    )

}

export default SignInForm