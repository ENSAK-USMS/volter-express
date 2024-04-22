import React from 'react';
import logo from '../assets/logo.png'

const AboutUs = () => {
    return (
<div className="container d-flex justify-content-center align-items-center mb-5 mt-4">
            <div className="card card-shadow content p-5 rounded-4">
                <div className="card-body">
                    <h2 className="card-title fw-bold mb-5">About FastX AU</h2>
                    <div className="row">
                        <div className="col-md-6">
                            <p className="card-text mb-4 text-justify">
                                FastX AU is a technology company dedicated to providing innovative solutions for businesses and individuals alike. Our team of experts is committed to delivering high-quality products and services that meet the diverse needs of our customers.
                            </p>
                            <p className="card-text mb-4 text-justify">
                                At FastX AU, we believe in the power of technology to drive positive change and improve lives. We are passionate about pushing the boundaries of what's possible and creating solutions that make a difference.
                            </p>
                        </div>
                        <div className="col-md-6 text-center">
                            <img src={logo} alt="FastX AU Logo" height={200} />
                        </div>
                    </div>
                    <p className="card-text mb-4 text-justify">
                        Our mission is to empower our clients with cutting-edge technology and exceptional support, helping them achieve their goals and succeed in a rapidly evolving digital world. We strive to build long-lasting relationships with our clients based on trust, integrity, and mutual respect.
                    </p>
                    <p className="card-text mb-4 text-justify">
                        Join us on our journey as we continue to innovate, inspire, and make a lasting impact on the world. Together, we can shape the future and create a better tomorrow for generations to come.
                    </p>
                </div>
            </div>
        </div>
    );
}

export default AboutUs;
