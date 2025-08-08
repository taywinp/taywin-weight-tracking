
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

  const [exercise, setExercise] = useState(false);

  const [date, setDate] = useState(localISOTime);
  const [isSaving, setIsSaving] = useState(false);

  const kgOptions = Array.from({ length: 5 }, (_, i) => intPart - 2 + i); // ±2 around the default value
  const decimalOptions = Array.from({ length: 10 }, (_, i) => i); // 0 to 9

  const handleSave = () => {
    if (isSaving) return; // Prevent multiple clicks
    setIsSaving(true);
    const weight = parseFloat(`${kg}.${decimal}`);
    onSave({ date, weight, note, exercise });
  };

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-gradient-to-br from-gray-800 to-gray-900 text-white p-6 rounded-2xl w-full max-w-md shadow-2xl border border-gray-700/50">
        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold mb-2 bg-gradient-to-r from-emerald-400 to-emerald-600 bg-clip-text text-transparent">
            Add Weight Entry
          </h2>
          <p className="text-sm text-gray-400">
            Record your weight and track your progress
          </p>
        </div>

        <div className="space-y-4">
          {/* Exercise Switch */}
          <div>
            <label className="block text-sm font-medium text-emerald-400 mb-2 flex items-center gap-2">
              <span>🏃‍♂️ Exercise</span>
              <span className="ml-2 text-xs text-gray-400">(Did you exercise?)</span>
            </label>
            <button
              type="button"
              className={`w-14 h-8 flex items-center rounded-full p-1 transition-colors duration-200 focus:outline-none ${exercise ? 'bg-emerald-500' : 'bg-gray-600'}`}
              onClick={() => setExercise((v) => !v)}
              aria-pressed={exercise}
            >
              <span className={`w-6 h-6 bg-white rounded-full shadow-md transform transition-transform duration-200 ${exercise ? 'translate-x-6' : ''}`}></span>
            </button>
            <span className={`ml-3 text-sm font-semibold ${exercise ? 'text-emerald-400' : 'text-gray-400'}`}>{exercise ? 'Yes' : 'No'}</span>
          </div>
          <div>
            <label className="block text-sm font-medium text-emerald-400 mb-2">
              📅 Date & Time
            </label>
            <input
              type="datetime-local"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="w-full px-4 py-3 rounded-xl bg-gray-700/50 text-white border border-gray-600/50 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-all"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-emerald-400 mb-2">
              ⚖️ Weight (kg)
            </label>
            <div className="flex space-x-2">
              <select
                value={kg}
                onChange={(e) => setKg(parseInt(e.target.value))}
                className="flex-1 px-4 py-3 rounded-xl bg-gray-700/50 text-white border border-gray-600/50 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-all"
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
                className="flex-1 px-4 py-3 rounded-xl bg-gray-700/50 text-white border border-gray-600/50 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-all"
              >
                {decimalOptions.map((value) => (
                  <option key={value} value={value}>
                    .{value}
                  </option>
                ))}
              </select>
            </div>
            <div className="mt-2 text-center">
              <span className="inline-block bg-emerald-500/20 text-emerald-400 px-3 py-1 rounded-full text-sm font-medium">
                Total: {kg}.{decimal} kg
              </span>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-emerald-400 mb-2">
              📝 Note (Optional)
            </label>
            <textarea
              placeholder="Add any notes about your weight entry..."
              value={note}
              onChange={(e) => setNote(e.target.value)}
              rows={3}
              className="w-full px-4 py-3 rounded-xl bg-gray-700/50 text-white border border-gray-600/50 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-all resize-none"
            />
          </div>
        </div>

        <div className="flex space-x-3 mt-6">
          <button
            className={`flex-1 py-3 rounded-xl font-medium transition-all duration-200 ${
              isSaving 
                ? "bg-gray-500 cursor-not-allowed" 
                : "bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 shadow-lg shadow-emerald-500/20"
            } text-white`}
            onClick={handleSave}
            disabled={isSaving}
          >
            {isSaving ? (
              <span className="flex items-center justify-center gap-2">
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                Saving...
              </span>
            ) : (
              <span className="flex items-center justify-center gap-2">
                <span>✓</span>
                Save Entry
              </span>
            )}
          </button>

          <button
            className="flex-1 bg-gray-600/50 text-white py-3 rounded-xl hover:bg-gray-600 transition-all duration-200 font-medium border border-gray-600/50"
            onClick={onClose}
            disabled={isSaving}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
