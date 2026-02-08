import { useState } from "react";
import { useDrag } from "react-dnd";

export interface CardType {
  id: string;
  title: string;
}

interface Props {
  card: CardType;
  columnId: string;
  deleteCard: (cardId: string, columnId: string) => void;
  updateCard: (cardId: string, title: string, columnId: string) => void;
}

function KanbanCard({ card, columnId, deleteCard, updateCard }: Props) {
  const [edit, setEdit] = useState(false);
  const [text, setText] = useState(card.title);

  const [{ isDragging }, drag] = useDrag(() => ({
    type: "CARD",
    item: { id: card.id, columnId },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  }));

  const saveChange = () => {
    if (!text.trim()) return;
    updateCard(card.id, text, columnId);
    setEdit(false);
  };

  return (
    <div
      ref={(node) => {
        if (node) drag(node);
      }}
      className="bg-white p-3 rounded-lg shadow-sm border flex gap-3 items-start hover:shadow-md transition"
      style={{ opacity: isDragging ? 0.5 : 1 }}
    >
      <div
        className={`w-1.5 self-stretch rounded-sm ${
          columnId === "todo"
            ? "bg-yellow-400"
            : columnId === "progress"
              ? "bg-yellow-500"
              : "bg-yellow-500"
        }`}
      />
      <div className="flex-1">
        {edit ? (
          <input
            className="border p-1 rounded w-full text-sm"
            value={text}
            autoFocus
            onChange={(e) => setText(e.target.value)}
            onBlur={saveChange}
            onKeyDown={(e) => e.key === "Enter" && saveChange()}
          />
        ) : (
          <>
            <p
              className="text-sm font-medium cursor-pointer"
              onDoubleClick={() => setEdit(true)}
            >
              {card.title}
            </p>

            <div className="w-16 h-1 bg-gray-300 rounded mt-2" />
          </>
        )}
      </div>


      <button
        onClick={() => deleteCard(card.id, columnId)}
        className="text-red-400 hover:text-red-600 text-sm"
      >
        🗑
      </button>
    </div>
  );
}

export default KanbanCard;
