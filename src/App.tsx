import React, { useState, useEffect } from 'react';
import List from 'components/List';
import NumberOfMembers from 'components/NumberOfMembers';
import Rank from 'components/Rank';

export type Dates = {
  date: string;
};

const App = () => {
  const [dates, setDates] = useState<Dates[]>([]);
  const [selectedDate, setSelectedDate] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      const fetchedDates: Dates[] = await fetch('/dayList').then((res) =>
        res.json(),
      );

      setDates(fetchedDates);
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (dates.length === 0) return;

    setSelectedDate(dates[0].date);
  }, [dates]);

  return (
    <div className="App">
      <select
        value={selectedDate}
        onChange={(e) => {
          console.log(e.currentTarget.value);
          setSelectedDate(e.currentTarget.value);
        }}
      >
        {dates.map(({ date }) => {
          return (
            <option key={date} value={date}>
              {date}
            </option>
          );
        })}
      </select>

      <div className="row">
        <Rank selectedDate={selectedDate} />
        <NumberOfMembers />
      </div>

      <List selectedDate={selectedDate} />
    </div>
  );
};

export default App;
