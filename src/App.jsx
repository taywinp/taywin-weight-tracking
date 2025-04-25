import { useState, useEffect } from "react";
import AddWeightModal from "./AddWeightModal";
import { fetchWeights, addWeightEntry } from "./api";
import {
  LineChart,
  Line,
  XAxis,
  YAxis, // Import YAxis
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

function App() {
  const [showModal, setShowModal] = useState(false);
  const [weights, setWeights] = useState([]);

  const chartData = weights.map((w) => ({
    date: new Date(w.Date).toLocaleDateString("en-GB", {
      day: "numeric",
      month: "numeric",
    }),

    weight: w.Weight,
  }));

  useEffect(() => {
    fetchWeights().then(setWeights);
  }, []);

  const handleSave = async (entry) => {
    const newEntry = await addWeightEntry(entry);
    setWeights((prev) => [...prev, newEntry]);
    setShowModal(false);
  };

  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    return date.toLocaleString("en-GB", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    });
  };
  
  return (
    <div className="min-h-screen bg-black text-white p-4 mx-auto font-sans">
      <h1 className="text-xl font-bold mb-4 text-center">Pantagon Weight Tracking</h1>
      <div className="mb-6">
        <ResponsiveContainer width="100%" height={300}>
          <LineChart
            data={chartData}
            margin={{ top: 10, right: 0, bottom: 30, left: -20 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#444" />
            <XAxis
              dataKey="date"
              stroke="#ccc"
              interval={0}
              padding={{ left: 20, right: 20 }} // Add horizontal padding
              tick={({ x, y, payload }) => (
                <text
                  x={x}
                  y={y + 30}
                  transform={`rotate(90, ${x}, ${y + 25})`}
                  textAnchor="start"
                  fontSize={10}
                  fill="#ccc"
                  >
                  {payload.value}
                </text>
              )}
              />

            <YAxis
              fontSize={13}
              domain={["dataMin - 1", "dataMax + 1"]} // Adjust domain for sensitivity
              stroke="#ccc"
            />
            <Tooltip />
            <Line
              type="monotone"
              dataKey="weight"
              stroke="#10b981"
              strokeWidth={3}
              dot={{ r: 5, fill: "#10b981" }}
              activeDot={{ r: 6 }}
              label={({ x, y, value }) => (
                <text
                  x={x}
                  y={y - 10}
                  fill="#ccc"
                  fontSize={12}
                  textAnchor="middle"
                >
                  {value}
                </text>
              )}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <button
        className="bg-emerald-500 text-white px-4 py-2 rounded w-full hover:bg-emerald-600"
        onClick={() => setShowModal(true)}
      >
        + Add
      </button>

      {weights
        .slice()
        .reverse()
        .map((w, index) => {
          const isLatest = index === 0; // Latest is now the first item after reversing
          const previousWeight =
            index < weights.length - 1
              ? weights[weights.length - index - 2].Weight
              : null;
          const weightColor =
            isLatest && previousWeight !== null
              ? w.Weight > previousWeight
                ? "text-red-500"
                : "text-green-500"
              : "text-white";

          return (
            <div
              key={w.id}
              className={`mt-3 p-3 rounded-lg ${
                isLatest ? "bg-gray-900" : "bg-gray-800"
              } text-white`}
            >
              <p
                className={`text-lg font-semibold ${
                  isLatest ? weightColor : ""
                }`}
              >
                {w.Weight} kg
              </p>
              <p className="text-sm text-gray-400">{formatDate(w.Date)}</p>
              {w.Details && <p className="text-sm mt-1">{w.Details}</p>}
            </div>
          );
        })}

      {showModal && (
        <AddWeightModal
          onSave={handleSave}
          onClose={() => setShowModal(false)}
          defaultWeight={
            weights.length > 0 ? weights[weights.length - 1].Weight : 83.0
          }
        />
      )}
    </div>
  );
}

export default App;
