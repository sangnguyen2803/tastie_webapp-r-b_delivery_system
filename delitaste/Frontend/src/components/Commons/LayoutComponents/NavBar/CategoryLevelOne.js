import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faChevronRight } from '@fortawesome/fontawesome-free-solid';
import { Link } from 'react-router-dom';
import './CategoryLevelOne.css'

function CategoryLevelOne({categoryContent, setCategoryContent}) {
    if (categoryContent.enable) {
        return (
            <div className="category-display">
                <div className='left-category-dropdown'>
                    <div className="category-level-one">
                        <span className="category-name">Accessories/Jewels&Gems</span>
                        <FontAwesomeIcon className="nav-icon-surfix" icon={faChevronRight} />
                    </div>
                    <div className="category-level-one">
                        <span className="category-name">Electronic devices/Appliance</span>
                    </div>
                    <div className="category-level-one">
                        <span className="category-name">Accessories/Jewels</span>
                    </div>
                    <div className="category-level-one">
                        <span className="category-name">Accessories/Jewels</span>
                    </div>
                
                </div>
            </div>
        );
    }
    else{
        return (
            <>
                
            </>
        );
    }
};

export default CategoryLevelOne;