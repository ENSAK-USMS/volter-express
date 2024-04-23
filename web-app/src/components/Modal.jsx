import React from 'react'

function Modal() {
    return (
        <div>
            <div className="modal fade" id="send">
                <div className="modal-dialog modal-dialog-centered modal-xl">
                    <div className="modal-content rounded-4 p-4">
                        <div className="modal-header">
                            <h5 className="modal-title">Send Product</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <form>
                                <div className="row">
                                    <div className="col-md-6">
                                        <div className="mb-3">
                                            <label htmlFor="name" className="form-label">Name</label>
                                            <input type="text" className="form-control" id="name" placeholder="Your Name" />
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
                                    <div className="col-md-6">
                                        <div className="mb-3">
                                            <label htmlFor="quantity" className="form-label">Quantity</label>
                                            <input type="number" className="form-control" id="quantity" placeholder="Quantity" />
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="mb-3">
                                            <label htmlFor="weight" className="form-label">Weight</label>
                                            <input type="number" className="form-control" id="weight" placeholder="Weight" />
                                        </div>
                                    </div>
                                </div>
                            </form>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button type="button" className="btn btn-primary">Send</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Modal