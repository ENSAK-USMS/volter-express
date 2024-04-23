import React, { useState } from 'react';
import blueTruckImage from '../assets/bluetruck.jpg';

const SendProductModal = ({ data }) => {
    const [step, setStep] = useState(1);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        phone: '',
        streetName: '',
        city: '',
        country: '',
        productId: '',
        location: '',
        quantity: '',
    });

    const nextStep = () => {
        setStep(step + 1);
    };

    const prevStep = () => {
        setStep(step - 1);
    };

    const handleChange = (e) => {
        const { id, value } = e.target;
        setFormData({ ...formData, [id]: value });
    };

    const trucks = [
        { id: 1 },
        { id: 2 },
        { id: 3 },
        // Add more trucks as needed
    ];

    return (
        <div className="modal fade" id="send">
            <div className="modal-dialog modal-dialog-centered modal-lg">
                <div className="modal-content rounded-4 p-4">
                    <div className="modal-header">
                        <h4 className="modal-title">Place Order</h4>
                        <button
                            type="button"
                            className="btn-close"
                            data-bs-dismiss="modal"
                            aria-label="Close"
                        ></button>
                    </div>
                    <div className="modal-body">
                        {step === 1 && (
                            <form>
                                <div className="row">
                                    <div className="col-md-6">
                                        <div className="mb-3">
                                            <label htmlFor="name" className="form-label">
                                                Name
                                            </label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                id="name"
                                                placeholder="Your Name"
                                            />
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="mb-3">
                                            <label htmlFor="email" className="form-label">
                                                Email address
                                            </label>
                                            <input
                                                type="email"
                                                className="form-control"
                                                id="email"
                                                placeholder="name@example.com"
                                            />
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="mb-3">
                                            <label htmlFor="password" className="form-label">
                                                Password
                                            </label>
                                            <input
                                                type="password"
                                                className="form-control"
                                                id="password"
                                            />
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="mb-3">
                                            <label htmlFor="phone" className="form-label">
                                                Phone
                                            </label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                id="phone"
                                                placeholder="Your Phone Number"
                                            />
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="mb-3">
                                            <label htmlFor="streetName" className="form-label">
                                                Street Name
                                            </label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                id="streetName"
                                                placeholder="Your Street Name"
                                            />
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="mb-3">
                                            <label htmlFor="city" className="form-label">
                                                City
                                            </label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                id="city"
                                                placeholder="Your City"
                                            />
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="mb-3">
                                            <label htmlFor="country" className="form-label">
                                                Country
                                            </label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                id="country"
                                                placeholder="Your Country"
                                            />
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="mb-3">
                                            <label className="form-label">Localisation</label>
                                            <div className="input-group">
                                                <input
                                                    type="text"
                                                    className="form-control red"
                                                    id="location"
                                                    placeholder="Votre localisation"
                                                    disabled
                                                />
                                                <button
                                                    type="button"
                                                    className="btn btn-primary"
                                                    data-bs-toggle="modal"
                                                    data-bs-target="#mapModal"
                                                >
                                                    Sélectionner <i className="ri-road-map-line"></i>
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </form>
                        )}
                        {step === 2 && (
                            <form>
                                <div className="mb-3">
                                    <label htmlFor="productId" className="form-label">
                                        Product ID
                                    </label>
                                    <select
                                        className="form-select"
                                        id="productId"
                                        value={formData.productId}
                                        onChange={handleChange}
                                    >
                                        <option>Select Product ID</option>
                                        {data.map(item => (
                                            <option key={item.id} value={item.id}>{item.id}</option>
                                        ))}
                                    </select>
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="quantity" className="form-label">
                                        Quantity
                                    </label>
                                    <input
                                        type="number"
                                        className="form-control"
                                        id="quantity"
                                        value={formData.quantity}
                                        onChange={handleChange}
                                        placeholder="Enter Quantity"
                                    />
                                </div>
                            </form>
                        )}
                        {step === 3 && (
                            <form>
                                <h5>Preferred Time Slots</h5>
                                <div className="form-group d-flex my-3">
                                    <div className="form-check me-auto">
                                        <input
                                            className="form-check-input"
                                            type="checkbox"
                                            value=""
                                            id="morning"
                                        />
                                        <label className="form-check-label" htmlFor="morning">
                                            Morning
                                        </label>
                                    </div>
                                    <div className="form-check me-auto">
                                        <input
                                            className="form-check-input"
                                            type="checkbox"
                                            value=""
                                            id="afternoon"
                                        />
                                        <label className="form-check-label" htmlFor="afternoon">
                                            Afternoon
                                        </label>
                                    </div>
                                    <div className="form-check me-auto">
                                        <input
                                            className="form-check-input"
                                            type="checkbox"
                                            value=""
                                            id="evening"
                                        />
                                        <label className="form-check-label" htmlFor="evening">
                                            Evening
                                        </label>
                                    </div>
                                    <div className="form-check me-auto">
                                        <input
                                            className="form-check-input"
                                            type="checkbox"
                                            value=""
                                            id="night"
                                        />
                                        <label className="form-check-label" htmlFor="night">
                                            Night
                                        </label>
                                    </div>
                                </div>
                                <h5>Truck Selection</h5>
                                <div className="row mt-3">
                                    {trucks.map((truck) => (
                                        <div key={truck.id} className="col-md-4 mb-3">
                                            <div className="card-shadow rounded-4 p-3">
                                                <img src={blueTruckImage} className="card-img-top" alt={`Truck ${truck.id}`} />
                                                <div className="card-footer text-center my-3">
                                                    <button type="button" className="btn btn-sm btn-primary" data-bs-toggle="modal" data-bs-target="#redtruck" data-bs-dismiss="modal">Show route</button>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </form>
                        )}
                    </div>
                    <div className="modal-footer">
                        {step !== 1 && (
                            <button
                                type="button"
                                className="btn btn-secondary"
                                onClick={prevStep}
                            >
                                Back
                            </button>
                        )}
                        {step !== 3 ? (
                            <button type="button" className="btn btn-primary" onClick={nextStep}>
                                Next
                            </button>
                        ) : (
                            <button type="button" className="btn btn-primary">
                                Send
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </div >
    );
};

export default SendProductModal;
