
import React, { useState } from 'react';
import { Utensils, Plus, X } from 'lucide-react';

interface FoodTagsProps {
  foodList: string[];
  onAddFood: (food: string) => void;
  onDeleteFood: (food: string) => void;
}

const FoodTags: React.FC<FoodTagsProps> = ({ foodList, onAddFood, onDeleteFood }) => {
  const [newFood, setNewFood] = useState('');
  const [isAdding, setIsAdding] = useState(false);

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (newFood.trim()) {
      onAddFood(newFood.trim());
      setNewFood('');
      setIsAdding(false);
    }
  };

  return (
    <section className="bg-white p-6 rounded-3xl shadow-xl shadow-slate-200/50 border border-slate-100 h-full flex flex-col">
      <h2 className="text-xl font-bold text-pink-500 mb-6 border-b border-pink-100 pb-2 flex items-center gap-2">
        <Utensils size={20} /> 必吃美食清單
      </h2>
      
      <div className="flex-grow">
        <div className="flex flex-wrap gap-2.5 mb-4">
          {foodList.map((food, index) => (
            <div
              key={index}
              className="group relative flex items-center"
            >
                <span className="px-3.5 py-1.5 bg-pink-50 text-pink-600 rounded-full text-sm font-medium border border-pink-100 cursor-default pr-7 hover:bg-pink-100 transition-colors">
                    {food}
                </span>
                <button
                    onClick={() => onDeleteFood(food)}
                    className="absolute right-1 p-0.5 text-pink-300 hover:text-red-500 hover:bg-red-50 rounded-full transition-colors opacity-0 group-hover:opacity-100"
                >
                    <X size={14} />
                </button>
            </div>
          ))}
        </div>
      </div>

      {isAdding ? (
          <form onSubmit={handleAdd} className="flex gap-2 animate-in fade-in duration-200">
             <input 
                type="text" 
                value={newFood}
                onChange={(e) => setNewFood(e.target.value)}
                placeholder="輸入美食名稱..."
                autoFocus
                className="flex-grow bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-sm text-slate-800 focus:border-pink-400 outline-none"
             />
             <button 
                type="submit" 
                className="bg-pink-500 hover:bg-pink-600 text-white px-3 py-1.5 rounded-lg text-sm font-bold shadow-sm"
             >
                <Plus size={16} />
             </button>
             <button 
                type="button" 
                onClick={() => setIsAdding(false)}
                className="bg-slate-100 hover:bg-slate-200 text-slate-500 px-3 py-1.5 rounded-lg text-sm"
             >
                <X size={16} />
             </button>
          </form>
      ) : (
          <button 
            onClick={() => setIsAdding(true)}
            className="w-full py-2.5 border-2 border-dashed border-slate-200 rounded-xl text-sm text-slate-400 hover:text-pink-500 hover:border-pink-200 hover:bg-pink-50/50 transition-colors flex items-center justify-center gap-2 font-medium"
          >
             <Plus size={16} /> 新增美食
          </button>
      )}
    </section>
  );
};

export default FoodTags;
