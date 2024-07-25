import React from "react";

const Header = () => {
    return (
        <header className="pb-3 mb-4 border-bottom">
            <a href="/app/src/components/public" className="d-flex align-items-center text-dark text-decoration-none">
                <img src="/logo.svg" alt="Outlay" className="mw-100" style={{width: "15%"}} />
            </a>
        </header>
    );
};

export default Header;