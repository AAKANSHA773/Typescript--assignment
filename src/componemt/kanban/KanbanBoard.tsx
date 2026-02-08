import { useState } from "react";
import KanbanColumn from "./KanbanColumn";
import type {ColumnType } from "./Type"


function KanbanBoard() {
  const [columns, setColumns] = useState<ColumnType[]>([
    {
      id: "todo",
      title: "Todo",
      color: "bg-blue-600",
      cards: [{ id: "1", title: "Sample task" }],
    },
    {
      id: "progress",
      title: "In Progress",
      color: "bg-orange-500",
      cards: [],
    },
    {
      id: "done",
      title: "Done",
      color: "bg-green-600",
      cards: [],
    },
  ]);


  const addCard = (columnId: string) => {
    const input = prompt("Enter card title");
    if (!input) return;

    setColumns((prev) =>
      prev.map((col) =>
        col.id === columnId
          ? {
              ...col,
              cards: [
                ...col.cards,
                { id: Date.now().toString(), title: input },
              ],
            }
          : col
      )
    );
  };

  const deleteCard = (cardId: string, columnId: string) => {
    setColumns((prev) =>
      prev.map((col) =>
        col.id === columnId
          ? {
              ...col,
              cards: col.cards.filter((c) => c.id !== cardId),
            }
          : col
      )
    );
  };

  const updateCard = (cardId: string, title: string, columnId: string) => {
    setColumns((prev) =>
      prev.map((col) =>
        col.id === columnId
          ? {
              ...col,
              cards: col.cards.map((c) =>
                c.id === cardId ? { ...c, title } : c
              ),
            }
          : col
      )
    );
  };

const moveCard = (cardId: string, from: string, to: string) => {
  if (from === to) return;

  setColumns((prev) => {
    const sourceColumn = prev.find((col) => col.id === from);
    const targetColumn = prev.find((col) => col.id === to);

    if (!sourceColumn || !targetColumn) return prev;

    const movedCard = sourceColumn.cards.find((c) => c.id === cardId);
    if (!movedCard) return prev;

    return prev.map((col) => {
      // remove from source
      if (col.id === from) {
        return {
          ...col,
          cards: col.cards.filter((c) => c.id !== cardId),
        };
      }

      // add to target
      if (col.id === to) {
        return {
          ...col,
          cards: [...col.cards, movedCard],
        };
      }

      return col;
    });
  });
};

  return (
    <div className="min-h-screen bg-gray-200 flex gap-6 justify-center pt-10 flex-wrap">
      {columns.map((col) => (
        <KanbanColumn
          key={col.id}
          column={col}
          moveCard={moveCard}
          addCard={addCard}
          deleteCard={deleteCard}
          updateCard={updateCard}
        />
      ))}
    </div>
  );
}

export default KanbanBoard;
