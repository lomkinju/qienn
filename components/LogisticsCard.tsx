
import React from 'react';
import { Plane, Calendar, MapPin, Clock, ArrowRight, QrCode } from 'lucide-react';
import { FLIGHTS, ACCOMMODATION, COSTS } from '../constants';

const LogisticsCard: React.FC = () => {
  const departure = FLIGHTS.find(f => f.direction === 'Departure');
  const returnFlight = FLIGHTS.find(f => f.direction === 'Return');

  return (
    <div className="h-full flex flex-col gap-6">
      {/* 1. Boarding Pass Style Flight Card */}
      <div className="bg-white text-gray-900 rounded-3xl overflow-hidden shadow-2xl relative flex-1 min-h-[280px]">
        {/* Decorative Top Strip */}
        <div className="h-4 bg-yellow-400 w-full"></div>
        
        <div className="p-6 md:p-8 flex flex-col h-full">
            {/* Header */}
            <div className="flex justify-between items-start mb-6">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-yellow-400 rounded-full flex items-center justify-center font-bold text-xl text-black">S</div>
                    <div>
                        <h3 className="font-extrabold text-lg leading-none">SCOOT</h3>
                        <p className="text-xs text-gray-500 font-mono tracking-widest">AIRLINES</p>
                    </div>
                </div>
                <div className="text-right">
                    <p className="text-xs text-gray-400 font-bold tracking-widest uppercase">Boarding Pass</p>
                    <p className="font-mono text-indigo-600 font-bold">TR875 / TR898</p>
                </div>
            </div>

            {/* Route Main Visual */}
            <div className="flex justify-between items-center mb-8">
                <div>
                    <div className="text-4xl md:text-5xl font-black text-gray-900 tracking-tight">TPE</div>
                    <div className="text-xs md:text-sm text-gray-500 font-medium">Taipei</div>
                </div>
                <div className="flex-1 px-4 md:px-8 flex flex-col items-center">
                    <Plane className="text-indigo-400 rotate-90 mb-2" size={24} />
                    <div className="w-full h-0.5 bg-gray-300 relative">
                        <div className="absolute left-0 top-1/2 -translate-y-1/2 w-2 h-2 bg-gray-900 rounded-full"></div>
                        <div className="absolute right-0 top-1/2 -translate-y-1/2 w-2 h-2 bg-gray-900 rounded-full"></div>
                    </div>
                    <div className="text-[10px] text-gray-400 mt-1 font-mono">03H 00M</div>
                </div>
                <div className="text-right">
                    <div className="text-4xl md:text-5xl font-black text-gray-900 tracking-tight">NRT</div>
                    <div className="text-xs md:text-sm text-gray-500 font-medium">Tokyo</div>
                </div>
            </div>

            {/* Details Grid */}
            <div className="grid grid-cols-3 gap-y-4 gap-x-2 text-sm border-t border-dashed border-gray-300 pt-6">
                <div>
                    <p className="text-[10px] text-gray-400 uppercase font-bold">Date</p>
                    <p className="font-bold text-gray-800">{departure?.date.split(' ')[0]}</p>
                </div>
                <div>
                    <p className="text-[10px] text-gray-400 uppercase font-bold">Departure</p>
                    <p className="font-bold text-gray-800">{departure?.time.split('→')[0].trim()}</p>
                </div>
                <div className="text-right">
                    <p className="text-[10px] text-gray-400 uppercase font-bold">Gate</p>
                    <p className="font-bold text-gray-800">TBD</p>
                </div>

                <div>
                    <p className="text-[10px] text-gray-400 uppercase font-bold">Return Date</p>
                    <p className="font-bold text-gray-800">{returnFlight?.date.split(' ')[0]}</p>
                </div>
                 <div>
                    <p className="text-[10px] text-gray-400 uppercase font-bold">Return</p>
                    <p className="font-bold text-gray-800">{returnFlight?.time.split('→')[0].trim()}</p>
                </div>
                <div className="text-right">
                    <p className="text-[10px] text-gray-400 uppercase font-bold">Class</p>
                    <p className="font-bold text-gray-800">Economy</p>
                </div>
            </div>

            {/* Bottom Barcode Area (Visual Only) */}
            <div className="mt-auto pt-6 flex justify-between items-end opacity-60">
                <div className="h-8 w-2/3 bg-gray-900" style={{ clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%, 10% 50%)' }}>
                     {/* Fake Barcode Lines */}
                     <div className="flex h-full w-full gap-1 px-4 items-center">
                         {[...Array(20)].map((_, i) => (
                             <div key={i} className="h-full bg-white" style={{ width: Math.random() > 0.5 ? '2px' : '4px', opacity: Math.random() }}></div>
                         ))}
                     </div>
                </div>
                <QrCode size={32} className="text-gray-900" />
            </div>
        </div>

        {/* Cutout Circles */}
        <div className="absolute top-[65%] -left-3 w-6 h-6 bg-[#0c1221] rounded-full"></div>
        <div className="absolute top-[65%] -right-3 w-6 h-6 bg-[#0c1221] rounded-full"></div>
      </div>

      {/* 2. Hotel Key Card Style */}
      <div className="bg-gradient-to-br from-indigo-900 to-slate-900 rounded-2xl p-6 border border-indigo-500/30 shadow-xl relative overflow-hidden group">
         <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -mr-10 -mt-10 blur-2xl"></div>
         
         <div className="relative z-10 flex flex-col h-full justify-between">
             <div className="flex justify-between items-start">
                 <div>
                     <h3 className="text-indigo-300 font-medium text-xs tracking-[0.2em] uppercase mb-1">Accommodation</h3>
                     <h2 className="text-2xl font-bold text-white">{ACCOMMODATION.name.split(' ')[0]}</h2>
                 </div>
                 <div className="bg-white/10 p-2 rounded-lg backdrop-blur-sm">
                     <MapPin className="text-indigo-400" size={20} />
                 </div>
             </div>

             <div className="space-y-4 mt-6">
                 <div className="flex items-center gap-3 text-gray-300 text-sm">
                     <Calendar size={16} className="text-indigo-500" />
                     <span>{ACCOMMODATION.period} ({ACCOMMODATION.nights} Nights)</span>
                 </div>
                 <div className="flex items-center gap-3 text-gray-300 text-sm">
                     <MapPin size={16} className="text-indigo-500" />
                     <span>{ACCOMMODATION.location}</span>
                 </div>
                 <div className="flex items-center gap-3 text-gray-300 text-sm">
                     <Clock size={16} className="text-indigo-500" />
                     <span>Check-in: 15:00 / Check-out: 10:00</span>
                 </div>
             </div>

             <div className="mt-6 pt-4 border-t border-white/10 flex justify-between items-end">
                 <div>
                     <p className="text-xs text-gray-500 mb-1">Est. Cost Per Person</p>
                     <p className="text-xl font-bold text-white">NT$ {COSTS.accommodationPerPerson.toLocaleString()}</p>
                 </div>
                 <div className="w-12 h-8 bg-gradient-to-r from-yellow-300 to-yellow-500 rounded md:w-16 opacity-80"></div>
             </div>
         </div>
      </div>
    </div>
  );
};

export default LogisticsCard;
