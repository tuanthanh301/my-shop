import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { convertDataChart } from '../../ultils';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const VerticalChart = (props) => {
  const options = {
    responsive: true,
    plugins: {
      legend: {
      //   position: 'top' as const,
      },
      title: {
        display: true,
        text: 'Bảng thông kê doanh số ',
      },
    },
  };
  const labels = ['Acer', 'Asus', 'Dell', 'Hp', 'LG', 'Mac', 'Msi'];

  const data = {
    labels,
    datasets: [
      {
        label: 'Sản phẩm bán chạy nhất',
        data: [100000000,20000000,30000000,54000000,67000000,33000000,77000000],
        backgroundColor: [
          'rgba(255, 99, 132, 0.7)',   // Acer
          'rgba(54, 162, 235, 0.7)',   // Asus
          'rgba(255, 206, 86, 0.7)',   // Dell
          'rgba(75, 192, 192, 0.7)',   // Hp
          'rgba(153, 102, 255, 0.7)',  // LG
          'rgba(255, 159, 64, 0.7)',   // Mac
          'rgba(199, 199, 199, 0.7)'   // Msi
        ],
      },
  
    ],
  };
  return (
    <div style={{width:700}}><Bar options={options} data={data} /></div>
  )
}

export default VerticalChart