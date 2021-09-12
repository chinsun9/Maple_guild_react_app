/* eslint-disable no-shadow */
import { ChartData, ChartOptions } from 'chart.js/auto';
import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';

type MemberCount = {
  date: string;
  count: number;
};

enum InOut {
  out = 'out',
  in = 'in',
}

type MemberInOut = {
  date: string;
  state: 'in' | 'out';
  nickname: string;
};

const chartOptions: ChartOptions<'bar'> = {
  scales: {
    y: {
      ticks: {
        maxTicksLimit: 6,
      },
      beginAtZero: true,
    },
  },
};

const inOutMockData = [
  {
    date: '2021-09-03',
    state: InOut.in,
    nickname: 'nick1',
  },
  {
    date: '2021-09-03',
    state: InOut.out,
    nickname: 'nick2',
  },
  {
    date: '2021-09-03',
    state: InOut.out,
    nickname: 'nick3',
  },
  {
    date: '2021-09-03',
    state: InOut.in,
    nickname: 'nick4',
  },
];

const NumberOfMembers = () => {
  const [state, setState] = useState<MemberCount[]>([]);
  const [memberInOuts, setMemberInOuts] = useState<MemberInOut[]>([]);

  const convertToChartData = (data: MemberCount[]) => {
    return {
      labels: data.map((row) => row.date),
      datasets: [
        {
          type: 'line',
          label: 'total',
          data: data.map((row) => row.count),
          borderColor: 'rgb(54, 162, 235)',
          borderWidth: 2,
        },
        {
          type: 'bar',
          label: 'in',
          data: new Array(data.length).fill(0).map((_, idx) => idx + 2),
          backgroundColor: 'rgb(24, 114, 173)',
        },
        {
          type: 'bar',
          label: 'out',
          data: new Array(data.length).fill(0).map((_, idx) => idx + 1),
          backgroundColor: 'rgba(24, 113, 173, 0.616)',
        },
      ],
    } as ChartData;
  };

  useEffect(() => {
    const fetchData = async () => {
      // const data =await fetch('/api/???').then(res=>res.json())
      // 길드원수 추이
      const data: MemberCount[] = [
        {
          date: '2021-09-02',
          count: 82,
        },
        {
          date: '2021-09-03',
          count: 83,
        },
        {
          date: '2021-09-04',
          count: 84,
        },
        {
          date: '2021-09-05',
          count: 85,
        },
        {
          date: '2021-09-06',
          count: 87,
        },
      ];
      setState(data);

      // const data =await fetch('/api/???').then(res=>res.json())
      // 오늘의 길갑자, 길탈자
      const members: MemberInOut[] = inOutMockData;

      setMemberInOuts(members);
    };

    fetchData();
  }, []);

  return (
    <div>
      <h2>길드원 추이</h2>
      <Bar data={convertToChartData(state)} options={chartOptions} />
      <div className="in">
        <h3>가입</h3>
        {memberInOuts
          .filter(({ state }) => state === InOut.in)
          .map(({ nickname }) => {
            return <span key={nickname}>{nickname}</span>;
          })}
      </div>
      <div className="in">
        <h3>탈퇴</h3>
        {memberInOuts
          .filter(({ state }) => state === InOut.out)
          .map(({ nickname }) => {
            return <span key={nickname}>{nickname}</span>;
          })}
      </div>
    </div>
  );
};

export default NumberOfMembers;
