import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';

const MyChart = () => {
  const chartRef = useRef(null);

  useEffect(() => {
    const ctx = chartRef.current.getContext('2d');
    new Chart(ctx, {
      type: 'bar',
      data: {
        labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
        datasets: [{
          label: '# of Votes',
          data: [12, 19, 3, 5, 2, 3],
          backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 206, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(153, 102, 255, 0.2)',
            'rgba(255, 159, 64, 0.2)'
          ],
          borderColor: [
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)',
            'rgba(255, 159, 64, 1)'
          ],
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
        <div className="col-6">
          <div className="card-shadow content rounded-4 p-5">
            <canvas ref={lineChartorderspermonth} width="400" height="200"></canvas>
          </div>
        </div>
        <div className="col-6 row">
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
