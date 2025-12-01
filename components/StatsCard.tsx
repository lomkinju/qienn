import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import { ITINERARY_DATA } from '../constants';

const StatsCard: React.FC = () => {
  const totalDays = ITINERARY_DATA.length;
  const plannedDays = ITINERARY_DATA.filter(d => d.status === 'Planned').length;
  const progress = Math.round((plannedDays / totalDays) * 100);

  const data = [
    { name: 'Planned', value: plannedDays, color: '#7c3aed' }, // purple-600
    { name: 'Remaining', value: totalDays - plannedDays, color: '#374151' }, // gray-700
  ];

  return (
    <div className="bg-gray-800 rounded-xl shadow-lg border border-gray-700 p-5 flex flex-col justify-between relative overflow-hidden h-full">
      <div className="z-10">
        <h2 className="text-xl font-bold text-purple-400 mb-1">✅ 規劃進度</h2>
        <div className="flex items-baseline gap-2">
             <span className="text-4xl font-extrabold text-white">{plannedDays}</span>
             <span className="text-gray-400 font-medium">/ {totalDays} 天</span>
        </div>
        <p className="text-xs text-gray-400 mt-2">已完成 {progress}% 的行程安排</p>
      </div>

      <div className="h-32 w-full mt-4 -mr-4">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={30}
              outerRadius={45}
              paddingAngle={5}
              dataKey="value"
              stroke="none"
              startAngle={90}
              endAngle={-270}
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip 
                contentStyle={{ backgroundColor: '#1f2937', borderColor: '#374151', borderRadius: '0.5rem', color: '#fff' }}
                itemStyle={{ color: '#fff' }}
                cursor={false}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default StatsCard;