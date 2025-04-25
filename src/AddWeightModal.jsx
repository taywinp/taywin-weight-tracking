import { useState } from "react";

export default function AddWeightModal({ onSave, onClose, defaultWeight }) {
  const intPart = Math.floor(defaultWeight || 83.0);
  const decPart = Math.round((defaultWeight || 83.0) % 1 * 10);

  const [kg, setKg] = useState(intPart);
  const [decimal, setDecimal] = useState(decPart);
  const [note, setNote] = useState("");
  const now = new Date();
  const localISOTime = new Date(now.getTime() - now.getTimezoneOffset() * 60000)
    .toISOString()
    .slice(0, 16);

  const [date, setDate] = useState(localISOTime);
  const [isSaving, setIsSaving] = useState(false);

  const kgOptions = Array.from({ length: 5 }, (_, i) => intPart - 2 + i); // ±2 around the default value
  const decimalOptions = Array.from({ length: 10 }, (_, i) => i); // 0 to 9

  const handleSave = () => {
    if (isSaving) return; // Prevent multiple clicks
    setIsSaving(true);
    const weight = parseFloat(`${kg}.${decimal}`);
    onSave({ date, weight, note });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex mx-4 items-center justify-center z-50">
      <div className="bg-gray-800 text-white p-6 rounded-xl w-full max-w-md shadow-lg">
        <h2 className="text-xl font-bold mb-2 text-center">Add Weight</h2>
        <p className="text-sm text-gray-400 mb-4 text-center">
          Record your weight history
        </p>

        <label className="block mb-2">Date</label>
        <input
          type="datetime-local"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="w-full mb-4 px-3 py-2 rounded bg-gray-700 text-white"
        />

        <label className="block mb-2">Weight (kg)</label>
        <div className="flex space-x-2 mb-4">
          <select
            value={kg}
            onChange={(e) => setKg(parseInt(e.target.value))}
            className="w-1/2 px-3 py-2 rounded bg-gray-700 text-white"
          >
            {kgOptions.map((value) => (
              <option key={value} value={value}>
                {value} kg
              </option>
            ))}
          </select>
          <select
            value={decimal}
            onChange={(e) => setDecimal(parseInt(e.target.value))}
            className="w-1/2 px-3 py-2 rounded bg-gray-700 text-white"
          >
            {decimalOptions.map((value) => (
              <option key={value} value={value}>
                .{value}
              </option>
            ))}
          </select>
        </div>

        <label className="block mb-2">Note</label>
        <textarea
          placeholder="Optional note..."
          value={note}
          onChange={(e) => setNote(e.target.value)}
          className="w-full px-3 py-2 rounded bg-gray-700 text-white mb-4"
        />

        <button
          className={`w-full py-2 rounded-xl mb-2 ${isSaving ? "bg-gray-500" : "bg-emerald-500 hover:bg-emerald-600"} text-white`}
          onClick={handleSave}
          disabled={isSaving}
        >
          ✓ Save
        </button>

        <button
          className="w-full bg-gray-600 text-white py-2 rounded-xl hover:bg-gray-500"
          onClick={onClose}
        >
          Cancel
        </button>
      </div>
    </div>
  );
}
