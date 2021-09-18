import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import { Table, Thead, Tbody, Tr, Th, Td } from 'react-super-responsive-table';
import 'react-super-responsive-table/dist/SuperResponsiveTableStyle.css';

type Member = {
  nickname: string;
  level: number;
  updateLevel: number;
  updateExp: number;
  date: string;
  percent: number;
};

type PersonalData = {
  nickname: string;
  level: number;
  updateLevel: number;
  updateExp: number;
  date: string;
};

type SelectOrderOption = 'lv' | 'share';

type Props = {
  selectedDate: string;
};

const List = ({ selectedDate }: Props) => {
  const [members, setMembers] = useState<Member[]>([]);
  const [graphData, setGraphData] = useState<number[]>([]);
  const [graphLabelData, setGraphLabelData] = useState<string[]>([]);
  const [selectedMember, setselectedMember] = useState('');
  const [selectedOrderOption, setSelectedOrderOption] =
    useState<SelectOrderOption>('lv');

  useEffect(() => {
    console.log(`order`, selectedOrderOption);
    if (selectedOrderOption === 'share') {
      setMembers((prev) => {
        const sorted = prev.sort((a, b) => b.percent - a.percent);
        return [...sorted];
      });
    } else {
      setMembers((prev) => [...prev.sort((a, b) => b.level - a.level)]);
    }
  }, [selectedOrderOption]);

  useEffect(() => {
    if (selectedDate === '') return;

    console.log(`fetch data`, selectedDate);
    const fetchData = async () => {
      const data: Member[] = await fetch(
        `/dayExpRank?daily=${selectedDate}`,
      ).then((res) => res.json());

      setMembers(data);
      setSelectedOrderOption('lv');
    };

    fetchData();
  }, [selectedDate]);

  return (
    <div className="List">
      <h2>길드원</h2>
      <div className="option">
        <select
          value={selectedOrderOption}
          onChange={(e) => {
            console.log(e.currentTarget.value);
            setSelectedOrderOption(e.currentTarget.value as SelectOrderOption);
          }}
        >
          <option value="lv">레벨순</option>
          <option value="share">지분순</option>
        </select>
      </div>
      <Table>
        <Thead>
          <Tr>
            <Th />
            <Th>닉네임</Th>
            <Th>레벨</Th>
            <Th>레벨 상승량</Th>
            <Th>경험치 상승량</Th>
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
                  onClick={async (
                    e: React.MouseEvent<HTMLDivElement, MouseEvent>,
                  ) => {
                    const rowEl = e.currentTarget.closest('tr')!;

                    const curNickname = rowEl.dataset.id!;
                    console.log(curNickname);

                    if (curNickname === selectedMember) return;

                    setselectedMember(curNickname);

                    // api 호출
                    const fetchedData: PersonalData[] = await fetch(
                      `/personalInfo?nickname=${curNickname}`,
                    ).then((res) => res.json());

                    const d = fetchedData.map((row) => row.updateExp);
                    const l = fetchedData.map((row) => row.date);

                    setGraphLabelData(l);
                    setGraphData(d);
                  }}
                >
                  <Td>{nickname}</Td>
                  <Td>{nickname}</Td>
                  <Td>{level}</Td>
                  <Td>{updateLevel}</Td>
                  <Td>{updateExp}</Td>
                  <Td>{percent}</Td>
                </Tr>
              );
            },
          )}
        </Tbody>
      </Table>
      <Line
        data={{
          labels: graphLabelData,
          datasets: [
            {
              label: 'exp',
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
