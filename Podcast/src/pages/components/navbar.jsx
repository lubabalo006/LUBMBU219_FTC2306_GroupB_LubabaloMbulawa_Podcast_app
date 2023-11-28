import { useState } from "react";
import React from "react";
import "./styles/navbar.css"

export default function Navbar() {

    const [darkMode, setDarkMode] = useState(false);

    const toggleDarkMode = () => {
        setDarkMode(!darkMode);
    };

//<Main />
    return (
        
        <div className={darkMode ? "dark-mode" : "light-mode"}>
            <div className="theme">
                <button onClick={toggleDarkMode}>
                {darkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
                </button>
            </div>
            

            
        </div>
    )
}