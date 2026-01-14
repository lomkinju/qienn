
import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import { ITINERARY_DATA } from '../constants';

const StatsCard: React.FC = () => {
  const totalDays = ITINERARY_DATA.length;
  const plannedDays = ITINERARY_DATA.filter(d => d.status === 'Planned').length;
  const progress = Math.round((plannedDays / totalDays) * 100);

  const data = [
    { name: 'Planned', value: plannedDays, color: '#8b5cf6' },
    { name: 'Remaining', value: totalDays - plannedDays, color: '#f1f5f9' },
  ];

  return (
    <div className="bg-white rounded-3xl shadow-lg shadow-slate-200/50 p-4 flex flex-col justify-between relative overflow-hidden h-full border border-slate-100">
      <div className="z-10">
        <h2 className="text-[10px] font-bold text-indigo-400 mb-0.5 uppercase tracking-widest">規劃進度</h2>
        <div className="flex items-baseline gap-1.5">
             <span className="text-2xl font-black text-slate-800">{plannedDays}</span>
             <span className="text-slate-400 text-[10px] font-bold">/ {totalDays} DAYS</span>
        </div>
        <div className="mt-1 flex items-center gap-1.5">
            <div className="flex-1 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                <div className="bg-indigo-500 h-full transition-all duration-1000" style={{ width: `${progress}%` }}></div>
            </div>
            <span className="text-[10px] font-bold text-indigo-500">{progress}%</span>
        </div>
      </div>

      <div className="h-16 w-full mt-1">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={20}
              outerRadius={30}
              paddingAngle={2}
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
                contentStyle={{ backgroundColor: '#fff', border: 'none', borderRadius: '0.5rem', fontSize: '10px', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' }}
                cursor={false}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default StatsCard;
