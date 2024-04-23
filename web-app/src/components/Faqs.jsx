import React from 'react';

const Faqs = () => {
    return (
        <div className="container card-shadow content mb-5 mt-4 rounded-4 p-5">
            <h2 className="mb-4">Frequently Asked Questions</h2>
            <div className="accordion accordion-flush" id="faqExample">
                {/* FAQ 1 */}
                <div className="accordion-item">
                    <h2 className="accordion-header" id="headingOne">
                        <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                            Q: What is your return policy?
                        </button>
                    </h2>
                    <div id="collapseOne" className="accordion-collapse collapse show" aria-labelledby="headingOne" data-bs-parent="#faqExample">
                        <div className="accordion-body">
                            A: We accept returns within 14 days of purchase. The item must be unused and in the same condition that you received it.
                        </div>
                    </div>
                </div>
                {/* FAQ 2 */}
                <div className="accordion-item">
                    <h2 className="accordion-header" id="headingTwo">
                        <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
                            Q: Do you ship internationally?
                        </button>
                    </h2>
                    <div id="collapseTwo" className="accordion-collapse collapse" aria-labelledby="headingTwo" data-bs-parent="#faqExample">
                        <div className="accordion-body">
                            A: Yes, we ship all over the world. Shipping costs will apply, and will be added during checkout.
                        </div>
                    </div>
                </div>
                {/* FAQ 3 */}
                <div className="accordion-item">
                    <h2 className="accordion-header" id="headingThree">
                        <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
                            Q: How secure is shopping? Is my data protected?
                        </button>
                    </h2>
                    <div id="collapseThree" className="accordion-collapse collapse" aria-labelledby="headingThree" data-bs-parent="#faqExample">
                        <div className="accordion-body">
                            A: Your data will be handled confidentially and encrypted with SSL (Secure-Socket-Layer) secure server software.
                        </div>
                    </div>
                </div>
                {/* FAQ 4 */}
                <div className="accordion-item">
                    <h2 className="accordion-header" id="headingFour">
                        <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseFour" aria-expanded="false" aria-controls="collapseFour">
                            Q: Which regions do you serve for parcel delivery?
                        </button>
                    </h2>
                    <div id="collapseFour" className="accordion-collapse collapse" aria-labelledby="headingFour" data-bs-parent="#faqExample">
                        <div className="accordion-body">
                            A: Our parcel delivery services extend across [enumeration of covered regions or localities], ensuring swift and efficient parcel transport to diverse destinations.
                        </div>
                    </div>
                </div>
                {/* FAQ 5 */}
                <div className="accordion-item">
                    <h2 className="accordion-header" id="headingFive">
                        <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseFive" aria-expanded="false" aria-controls="collapseFive">
                            Q: Is parcel tracking available during transit?
                        </button>
                    </h2>
                    <div id="collapseFive" className="accordion-collapse collapse" aria-labelledby="headingFive" data-bs-parent="#faqExample">
                        <div className="accordion-body">
                            A: Absolutely! We provide real-time parcel tracking functionality, enabling you to monitor your parcel's progress from pickup through to final delivery.
                        </div>
                    </div>
                </div>
                {/* FAQ 6 */}
                <div className="accordion-item">
                    <h2 className="accordion-header" id="headingSix">
                        <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseSix" aria-expanded="false" aria-controls="collapseSix">
                            Q: What is the estimated delivery time for parcels?
                        </button>
                    </h2>
                    <div id="collapseSix" className="accordion-collapse collapse" aria-labelledby="headingSix" data-bs-parent="#faqExample">
                        <div className="accordion-body">
                            A: The estimated delivery time for parcels is typically [insert estimated delivery time], subject to the destination and the selected delivery service.
                        </div>
                    </div>
                </div>
                {/* FAQ 7 */}
                <div className="accordion-item">
                    <h2 className="accordion-header" id="headingSeven">
                        <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseSeven" aria-expanded="false" aria-controls="collapseSeven">
                            Q: What are the accepted payment methods?
                        </button>
                    </h2>
                    <div id="collapseSeven" className="accordion-collapse collapse" aria-labelledby="headingSeven" data-bs-parent="#faqExample">
                        <div className="accordion-body">
                            A: We accept a variety of payment methods, including credit/debit cards, PayPal, and bank transfers. Please refer to our payment policy for more details.
                        </div>
                    </div>
                </div>
                {/* FAQ 8 */}
                <div className="accordion-item">
                    <h2 className="accordion-header" id="headingEight">
                        <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseEight" aria-expanded="false" aria-controls="collapseEight">
                            Q: How can I contact customer support?
                        </button>
                    </h2>
                    <div id="collapseEight" className="accordion-collapse collapse" aria-labelledby="headingEight" data-bs-parent="#faqExample">
                        <div className="accordion-body">
                            A: You can contact our customer support team via email at [insert email address] or by phone at [insert phone number]. Our team is available [insert hours of operation].
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Faqs;
