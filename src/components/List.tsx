import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import { Table, Thead, Tbody, Tr, Th, Td } from 'react-super-responsive-table';
import 'react-super-responsive-table/dist/SuperResponsiveTableStyle.css';
import { getRandomArbitrary } from 'utils/random';

type Member = {
  nickname: string;
  level: number;
  updateLevel: number;
  updateExp: number;
  date: string;
  percent: number;
};

const List = () => {
  const [members, setMembers] = useState<Member[]>([]);
  const [graphData, setGraphData] = useState<number[]>([]);
  const [selectedMember, setselectedMember] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      // const data =await fetch('/api/???').then(res=>res.json())
      // 멤버 목록
      const data: Member[] = [
        {
          nickname: 'nick1',
          level: 200,
          updateLevel: 0,
          updateExp: 999999999,
          date: '2021-09-12',
          percent: 0.005,
        },
        {
          nickname: 'nick2',
          level: 202,
          updateLevel: 0,
          updateExp: 999999999,
          date: '2021-09-12',
          percent: 90.055,
        },
      ];
      setMembers(data);
    };

    fetchData();
  }, []);

  return (
    <div>
      <h2>길드원</h2>
      <Table>
        <Thead>
          <Tr>
            <Th />
            <Th>닉네임</Th>
            <Th>레벨</Th>
            <Th>경험치</Th>
            <Th>상승량</Th>
            <Th>지분율</Th>
          </Tr>
        </Thead>
        <Tbody>
          {members.map(
            ({ nickname, level, percent, updateExp, updateLevel }) => {
              return (
                <Tr
                  key={nickname}
                  data-id={nickname}
                  onClick={(
                    e: React.MouseEvent<HTMLDivElement, MouseEvent>,
                  ) => {
                    const rowEl = e.currentTarget.closest('tr')!;

                    const curNickname = rowEl.dataset.id!;
                    console.log(curNickname);

                    if (curNickname === selectedMember) return;

                    setselectedMember(curNickname);
                    setGraphData(
                      new Array(5)
                        .fill(0)
                        .map(() => getRandomArbitrary(10, 50)),
                    );
                  }}
                >
                  <Td>{nickname}</Td>
                  <Td>{nickname}</Td>
                  <Td>{level}</Td>
                  <Td>{123}</Td>
                  <Td>
                    {updateLevel} / {updateExp}
                  </Td>
                  <Td>{percent}</Td>
                </Tr>
              );
            },
          )}
        </Tbody>
      </Table>
      <Line
        data={{
          labels: 'rate',
          datasets: [
            {
              label: 'rates',
              data: graphData,
              borderColor: 'rgba(238, 241, 243, 1)',
              borderWidth: 3,
            },
          ],
        }}
      />
    </div>
  );
};

export default List;
