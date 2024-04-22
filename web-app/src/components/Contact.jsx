import React from 'react';
import contact from '../assets/contact.svg'

const Contact = () => {
    return (
        <div className="container d-flex justify-content-center align-items-center vh-80">
            <div className="card card-shadow content p-5 rounded-4">
                <div className="row">
                    <div className="col-md-6">
                        <img src={contact} className="card-img-top" alt="Contact" />
                    </div>
                    <div className="col-md-6">
                        <div className="card-body">
                            <h2 className="card-title">Contact Us</h2>
                            <p className="card-text">Feel free to reach out to us for any inquiries or questions you may have.</p>
                            <ul className="list-group list-group-flush rounded-4 =">
                                <li className="list-group-item p-4">Phone: +1234567890</li>
                                <li className="list-group-item p-4">Email: info@example.com</li>
                                <li className="list-group-item p-4">Address: 123 Main Street, City, Country</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Contact;
