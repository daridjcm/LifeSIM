import { useState, useEffect } from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import { ArrowDownIcon, ArrowUpIcon } from '@heroicons/react/24/solid';

// Handle data generation random
// TODO: changes months for hours today.
const generateRandomData = () => {
  const currentMonth = new Date().getMonth();
  const months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];

  return months.slice(0, currentMonth + 1).map((month) => {
    const low = Math.floor(Math.random() * 5000);
    const line = Math.floor(Math.random() * 10000);
    return {
      name: month,
      low,
      line,
      color: line > 5000 ? '#00FF00' : '#FF0000',
    };
  });
};

// Render view to chart
export default function FakeBankInvestment() {
  const [data, setData] = useState(generateRandomData());

  useEffect(() => {
    const interval = setInterval(() => {
      setData(generateRandomData());
    }, 30000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4 flex items-center gap-4 ml-8">
        Chart Investment
        <div className="text-xs font-semibold">
          <ArrowUpIcon className="text-green-500 size-5" />
          High value
        </div>
        <div className="text-xs font-semibold">
          <ArrowDownIcon className="text-red-500 size-5" />
          Down value
        </div>
      </h2>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart
          data={data}
          margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis
            dataKey="name"
            label={{ value: 'Month', position: 'insideBottom', offset: -5 }}
          />
          <YAxis
            domain={[100, 1000]}
            label={{ value: 'Value', angle: -90, position: 'insideLeft' }}
          />
          <Tooltip />
          <Legend />
          <Line
            type="monotone"
            dataKey="line"
            stroke={data.length > 0 ? data[data.length - 1].color : '#000000'}
            strokeDasharray="3 4 5 2"
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
