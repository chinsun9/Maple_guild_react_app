import React, { useEffect, useState } from 'react';

type RankData = {
  nickname: string;
  rate: number;
};

const Rank = () => {
  const [state, setState] = useState<RankData[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      // const data =await fetch('/api/???').then(res=>res.json())
      const data: RankData[] = [
        {
          nickname: '1등',
          rate: 95,
        },
        {
          nickname: '2등',
          rate: 4,
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

  return <div>{JSON.stringify(state, null, 2)}</div>;
};

export default Rank;
