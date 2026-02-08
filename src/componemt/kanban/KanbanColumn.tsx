import { useState } from "react";
import KanbanCard from "./KanbanCard";

interface CardType {
  id: string;
  title: string;
}

interface Props {
  title: string;
  color: string;
  columnId: string; 
}

function KanbanColumn({ title, color, columnId }: Props) {
  const [cards, setCards] = useState<CardType[]>([
    { id: "1", title: "Sample task" },
  ]);

  const deleteCard = (cardId: string) => {
    setCards((prev) => prev.filter((card) => card.id !== cardId));
  };

  const updateCard = (cardId: string, newTitle: string) => {
    setCards((prev) =>
      prev.map((card) =>
        card.id === cardId ? { ...card, title: newTitle } : card
      )
    );
  };

  const addCard = () => {
    const input = prompt("Enter card title");
    if (!input) return;

    setCards((prev) => [
      ...prev,
      { id: Date.now().toString(), title: input },
    ]);
  };

  return (
    <div className="w-80 bg-gray-100 rounded-xl shadow overflow-hidden m-4">
      <div className={`${color} text-white px-4 py-3 flex justify-between items-center`}>
        <h2 className="font-semibold">{title}</h2>
        <button
          onClick={addCard}
          className="bg-white/20 px-2 py-1 rounded hover:bg-white/30"
        >
          +
        </button>
      </div>
      <div className="p-3">
        <button
          onClick={addCard}
          className="w-full border border-dashed border-gray-400 rounded-lg py-2 text-sm hover:bg-gray-200"
        >
          + Add Card
        </button>
      </div>

      <div className="px-3 pb-4 space-y-3">
        {cards.map((card) => (
          <KanbanCard
            key={card.id}
            card={card}
            columnId={columnId} 
            deleteCard={(id) => deleteCard(id)}
            updateCard={(id, title) => updateCard(id, title)}
          />
        ))}
      </div>
    </div>
  );
}

export default KanbanColumn;
