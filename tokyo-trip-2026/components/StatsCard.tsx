
import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import { ITINERARY_DATA } from '../constants';

const StatsCard: React.FC = () => {
  const totalDays = ITINERARY_DATA.length;
  const plannedDays = ITINERARY_DATA.filter(d => d.status === 'Planned').length;
  const progress = Math.round((plannedDays / totalDays) * 100);

  const data = [
    { name: 'Planned', value: plannedDays, color: '#8b5cf6' }, // violet-500
    { name: 'Remaining', value: totalDays - plannedDays, color: '#e2e8f0' }, // slate-200
  ];

  return (
    <div className="bg-white rounded-3xl shadow-xl shadow-slate-200/50 p-6 flex flex-col justify-between relative overflow-hidden h-full border border-slate-100">
      <div className="z-10">
        <h2 className="text-lg font-bold text-indigo-500 mb-1 uppercase tracking-wider">規劃進度</h2>
        <div className="flex items-baseline gap-2">
             <span className="text-4xl font-extrabold text-slate-800">{plannedDays}</span>
             <span className="text-slate-400 font-medium">/ {totalDays} 天</span>
        </div>
        <p className="text-xs text-slate-500 mt-2">已完成 {progress}% 的行程安排</p>
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
                contentStyle={{ backgroundColor: '#fff', borderColor: '#e2e8f0', borderRadius: '0.5rem', color: '#1e293b', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' }}
                itemStyle={{ color: '#1e293b' }}
                cursor={false}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default StatsCard;
