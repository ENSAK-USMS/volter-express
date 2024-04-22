import React from 'react'

function ClientDashboard() {
    return (
        <>
            <section className="content container bg-transparent my-5">
                <div className="row">
                    <div className="col-md-6 d-flex flex-column">
                        <div className="row flex-fill">
                            <div className="col-md-12">
                                <div className="card-shadow p-4 rounded-4 content">
                                    <div className="home_data">
                                        <h2 className="home_title text-uppercase">FAST X</h2>
                                        <h3 className="home_subtitle">Fastest delivery service</h3>
                                        <p className="text-sm">Welcome to FAST X, your premier destination for fast and reliable delivery services. With our efficient delivery network and dedicated team.</p>
                                        <div className="input-group position-relative">
                                            <input type="text" className="form-control rounded-4 p-4" placeholder="Type a message..." id="promptText" style={{ zIndex: 0 }}></input>
                                            <button className="btn btn-primary position-absolute top-50 end-0 translate-middle-y rounded-4 me-2 p-3" type="button" title="Send message" id="sendButton">
                                                <i className="ri-eye-line me-2"></i>
                                                Track
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-12 mt-3">
                                <div className="card-shadow p-4 rounded-4 content flex-fill">
                                    <div className="login-content">
                                        <h3>Sign Up or Login</h3>
                                        <p>Welcome back! Log in to your account or sign up to get started.</p>
                                        <div className="d-grid gap-2">
                                            <a href='/login' className="btn btn-primary btn-lg">Login</a>
                                            <a href='/signup' className="btn btn-outline-primary btn-lg">Sign Up</a>
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                    <div className="col-md-6 d-flex flex-column">
                        <div className="home_img card-shadow p-4 rounded-4 content flex-fill">
                        </div>
                    </div>
                </div>


            </section>
        </>
    )
}

export default ClientDashboard