import React from "react";

interface Card {
  id: string;
  title: string;
}

interface Props {
  title: string;
  color: string; 
  cards: Card[];
}

const KanbanColumn: React.FC<Props> = ({ title, color, cards }) => {
  return (
    <div className="w-80 bg-gray-100 rounded-xl shadow-sm overflow-hidden m-2">
      <div className={`${color} text-white px-4 py-3 flex justify-between items-center`}>
        <h2 className="font-semibold">{title}</h2>

        <button className="bg-white/20 hover:bg-white/30 px-2 py-1 rounded">
          +
        </button>
      </div>

      <div className="p-3">
        <button className="w-full border border-dashed border-gray-400 rounded-lg py-2 text-sm hover:bg-gray-200">
          + Add Card
        </button>
      </div>


      <div className="px-3 pb-4 space-y-3">
        {cards.map((card) => (
          <div
            key={card.id}
            className="bg-white p-3 rounded-lg shadow-sm border"
          >
            <p className="text-sm">{card.title}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default KanbanColumn;
