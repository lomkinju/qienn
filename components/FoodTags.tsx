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
    <section className="bg-gray-800 p-5 rounded-xl shadow-lg border border-gray-700 h-full flex flex-col">
      <h2 className="text-xl font-bold text-pink-400 mb-4 border-b border-pink-500/30 pb-2 flex items-center gap-2">
        <Utensils size={20} /> 必吃美食清單
      </h2>
      
      <div className="flex-grow">
        <div className="flex flex-wrap gap-2 mb-4">
          {foodList.map((food, index) => (
            <div
              key={index}
              className="group relative flex items-center"
            >
                <span className="px-3 py-1.5 bg-pink-900/40 text-pink-200 rounded-full text-sm font-medium border border-pink-700/50 cursor-default pr-7">
                    {food}
                </span>
                <button
                    onClick={() => onDeleteFood(food)}
                    className="absolute right-1 p-0.5 text-pink-300/50 hover:text-red-400 hover:bg-red-900/30 rounded-full transition-colors opacity-0 group-hover:opacity-100"
                >
                    <X size={12} />
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
                className="flex-grow bg-gray-900 border border-gray-600 rounded px-3 py-1.5 text-sm text-white focus:border-pink-500 outline-none"
             />
             <button 
                type="submit" 
                className="bg-pink-600 hover:bg-pink-500 text-white px-3 py-1.5 rounded text-sm font-bold"
             >
                <Plus size={16} />
             </button>
             <button 
                type="button" 
                onClick={() => setIsAdding(false)}
                className="bg-gray-700 hover:bg-gray-600 text-gray-300 px-3 py-1.5 rounded text-sm"
             >
                <X size={16} />
             </button>
          </form>
      ) : (
          <button 
            onClick={() => setIsAdding(true)}
            className="w-full py-2 border border-dashed border-gray-600 rounded text-sm text-gray-500 hover:text-pink-400 hover:border-pink-500/50 hover:bg-pink-900/10 transition-colors flex items-center justify-center gap-2"
          >
             <Plus size={14} /> 新增美食
          </button>
      )}
    </section>
  );
};

export default FoodTags;