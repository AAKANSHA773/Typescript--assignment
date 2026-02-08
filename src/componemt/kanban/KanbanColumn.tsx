import { useDrop } from "react-dnd";
import { useRef, useEffect,useState } from "react";
import KanbanCard from "./KanbanCard";
import type { ColumnType } from "./Type";
import AddCardForm from "./AddCardFrom";

interface Props {
  column: ColumnType;
  addCard: (columnId: string, title: string) => void;
  deleteCard: (cardId: string, columnId: string) => void;
  updateCard: (cardId: string, title: string, columnId: string) => void;
  moveCard: (cardId: string, from: string, to: string) => void;
}

function KanbanColumn({
  column,
  addCard,
  deleteCard,
  updateCard,
  moveCard,
}: Props) {
 
  const ref = useRef<HTMLDivElement>(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [{ isOver }, drop] = useDrop(() => ({
    accept: "CARD",
    drop: (item: { id: string; columnId: string }) => {
      moveCard(item.id, item.columnId, column.id);
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
    }),
  }));

  useEffect(() => {
    if (ref.current) {
      drop(ref);
    }
  }, [drop]);

  const handleAddCard = (title: string) => {
    addCard(column.id, title);
    setShowAddForm(false);
  };

  return (
    <div
      ref={ref}
      className={`w-80 bg-gray-100 rounded-xl shadow overflow-hidden m-4 ${
        isOver ? "bg-green-100" : ""
      }`}
    >
      <div className={`${column.color} text-white px-4 py-3 flex justify-between items-center`}>
        <h2 className="font-semibold">{column.title}</h2>

        <button
          onClick={() => setShowAddForm(true)}
          className="bg-white/20 px-2 py-1 rounded hover:bg-white/30"
        >
          +
        </button>
      </div>
      <div className="p-3">
        <button
          onClick={() => setShowAddForm(true)}
          className="w-full border border-dashed border-gray-400 rounded-lg py-2 text-sm hover:bg-gray-200"
        >
          + Add Card

        
        </button>
      </div>
      {showAddForm && (
        <div className="px-3 pb-3">
          <AddCardForm
            onAdd={handleAddCard}
            onCancel={() => setShowAddForm(false)}
          />
        </div>
      )}
      <div className="px-3 pb-4 space-y-3">
        {column.cards.map((card) => (
          <KanbanCard
            key={card.id}
            card={card}
            columnId={column.id}
            deleteCard={deleteCard}
            updateCard={updateCard}
          />
        ))}
      </div>
    </div>
  );
}

export default KanbanColumn;
