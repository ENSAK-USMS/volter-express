import React from 'react'
import './sidebar.css'
import logo from '../assets/logolight.png'

function base() {
  return (
    <>
        <div class="sidebar open d-flex flex-column justify-content-between">
            <div class="logo-details">
                <div class="logo_name">
                    <img className='me-3' src={logo} height={50} />
                    FastX
                </div>
            </div>
                <ul class="nav-list flex-column justify-content-center my-auto">
                    <li>
                        <a href="#">
                            <i class="ri-dashboard-line"></i>
                            <span class="links_name">Tableau de bord</span>
                        </a>
                        <span class="tooltip">Tableau de bord</span>
                    </li>
                    <li>
                        <a href="order">
                            <i class="ri-box-1-fill"></i>
                            <span class="links_name">Order</span>
                        </a>
                        <span class="tooltip">Order</span>
                    </li>
                    <li>
                        <a href="customer">
                            <i class="ri-user-fill"></i>
                            <span class="links_name">Customer</span>
                        </a>
                        <span class="tooltip">Customer</span>
                    </li>
                    <li>
                        <a href="trucks">
                            <i class="ri-truck-fill"></i>
                            <span class="links_name">Truck</span>
                        </a>
                        <span class="tooltip">Truck</span>
                    </li>
                </ul>            
        </div>
    </>
  )
}

export default base