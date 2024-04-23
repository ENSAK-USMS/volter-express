import React from 'react'

function Modal() {
    return (
        <div>
            <div className="container d-flex justify-content-center align-items-center vh-100">
                <div className="card shadow p-5 rounded col-7 rounded-4">
                    <h2 className="text-center mb-4">Sign Up</h2>
                    <form>
                        <div className="row">
                        <div className="col-md-6">
                                <div className="mb-3">
                                    <label htmlFor="fname" className="form-label">First Name</label>
                                    <input type="text" className="form-control" id="fname" placeholder="Yourfirst Name" />
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className="mb-3">
                                    <label htmlFor="lname" className="form-label">Last Name</label>
                                    <input type="text" className="form-control" id="lname" placeholder="Your Last Name" />
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className="mb-3">
                                    <label htmlFor="username" className="form-label">Username</label>
                                    <input type="text" className="form-control" id="username" placeholder="Your username" />
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className="mb-3">
                                    <label htmlFor="email" className="form-label">Email address</label>
                                    <input type="email" className="form-control" id="email" placeholder="name@example.com" />
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className="mb-3">
                                    <label htmlFor="password" className="form-label">Password</label>
                                    <input type="password" className="form-control" id="password" />
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className="mb-3">
                                    <label htmlFor="phone" className="form-label">Phone</label>
                                    <input type="text" className="form-control" id="phone" placeholder="Your Phone Number" />
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className="mb-3">
                                    <label htmlFor="streetName" className="form-label">Street Name</label>
                                    <input type="text" className="form-control" id="streetName" placeholder="Your Street Name" />
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className="mb-3">
                                    <label htmlFor="city" className="form-label">City</label>
                                    <input type="text" className="form-control" id="city" placeholder="Your City" />
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className="mb-3">
                                    <label htmlFor="country" className="form-label">Country</label>
                                    <input type="text" className="form-control" id="country" placeholder="Your Country" />
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className="mb-3">
                                    <label className="form-label">Localisation</label>
                                    <div className="input-group">
                                        <input type="text" className="form-control red" id="location" placeholder="Votre localisation" disabled />
                                        <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#mapModal">Sélectionner <i className="ri-road-map-line"></i></button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="d-grid mb-3">
                            <button type="submit" className="btn btn-primary">Sign Up</button>
                        </div>
                    </form>
                    <div className="text-center">
                        <p className="mb-0">Already have an account? <a href="login">Login</a></p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Modal