import React, { useEffect } from 'react';

const CustomersTable = () => {
    useEffect(() => {
        // Function to generate sample data
        function generateData(count) {
            const data = [];
            for (let i = 0; i < count; i++) {
                data.push({
                    customer_id: i + 1,
                    customer_name: "Customer " + (i + 1),
                    email: "customer" + (i + 1) + "@example.com",
                    phone: "123-456-789" + i,
                    address: "Address " + (i + 1),
                    city: "City " + (i + 1),
                    country: "Country " + (i + 1),
                });
            }
            return data;
        }

        // Initialize Ag-Grid instance
        const initGrid = () => {
            const gridOptions = {
                rowData: generateData(100), // Generate sample data
                columnDefs: [
                    { field: "customer_id", headerName: "Customer ID", filter: true, sortable: true, floatingFilter: true, width: 150 },
                    { field: "customer_name", headerName: "Customer Name", filter: true, sortable: true, floatingFilter: true },
                    { field: "email", headerName: "Email", filter: true, sortable: true, hide:true, floatingFilter: true },
                    { field: "phone", headerName: "Phone", filter: true, sortable: true, hide:true, floatingFilter: true },
                    { field: "address", headerName: "Address", filter: true, sortable: true, hide:true, floatingFilter: true },
                    { field: "city", headerName: "City", filter: true, sortable: true, hide:true, floatingFilter: true },
                    { field: "country", headerName: "Country", filter: true, sortable: true, floatingFilter: true },
                    {
                        headerName: "Actions",
                        cellRenderer: function (params) {
                            return `<div class="btn-group" role="group">
                                    <button type="button" class="btn mx-1 rounded-2 btn-sm btn-light border-2 border border-dark" data-bs-toggle="modal" data-bs-target="#route" data-bs-dismiss="modal" title="Voir le Professeur"><i class="ri-route-fill"></i></button>
                                  </div>`;
                        },
                        filter: false,
                        sortable: false,
                        autoHeight: true,
                        cellStyle: { textAlign: "center" }
                    }
                ],
                pagination: true,
                removePivotHeaderRowWhenSingleValueColumn: true,
                sideBar: true,              
                paginationPageSize: 20,
                defaultColDef: {
                    flex: 1,
                }
            };

            const gridDiv = document.querySelector("#customerGrid");

            new agGrid.Grid(gridDiv, gridOptions);
        };

        initGrid();
    }, []);

    return (
        <div className="container card-shadow content mb-5 mt-4 rounded-4">
            <div className="d-flex justify-content-between px-4 pt-4">
                <div className="text my-3 col-6">
                    Orders management
                </div>
                <div className="col-6 text-end">
                    <button type="button" className="btn btn-success px-5 py-2 rounded-3 m-1" data-bs-toggle="modal" data-bs-target="#ship" data-bs-dismiss="modal">
                        <i className="ri-add-large-line"></i>
                        Create
                    </button>
                </div>
            </div>
            <div className="col-md-12 d-flex flex-column">
                <div className="rounded-4 p-4">
                    <div id="customerGrid" className="ag-theme-alpine" style={{ height: '75vh', width: '100%' }}></div>
                </div>
            </div>
        </div>
    );
};

export default CustomersTable;
