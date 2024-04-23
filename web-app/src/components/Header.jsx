import React from 'react';
import './header.css';
import Waves from './Waves';
import logo from '../assets/logo.png';
import  useAuth  from '../hooks/useAuth';

function Header() {
  const { isAuthenticated, isInitialized } = useAuth();
  console.log(isInitialized);
    return (
      <>
        <header className="header text-capitalize">
          <div className="container">
            <nav className="nav">
              <div className="nav_data">
                <a href="#" className="nav_logo p-1 text_purple">
                  <div className="d-flex align-items-center">
                    <img src={logo} height={50} className="me-2" />
                    <h4
                      className="logo_text text-uppercase fw-bold"
                      style={{ marginTop: "10px" }}
                    >
                      FASTX
                    </h4>
                  </div>
                </a>

                <div className="nav_toggle" id="nav-toggle">
                  <i className="ri-menu-line nav_toggle-menu"></i>
                  <i className="ri-close-line nav_toggle-close"></i>
                </div>
              </div>

              <div className="nav_menu" id="nav-menu">
                <ul className="nav_list">
                  <li>
                    <a href="/" className="nav_link">
                      Home
                    </a>
                  </li>
                  <li>
                    <a href="aboutus" className="nav_link">
                      About Us
                    </a>
                  </li>
                  <li>
                    <a href="faqs" className="nav_link">
                      Faqs
                    </a>
                  </li>
                  <li>
                    <a href="contact" className="nav_link">
                      Contacts
                    </a>
                  </li>
                  {isAuthenticated && (
                    <>
                      <li>
                        <a href="products" className="nav_link">
                          Products
                        </a>
                      </li>
                      <li>
                        <a href="shipTrack" className="nav_link">
                          Orders
                        </a>
                      </li>
                      <li>
                        <a href="analytics" className="nav_link">
                          Analytics
                        </a>
                      </li>
                    </>
                  )}
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
