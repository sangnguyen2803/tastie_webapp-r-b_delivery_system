import React, { useState, useEffect } from 'react';
import Fragment from 'react';
import './Toolbar.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronUp, faFileAlt } from '@fortawesome/fontawesome-free-solid';



function ToolBar(props) {
    return (
        <>
            <div className="tool-bar-container">
                <div className="tool-bar-go-top-wrapper">
                    <div className="go-top-icon-button" onClick={() => { window.scrollTo({top: 0, behavior: "smooth"});}}>
                        <FontAwesomeIcon icon={faChevronUp} />
                    </div>
                    <div className="go-top-icon-button" onClick={() => { window.scrollTo({top: 0, behavior: "smooth"});}}>
                        <FontAwesomeIcon icon={faFileAlt} />
                    </div>
                    
                </div>

            </div>
        </>
    )
}

export default ToolBar;