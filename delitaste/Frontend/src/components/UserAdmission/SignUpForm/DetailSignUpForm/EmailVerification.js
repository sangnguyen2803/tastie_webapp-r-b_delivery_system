import React, { useState, useEffect } from 'react';
import './EmailVerification.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserCheck, faEnvelope } from '@fortawesome/fontawesome-free-solid';


function EmailVerification({stepSignUpForm, setStepSignUpForm}) {
    const [verifyCode, setVerifycode] = useState({ digits: 'xxxxxx' });
    const collectVerifyDigits = (e) => {
        e.target.value = !isNaN(e.target.value) ? e.target.value : '';
        verifyCode.digits = verifyCode.digits.substr(0, parseInt(e.target.name)) + e.target.value + verifyCode.digits.substr(parseInt(e.target.name) + 1);
        console.log(verifyCode);
    };
    return (
        <div className="verify-email-section">
            <div className="form-title-wrapper">
                <FontAwesomeIcon className="form-icon" icon={faUserCheck} />
                <span className="form-title">Verify code</span>
            </div>
            <span className="verify-code-description">A verification code was sent to your gmail.</span>
            <span className="verify-code-description"> Please enter the 6-digit code already sent to <strong>sa*********25@gmail.com</strong> </span>
            <div className="verify-code-wrapper">
                <div className="verify-code-digit-wrapper">
                    <input name="0" type="text" className="numeric verify-digit-box" maxLength={1} onChange={e => collectVerifyDigits(e)} autoComplete="off" />
                </div>
                <div className="verify-code-digit-wrapper">
                    <input name="1" type="text" className="numeric verify-digit-box" maxLength={1} onChange={e => collectVerifyDigits(e)} autoComplete="off" />
                </div>
                <div className="verify-code-digit-wrapper">
                    <input name="2" type="text" className="numeric verify-digit-box" maxLength={1} onChange={e => collectVerifyDigits(e)} autoComplete="off" />
                </div>
                <div className="verify-code-digit-wrapper">
                    <input name="3" type="text" className="numeric verify-digit-box" maxLength={1} onChange={e => collectVerifyDigits(e)} autoComplete="off" />
                </div>
                <div className="verify-code-digit-wrapper">
                    <input name="4" type="text" className="numeric verify-digit-box" maxLength={1} onChange={e => collectVerifyDigits(e)} autoComplete="off" />
                </div>
                <div className="verify-code-digit-wrapper">
                    <input name="5" type="text" className="numeric verify-digit-box" maxLength={1} onChange={e => collectVerifyDigits(e)} autoComplete="off" />
                </div>
            </div>
            <div className="submit-section">
                <FontAwesomeIcon className="resend-code-icon" icon={faEnvelope} /><div className="resend-verify-code"><a>Resend verify code</a></div>

            </div>
        </div>
    );
};

export default EmailVerification;