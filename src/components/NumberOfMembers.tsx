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
      const data: MemberCount[] = await fetch('/guildNumInfo').then((res) =>
        res.json(),
      );
      // 길드원수 추이

      setState(data);

      const members: MemberInOut[] = await fetch('/toDayInOutGuild').then(
        (res) => res.json(),
      );
      // 오늘의 길갑자, 길탈자

      setMemberInOuts(members);
    };

    fetchData();
  }, []);

  return (
    <div className="NumberOfMembers">
      <h2>길드원 추이</h2>
      <Bar data={convertToChartData(state)} options={chartOptions} />
      <div className="inout">
        <h3>가입</h3>
        <div className="list">
          {memberInOuts
            .filter(({ state }) => state === InOut.in)
            .map(({ nickname }) => {
              return <span key={nickname}>{nickname}</span>;
            })}
        </div>
      </div>
      <div className="inout">
        <h3>탈퇴</h3>
        <div className="list">
          {memberInOuts
            .filter(({ state }) => state === InOut.out)
            .map(({ nickname }) => {
              return <span key={nickname}>{nickname}</span>;
            })}
        </div>
      </div>
    </div>
  );
};

export default NumberOfMembers;
