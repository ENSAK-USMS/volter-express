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
          fill: false,
          borderColor: 'rgb(75, 192, 192)',
          tension: 0.1
        }]
      },
      options: {}
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
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)',
          ],
          borderColor: [
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
          ],
          borderWidth: 1
        }]
      },
      options: {}
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
        }
      }
    });
  }, []);

  return (
    <div className="container ">
      <div className="row text-capitalize">
        <div className="col-3">
          <div className="card-shadow content mt-4 rounded-4 p-5 ">
            <h5>Number of clients</h5>
            <p>1831</p>
          </div>
        </div>
        <div className="col-3">
          <div className="card-shadow content mt-4 rounded-4 p-5 ">
            <h5>Orders Sent</h5>
            <p>3813</p>
          </div>
        </div>
        <div className="col-3">
          <div className="card-shadow content mt-4 rounded-4 p-5 ">
            <h5>Products available</h5>
            <p>1373</p>
          </div>
        </div>
        <div className="col-3">
          <div className="card-shadow content mt-4 rounded-4 p-5 ">
            <h5>Card 1</h5>
            <p>Card 1 content</p>
          </div>
        </div>
        <div className="col-8 mt-4">
          <div className="card-shadow content rounded-4 p-5">
            <canvas ref={lineChartorderspermonth} width="400" height="200"></canvas>
          </div>
        </div>
        <div className="col-4 row mt-4">
          <div className="col-12">
            <div className="card-shadow content rounded-4 p-5">
              <canvas ref={chartCurrentordervslastmonth} width="400" height="200"></canvas>
            </div>
          </div>
          <div className="col-12">
            <div className="card-shadow content rounded-4 p-5">
              <canvas ref={barChart} width="400" height="200"></canvas>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyChart;
