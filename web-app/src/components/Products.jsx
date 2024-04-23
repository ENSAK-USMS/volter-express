import React, { useEffect, useState } from "react";
import axios from "axios";

const ProductsManagement = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
     axios.get(
          "http://localhost:8080/api/orders/warehouse?page=0&size=20"
        ).then((response) => {
            setData(response.data);
            console.log("Data:", response.data);
            }
        ).catch((error) => {
            console.error('Error getting user location:', error);
        }
    );
  }, [setData]);

  

  useEffect(() => {
    console.log("datassss- ",data);
    // Initialize Ag-Grid instance
    const initGrid = () => {
      const gridOptions = {
        rowData: data,
        columnDefs: [
          {
            field: "id",
            headerName: "Product ID",
            filter: true,
            sortable: true,
            floatingFilter: true,
            width: 150,
          },
          {
            field: "totalAmount",
            headerName: "Total Amount",
            filter: true,
            sortable: true,
            floatingFilter: true,
          },
          {
            field: "weightKg",
            headerName: "Weight (kg)",
            filter: true,
            sortable: true,
            floatingFilter: true,
          },
          {
            field: "expirationDate",
            headerName: "Expiration Date",
            filter: true,
            sortable: true,
            floatingFilter: true,
          },
          {
            headerName: "Actions",
            cellRenderer: function (params) {
              return `<div class="btn-group" role="group">
                                <button type="button" class="btn mx-1 rounded-2 btn-sm btn-light border-2 border border-dark" data-bs-toggle="modal" data-bs-target="#send" data-bs-dismiss="modal"><i class="ri-send-plane-fill"></i> Ship</button>
                            </div>`;
            },
            filter: false,
            sortable: false,
            autoHeight: true,
            cellStyle: { textAlign: "center" },
          },
        ],
        pagination: true,
        removePivotHeaderRowWhenSingleValueColumn: true,
        sideBar: true,
        paginationPageSize: 20,
        defaultColDef: {
          flex: 1,
        },
      };

      const gridDiv = document.querySelector("#productsGrid");

        //   remove the ag-Grid old instance
        if (gridDiv != null) {
            gridDiv.innerHTML = "";
        }


      new agGrid.Grid(gridDiv, gridOptions);
    };

    initGrid();
  }, [setData,data]);

  return (
    <>
      <div className="container card-shadow content mb-5 mt-4 rounded-4">
        <div className="d-flex justify-content-between px-4 pt-4">
          <div className="text my-3 col-6">Products management</div>
          <div className="col-6 text-end">
            <button
              type="button"
              className="btn btn-success px-5 py-2 rounded-3 m-1"
              data-bs-toggle="modal"
              data-bs-target="#createProduct"
              data-bs-dismiss="modal"
            >
              <i className="ri-add-large-line"></i>
              Create
            </button>
          </div>
        </div>
        <div className="col-md-12 d-flex flex-column">
          <div className="rounded-4 p-4">
            <div
              id="productsGrid"
              className="ag-theme-alpine"
              style={{ height: "75vh", width: "100%" }}
            ></div>
          </div>
        </div>
      </div>

      <div className="modal fade" id="send">
        <div className="modal-dialog modal-dialog-centered modal-lg">
          <div className="modal-content rounded-4 p-4">
            <div className="modal-header">
              <h5 className="modal-title">Send Product</h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
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
                  <div className="col-md-6">
                    <div className="mb-3">
                      <label htmlFor="quantity" className="form-label">
                        Quantity
                      </label>
                      <input
                        type="number"
                        className="form-control"
                        id="quantity"
                        placeholder="Quantity"
                      />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="mb-3">
                      <label htmlFor="weight" className="form-label">
                        Weight
                      </label>
                      <input
                        type="number"
                        className="form-control"
                        id="weight"
                        placeholder="Weight"
                      />
                    </div>
                  </div>
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
              <button type="button" className="btn btn-primary">
                Send
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductsManagement;
