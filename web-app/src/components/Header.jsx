import React from 'react';
import './header.css';
import Waves from './Waves';

function Header() {
    return (
      <>
        <header className="header text-capitalize">
            <div className="container">
                <nav className="nav">
                    <div className="nav_data">
                        <a href="#" className="nav_logo p-1 text_purple">
                            <h4 className="logo_text text-uppercase fw-bold" style={{ marginTop: '5px' }}>FASTX</h4>
                        </a>

                        <div className="nav_toggle" id="nav-toggle">
                            <i className="ri-menu-line nav_toggle-menu"></i>
                            <i className="ri-close-line nav_toggle-close"></i>
                        </div>
                    </div>

                    <div className="nav_menu" id="nav-menu">
                        <ul className="nav_list">
                            <li>
                                <a href="#" className="nav_link active_link">Home</a>
                            </li>
                            <li>
                                <a href="#" className="nav_link">Ship and Track</a>
                            </li>
                            <li>
                                <a href="#" className="nav_link">Send a Shipment</a>
                            </li>
                            <li>
                                <a href="#" className="nav_link">Track Shipment</a>
                            </li>
                        </ul>
                    </div>
                </nav>
            </div>
        </header>
        <Waves />
      </>
        
    );
}

export default Header;
