import { ChartData, ChartOptions } from 'chart.js/auto';
import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';

type RankData = {
  nickname: string;
  rate: number;
};

const chartOptions: ChartOptions<'bar'> = {
  scales: {
    y: {
      ticks: {
        stepSize: 50,
      },
    },
  },
  plugins: {
    legend: {
      display: false,
    },
  },
};

const Rank = () => {
  const [state, setState] = useState<RankData[]>([]);

  const convertToChartData = (data: RankData[]) => {
    return {
      labels: data.map((row) => row.nickname),
      datasets: [
        {
          label: 'rates',
          data: data.map((row) => row.rate),
          backgroundColor: [
            'rgba(238, 241, 243, 0.9)',
            'rgba(251, 239, 188, 0.9)',
            'rgba(251, 229, 211, 0.9)',
          ],
          borderColor: [
            'rgba(238, 241, 243, 1)',
            'rgba(251, 239, 188, 1)',
            'rgba(251, 229, 211, 1)',
          ],
          borderWidth: 3,
        },
      ],
    } as ChartData;
  };

  useEffect(() => {
    const fetchData = async () => {
      // const data =await fetch('/api/???').then(res=>res.json())
      //   2, 1, 3등 순
      const data: RankData[] = [
        {
          nickname: '2등',
          rate: 4,
        },
        {
          nickname: '1등',
          rate: 95,
        },
        {
          nickname: '3등',
          rate: 1,
        },
      ];
      setState(data);
    };

    fetchData();
  }, []);

  return (
    <div>
      <h2>지분율 순위</h2>
      <Bar data={convertToChartData(state)} options={chartOptions} />
    </div>
  );
};

export default Rank;
