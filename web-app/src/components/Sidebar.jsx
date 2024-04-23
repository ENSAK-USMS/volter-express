import React from 'react'
import './sidebar.css'
import logo from '../assets/logolight.png'

function base() {
  return (
    <>
        <div className="sidebar open d-flex flex-column justify-content-between">
            <div className="logo-details">
                <div className="logo_name">
                    <img className='me-3' src={logo} height={50} />
                    FastX
                </div>
            </div>
                <ul className="nav-list flex-column justify-content-center my-auto">
                    <li>
                        <a href="#">
                            <i className="ri-dashboard-line"></i>
                            <span className="links_name">Tableau de bord</span>
                        </a>
                        <span className="tooltip">Tableau de bord</span>
                    </li>
                    <li>
                        <a href="order">
                            <i className="ri-box-1-fill"></i>
                            <span className="links_name">Order</span>
                        </a>
                        <span className="tooltip">Order</span>
                    </li>
                    <li>
                        <a href="customer">
                            <i className="ri-user-fill"></i>
                            <span className="links_name">Customer</span>
                        </a>
                        <span className="tooltip">Customer</span>
                    </li>
                    <li>
                        <a href="trucks">
                            <i className="ri-truck-fill"></i>
                            <span className="links_name">Truck</span>
                        </a>
                        <span className="tooltip">Truck</span>
                    </li>
                </ul>            
        </div>
    </>
  )
}

export default base