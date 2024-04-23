import React, { useState } from 'react';
import './home.css';
import Swiper from '../../components/Swiper';
import currenlocationImage from '../../assets/currentlocation.svg'
import arrowDown from '../../assets/arrowDown.png'

function Home() {
  const [modalVisible, setModalVisible] = useState(false);
  const [orderLocation, setOrderLocation] = useState({ lat: 0, lng: 0 }); // Initial order location

  const handleTrackButtonClick = () => {
    const orderLatLng = [34.020882, -6.841650]; // Example order location
    setOrderLocation({ lat: orderLatLng[0], lng: orderLatLng[1] });
    setModalVisible(true);
  };

  return (
    <>
      <section className="content container bg-transparent my-5">
        <div className="row">
          <div className="col-md-6 d-flex flex-column">
            <div className="row flex-fill">
              <div className="col-md-12">
                <div className="card-shadow p-5 rounded-4 content">
                  <div className="home_data">
                    <h3 className="home_subtitle">FastX, Fastest delivery service</h3>
                    <p className="text-sm">Welcome to FAST X, your premier destination for fast and reliable delivery services. With our efficient delivery network and dedicated team.</p>
                    <div className="input-group position-relative">
                      <input type="text" className="form-control rounded-4 p-4" placeholder="Type a message..." id="promptText" style={{ zIndex: 0 }}></input>
                      <button className="btn btn-primary position-absolute top-50 end-0 translate-middle-y rounded-4 me-2 p-3" type="button" title="Send message" id="sendButton" data-bs-toggle="modal" data-bs-target="#orderLocationModal" data-bs-dismiss="modal">
                        <i className="ri-eye-line me-2"></i>
                        Track
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-md-12 mt-3">
                <div className="card-shadow p-5 pb-4 rounded-4 content flex-fill">
                  <div className="login-content">
                    <h3>Sign Up or Login</h3>
                    <p>Welcome back! Log in to your account or sign up to get started.</p>
                    <div className="d-flex justify-content-center">
                      <a href='/login' className="btn btn-primary btn-lg mx-2 px-5">Login</a>
                      <a href='/signup' className="btn btn-outline-primary btn-lg mx-2 px-5">Sign Up</a>
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </div>
          <div className="col-md-6 d-flex flex-column">
            <div className="home_img card-shadow p-4 rounded-4 content flex-fill">
              <Swiper />
            </div>
          </div>
        </div>
      </section>

      <div className="modal fade" id="orderLocationModal" tabIndex="-1">
        <div className="modal-dialog modal-dialog-centered modal-lg">
          <div className="modal-content p-5 rounded-4 custom-modal">
            <div className="modal-header">
              <h5 className="modal-title">Order Location</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={() => setModalVisible(false)}></button>
            </div>
            <div className="modal-body">
              <div className="row">
                <div className="col-md-6 text-center">
                  <img src={currenlocationImage} height={300} alt="Current Location" />
                </div>
                <div className="col-md-6 d-flex flex-column justify-content-center text-center">
                  <h4>Your Track Number</h4>
                  <h5>123456789</h5>
                  <hr />
                  <h4>Track Your Order</h4>
                  <hr />
                  <div className="timeline">
                    <div className="timeline-item">
                      <div className="timeline-content">
                        <h5>At Warehouse</h5>
                      </div>
                      <div className="timeline-icon pb-3 pt-1">
                        <img src={arrowDown} height={60} alt="" srcset="" />
                      </div>
                    </div>
                    <div className="timeline-item">
                      <div className="timeline-content">
                        <h5>Next City</h5>
                        <p className='text-end text-muted'>04-23-2024</p>
                      </div>
                    </div>
                  </div>
                </div>

              </div>
            </div>
          </div>
        </div>
      </div>

    </>
  );
}

export default Home;
