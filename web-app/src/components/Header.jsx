import React from 'react';
import './header.css';
import Waves from './Waves';
import logo from '../assets/logo.png';

function Header() {
    return (
      <>
        <header className="header text-capitalize">
            <div className="container">
                <nav className="nav">
                    <div className="nav_data">
                        <a href="#" className="nav_logo p-1 text_purple">
                        <div className='d-flex align-items-center'>
                            <img src={logo} height={50} className='me-2' />
                            <h4 className="logo_text text-uppercase fw-bold" style={{ marginTop: '10px' }}> 
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
                                <a href="/" className="nav_link active_link">Home</a>
                            </li>
                            <li>
                                <a href="aboutus" className="nav_link">About Us</a>
                            </li>
                            <li>
                                <a href="faqs" className="nav_link">Faqs</a>
                            </li>
                            <li>
                                <a href="contact" className="nav_link">Contacts</a>
                            </li>
                            AUTHENTIFICATED
                            <li>
                                <a href="/shipTrack" className="nav_link">Ship and Track</a>
                            </li>
                            <li>
                                <a href="analytics" className="nav_link">Analytics</a>
                            </li>
                        </ul>
                    </div>
                </nav>
            </div>
        </header>
        <Waves />
        <div className="modal fade" id="ship" >
          <div className="modal-dialog modal-dialog-centered modal-lg">
            <div className="modal-content rounded-4 p-4">
              <div className="modal-header">
                <h5 className="modal-title">Map Modal</h5>
                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>
              <div className="modal-body">
                <div id="mapContainer" style={{ height: '300px' }}></div>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
              </div>
            </div>
          </div>
        </div>
        <div className="modal fade" id="route" >
          <div className="modal-dialog modal-dialog-centered modal-lg">
            <div className="modal-content rounded-4 p-4">
              <div className="modal-header">
                <h5 className="modal-title">Map Modal</h5>
                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>
              <div className="modal-body">
                <div id="mapContainer" style={{ height: '300px' }}></div>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
              </div>
            </div>
          </div>
        </div>
      </>
        
    );
}

export default Header;
