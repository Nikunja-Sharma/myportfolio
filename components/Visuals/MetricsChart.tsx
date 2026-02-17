import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const data = [
  { time: '00:00', load: 400 },
  { time: '04:00', load: 300 },
  { time: '08:00', load: 900 },
  { time: '12:00', load: 1200 },
  { time: '16:00', load: 1100 },
  { time: '20:00', load: 800 },
  { time: '24:00', load: 500 },
];

export const MetricsChart = () => {
  return (
    <div className="w-full h-32 mt-4 bg-background/50 border border-border rounded-lg p-2">
      <div className="text-xs text-textMuted font-mono mb-2">LIVE SYSTEM LOAD (REQ/S)</div>
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data}>
          <defs>
            <linearGradient id="colorLoad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#00E5FF" stopOpacity={0.3}/>
              <stop offset="95%" stopColor="#00E5FF" stopOpacity={0}/>
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="#30363D" vertical={false} />
          <XAxis dataKey="time" hide />
          <YAxis hide domain={[0, 1500]} />
          <Tooltip 
            contentStyle={{ backgroundColor: '#0B0F14', borderColor: '#30363D', color: '#E6EDF3' }}
            itemStyle={{ color: '#00E5FF' }}
            formatter={(value: any) => [`${value} req/s`, 'Load']}
          />
          <Area type="monotone" dataKey="load" stroke="#00E5FF" fillOpacity={1} fill="url(#colorLoad)" />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};
