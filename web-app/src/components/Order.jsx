import React, { useEffect } from 'react';

const OrdersTable = () => {
    useEffect(() => {
        // Function to generate sample data
        function generateData(count) {
            const data = [];
            for (let i = 0; i < count; i++) {
                data.push({
                    order_id: i + 1,
                    customer_name: "Customer " + (i + 1),
                    product_name: "Product " + (i + 1),
                    quantity: Math.floor(Math.random() * 10) + 1,
                    order_date: new Date().toLocaleDateString(),
                    status: Math.random() > 0.5 ? "Completed" : "Pending",
                });
            }
            return data;
        }

        // Initialize Ag-Grid instance
        const initGrid = () => {
            const gridOptions = {
                rowData: generateData(100), // Generate sample data
                columnDefs: [
                    { field: "order_id", headerName: "Order ID", filter: true, sortable: true, floatingFilter: true, width: 150 },
                    { field: "customer_name", headerName: "Customer Name", filter: true, sortable: true, floatingFilter: true },
                    { field: "product_name", headerName: "Product Name", filter: true, sortable: true, floatingFilter: true },
                    { field: "quantity", headerName: "Quantity", filter: true, sortable: true, floatingFilter: true },
                    { field: "order_date", headerName: "Order Date", filter: true, sortable: true, floatingFilter: true },
                    { field: "status", headerName: "Status", filter: true, sortable: true, floatingFilter: true },
                    {
                        headerName: "Actions",
                        cellRenderer: function (params) {
                            return `<div class="btn-group" role="group">
                                        <button type="button" class="btn mx-1 rounded-2 btn-sm btn-light border-2 border border-dark" data-bs-toggle="modal" data-bs-target="#viewModal" data-bs-dismiss="modal" title="Voir le Professeur"><i class="ri-route-fill"></i></button>
                                    </div>`;
                        },
                        filter: false,
                        sortable: false,
                        autoHeight: true,
                        cellStyle: { textAlign: "center" }
                    }
                ],
                removePivotHeaderRowWhenSingleValueColumn: true,
                sideBar: true,
                pagination: true,
                paginationPageSize: 20,
                defaultColDef: {
                    flex: 1,
                }
            };

            const gridDiv = document.querySelector("#orderGrid");

            new agGrid.Grid(gridDiv, gridOptions);
        };

        initGrid();
    }, []);

    return (
        <section className="home-section p-3 text-capitalize">
            <div className="d-flex justify-content-between">
                <div className="text my-3 col-6">
                    Order management
                </div>
                <div className="col-6 text-end">
                    <button type="button" className="btn btn-success px-5 py-2 rounded-3 m-1" data-bs-toggle="modal" data-bs-target="#addModal" data-bs-dismiss="modal">
                        <i className="ri-add-large-line"></i>
                        Create
                    </button>
                </div>
            </div>
            <div className="col-md-12 d-flex flex-column">
                <div className="rounded-4 card-shadow p-4">
                    <div id="orderGrid" className="ag-theme-alpine" style={{ height: '75vh', width: '100%' }}></div>
                </div>
            </div>
        </section>

    );
};

export default OrdersTable;
