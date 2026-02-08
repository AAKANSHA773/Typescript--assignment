import { useState } from "react";

interface Props {
  onAdd: (title: string) => void;
  onCancel: () => void;
}

function AddCardForm({ onAdd, onCancel }: Props) {
  const [title, setTitle] = useState("");

  const handleAdd = () => {
    if (!title.trim()) return;
    onAdd(title);
    setTitle("");
  };

  return (
    <div className="bg-white p-3 rounded-lg shadow border space-y-2">
      <input
        className="w-full border p-2 rounded text-sm"
        placeholder="Enter card title..."
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <div className="flex gap-2">
        <button
          onClick={handleAdd}
          className="bg-blue-600 text-white px-3 py-1 rounded text-sm"
        >
          Add
        </button>

        <button
          onClick={onCancel}
          className="bg-gray-300 px-3 py-1 rounded text-sm"
        >
          Cancel
        </button>
      </div>
    </div>
  );
}

export default AddCardForm;
