
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import KanbanColumn from "./KanbanColumn";

function KanbanBoard() {
  return (
    <DndProvider backend={HTML5Backend}>
      <div className="min-h-screen bg-gray-200 flex gap-6 justify-center pt-10 flex-wrap">
        <KanbanColumn title="Todo" color="bg-blue-600" columnId="todo" />
        <KanbanColumn title="In Progress" color="bg-orange-500" columnId="progress" />
        <KanbanColumn title="Done" color="bg-green-600" columnId="done" />

      </div>
    </DndProvider>
  );
}



export default KanbanBoard
