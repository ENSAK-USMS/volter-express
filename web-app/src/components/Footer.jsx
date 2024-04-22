import React from 'react';

const Footer = () => {
  return (
    <footer className="text-center text-lg-start bg-body-tertiary text-muted">
      <section className="d-flex justify-content-center justify-content-lg-between p-4 border-bottom">
        <div className="me-5 d-none d-lg-block">
          <span>Follow us:</span>
        </div>
        <div>
          <a href="/" className="me-4 text-reset">
            <i className="fab fa-facebook-f"></i>
          </a>
          <a href="/" className="me-4 text-reset">
            <i className="fab fa-twitter"></i>
          </a>
          <a href="/" className="me-4 text-reset">
            <i className="fab fa-google"></i>
          </a>
          <a href="/" className="me-4 text-reset">
            <i className="fab fa-instagram"></i>
          </a>
          <a href="/" className="me-4 text-reset">
            <i className="fab fa-linkedin"></i>
          </a>
          <a href="/" className="me-4 text-reset">
            <i className="fab fa-github"></i>
          </a>
        </div>
      </section>

      <section>
        <div className="container text-center text-md-start mt-5">
          <div className="row mt-3">
            <div className="col-md-6 col-sm-12 mx-auto mb-4">
              <h6 className="text-uppercase fw-bold mb-4">
                <i className="fas fa-map-marker-alt me-3"></i>FastX, Morocco
              </h6>
              <p>
              Welcome to FAST X, your premier destination for fast and reliable delivery services. With our efficient delivery network and dedicated team, we ensure that your packages reach their destination in the shortest time possible. Whether it's a small parcel or a large shipment, we've got you covered. Experience the convenience and speed of FAST X today!
              </p>
            </div>
            <div className="col-md-3 col-sm-6 mx-auto mb-4">
              <h6 className="text-uppercase fw-bold mb-4">
                Useful links
              </h6>
              <p>
                <a href="#!" className="text-reset">Home</a>
              </p>
              <p>
                <a href="#!" className="text-reset">Ship And Track</a>
              </p>
              <p>
                <a href="#!" className="text-reset">Send A Shipment</a>
              </p>
              <p>
                <a href="#!" className="text-reset">Track Shipment</a>
              </p>
            </div>
            <div className="col-md-3 col-sm-6 mx-auto mb-md-0 mb-4">
              <h6 className="text-uppercase fw-bold mb-4">Contact</h6>
              <p><i className="fas fa-home me-3"></i> Khouribga, Morocco</p>
              <p>
                <i className="fas fa-envelope me-3"></i>
                FastX@info.com
              </p>
              <p><i className="fas fa-phone me-3"></i> + 01 234 567 88</p>
            </div>
          </div>
        </div>
      </section>

      <div className="text-center p-4" style={{ backgroundColor: 'rgba(0, 0, 0, 0.05)' }}>
        © 2021 FastX. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
