import React from 'react'
import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';

const chart = () => {
const data = [
  {
    subject: 'Math',
    A: 120,
    B: 110,
    fullMark: 150,
  },
  {
    subject: 'Chinese',
    A: 98,
    B: 130,
    fullMark: 150,
  },
  {
    subject: 'English',
    A: 86,
    B: 130,
    fullMark: 150,
  },
  {
    subject: 'Geography',
    A: 99,
    B: 100,
    fullMark: 150,
  },
  {
    subject: 'Physics',
    A: 85,
    B: 90,
    fullMark: 150,
  },
  {
    subject: 'History',
    A: 65,
    B: 85,
    fullMark: 150,
  },
];
  return (
    <>
        <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={data} >
              <CartesianGrid
                strokeDasharray='3  3'
                strokeWidth="4 4"
                vertical={false}
              />
                <Area dataKey="B" 
                      type="monotone" 
                      stroke="#06b6d4"
                      fill={`url(#cyan-gradient)`}/>
                      <XAxis 
                            dataKey="A" 
                             stroke='#1e293b' 
                             tickLine={false}
                             axisLine={false}
                             interval={1}
                             fontSize={12}

                             />
                             <YAxis dataKey="B" 
                             stroke='#1e293b' 
                             tickLine={false}
                             axisLine={false}
                             interval={1}
                             fontSize={12}
                             />
                             <Tooltip cursor={{
                              fill: "#1e293b",
                              radius : 4,
                              stroke : '#1e293b'                             }}/>
                <defs>
                    <linearGradient id="cyan-gradient" x1="0" y1="0" x2="0" y2="1" >
                        <stop offset="0%" stopColor='#06b6d4' stopOpacity={0.4}/>
                        <stop offset="75%" stopColor='#8b5cf6' stopOpacity={0.05}/>

                    </linearGradient>
                </defs>
             </AreaChart>
          </ResponsiveContainer>  
    </>
  ) 
}

export default chart