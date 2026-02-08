import React from "react";

const KanbanColumn = () => {
  return (
    <div className="bg-gray-100 rounded-xl p-4 w-80 min-h-[500px] shadow-sm">
      
      {/* Column title */}
      <h2 className="text-lg font-semibold mb-4">Todo</h2>

      {/* Cards container */}
      <div className="space-y-3">
        {/* Example card */}
        <div className="bg-white p-3 rounded-lg shadow cursor-pointer">
          Sample Task
        </div>
      </div>

      {/* Add card button */}
      <button className="mt-4 w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600">
        + Add Card
      </button>

    </div>
  );
};

export default KanbanColumn;
