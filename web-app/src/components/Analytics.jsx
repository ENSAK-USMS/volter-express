import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';

const MyChart = () => {
  const lineChartorderspermonth = useRef(null);
  const chartCurrentordervslastmonth = useRef(null);
  const barChart = useRef(null);

  useEffect(() => {
    // Line chart for orders per month
    const ctx1 = lineChartorderspermonth.current.getContext('2d');
    new Chart(ctx1, {
      type: 'line',
      data: {
        labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
        datasets: [{
          label: 'Orders per Month',
          data: [65, 59, 80, 81, 56, 55, 40],
          fill: true,
          borderColor: '#1877F2',
          backgroundColor: 'rgba(24, 119, 242, 0.2)', // Fill color same as line chart
          tension: 0.1
        }]
      },
      options: {
        plugins: {
          title: {
            display: true,
            text: 'Orders per Month'
          }
        }
      }
    });

    // Pie chart for orders for this month and the last month
    const ctx2 = chartCurrentordervslastmonth.current.getContext('2d');
    new Chart(ctx2, {
      type: 'pie',
      data: {
        labels: ['This Month', 'Last Month'],
        datasets: [{
          label: 'Orders',
          data: [300, 200],
          backgroundColor: [
            'rgba(24, 119, 242, 0.2)', // Fill color same as line chart
            'rgba(24, 119, 242, 0.4)' // Fill color for last month
          ],
          borderColor: [
            '#1877F2',
            '#1877F2'
          ],
          borderWidth: 1
        }]
      },
      options: {
        plugins: {
          title: {
            display: true,
            text: 'Orders for This Month and Last Month'
          }
        }
      }
    });

    // Bar chart for products still in warehouse and shipped
    const ctx3 = barChart.current.getContext('2d');
    new Chart(ctx3, {
      type: 'bar',
      data: {
        labels: ['Product 1', 'Product 2', 'Product 3', 'Product 4', 'Product 5'],
        datasets: [{
          label: 'In Warehouse',
          data: [12, 19, 3, 5, 2],
          backgroundColor: 'rgba(255, 99, 132, 0.2)',
          borderColor: 'rgba(255, 99, 132, 1)',
          borderWidth: 1
        }, {
          label: 'Shipped',
          data: [8, 12, 5, 7, 4],
          backgroundColor: 'rgba(54, 162, 235, 0.2)',
          borderColor: 'rgba(54, 162, 235, 1)',
          borderWidth: 1
        }]
      },
      options: {
        scales: {
          y: {
            beginAtZero: true
          }
        },
        plugins: {
          title: {
            display: true,
            text: 'Products in Warehouse and Shipped'
          }
        }
      }
    });
  }, []);


  return (
    <div className="container mb-5">
      <div className="row text-capitalize">
        <div className="col-3">
          <div className="card-shadow content mt-4 rounded-4 px-4 py-5">
            <h4>Orders Sent</h4>
            <h5 className='fw-bold'>3813</h5>
          </div>
        </div>
        <div className="col-3">
          <div className="card-shadow content mt-4 rounded-4 px-4 py-5">
            <h4>Products available</h4>
            <h5 className='fw-bold'>1337</h5>
          </div>
        </div>
        <div className="col-3">
          <div className="card-shadow content mt-4 rounded-4 px-4 py-5">
            <h4>Trucks available</h4>
            <h5 className='fw-bold'>74</h5>
          </div>
        </div>
        <div className="col-3">
          <div className="card-shadow content mt-4 rounded-4 px-4 py-5">
            <h4>Trucks available</h4>
            <h5 className='fw-bold'>74</h5>
          </div>
        </div>
        <div className="col-8">
          <div className="card-shadow mt-4 content rounded-4 p-5 flex-fill">
            <canvas ref={barChart} width="400" height="280"></canvas>
          </div>
        </div>
        <div className="col-4  mt-4">
          <div className="row d-flex flex-column">
            <div className="col-12 flex-fill">
              <div className="card-shadow content rounded-4 p-5">
                <canvas ref={chartCurrentordervslastmonth} width="400" height="200"></canvas>
              </div>
            </div>
            <div className="col-12 flex-fill">
              <div className="card-shadow content rounded-4 p-2 pt-3 mt-4">
                <canvas ref={lineChartorderspermonth} width="400" height="200"></canvas>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyChart;
