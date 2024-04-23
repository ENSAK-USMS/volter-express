import React, { useEffect } from 'react';

const TrucksTable = () => {
    useEffect(() => {
        // Function to generate sample data
        function generateData(count) {
            const data = [];
            for (let i = 0; i < count; i++) {
                data.push({
                    truck_id: i + 1,
                    truck_name: "Truck " + (i + 1),
                    capacity: Math.floor(Math.random() * 100) + 1,
                    status: Math.random() > 0.5 ? "Active" : "Inactive",
                });
            }
            return data;
        }

        // Initialize Ag-Grid instance
        const initGrid = () => {
            const gridOptions = {
                rowData: generateData(20), // Generate sample data
                columnDefs: [
                    { field: "truck_id", headerName: "Truck ID", filter: true, sortable: true, floatingFilter: true, width: 150 },
                    { field: "truck_name", headerName: "Truck Name", filter: true, sortable: true, floatingFilter: true },
                    { field: "capacity", headerName: "Capacity", filter: true, sortable: true, floatingFilter: true },
                    { field: "status", headerName: "Status", filter: true, sortable: true, floatingFilter: true },
                    {
                        headerName: "Actions",
                        cellRenderer: function (params) {
                            return `<div class="btn-group" role="group">
                                    <button type="button" class="btn mx-1 rounded-2 btn-sm btn-light border-2 border border-dark" data-bs-toggle="modal" data-bs-target="#viewModal" data-bs-dismiss="modal" title="View Truck"><i class="ri-route-fill"></i></button>
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
                paginationPageSize: 10,
                defaultColDef: {
                    flex: 1,
                }
            };

            const gridDiv = document.querySelector("#truckGrid");

            new agGrid.Grid(gridDiv, gridOptions);
        };

        initGrid();
    }, []);

    return (
        <section className="home-section p-3 text-capitalize">
            <div className="d-flex justify-content-between">
                <div className="text my-3 col-6">
                    Truck management
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
                    <div id="truckGrid" className="ag-theme-alpine" style={{ height: '75vh', width: '100%' }}></div>
                </div>
            </div>
        </section>

    );
};

export default TrucksTable;
