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
  const [currentPage, setCurrentPage] = useState(0);

  // Select the last 10 entries for the chart
  const lastTenWeights = weights.slice(-10);

  const chartData = lastTenWeights.map((w) => ({
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

  // Group weights by month and year
  const groupedWeights = weights.reduce((acc, weight) => {
    const date = new Date(weight.Date);
    const monthYear = date.toLocaleString("en-GB", {
      year: "numeric",
      month: "long",
    });
    if (!acc[monthYear]) {
      acc[monthYear] = [];
    }
    acc[monthYear].push(weight);
    return acc;
  }, {});

  const months = Object.keys(groupedWeights).sort(
    (a, b) => new Date(b) - new Date(a)
  );
  const currentMonth = months[currentPage];
  const weightsForCurrentMonth = groupedWeights[currentMonth] || [];

  const handleNextPage = () => {
    setCurrentPage((prev) => Math.max(0, prev - 1));
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

      <div className="mt-6">
        <h2 className="text-lg font-bold mb-2 text-center">{currentMonth}</h2>
        {weightsForCurrentMonth.map((w, index) => {
          // Find the previous weight within the *entire* weights array
          const allWeightsIndex = weights.findIndex(entry => entry.id === w.id);
          const previousWeightEntry = allWeightsIndex > 0 ? weights[allWeightsIndex - 1] : null;
          const previousWeight = previousWeightEntry ? previousWeightEntry.Weight : null;

          // Check if this is the latest entry overall to apply specific styling
          const isLatestOverall = w.id === weights[weights.length - 1]?.id;

          const weightColor =
            isLatestOverall && previousWeight !== null
              ? w.Weight > previousWeight
                ? "text-red-500"
                : w.Weight < previousWeight
                ? "text-green-500"
                : "text-white"
              : "text-white";
          return (
            <div
              key={w.id}
              className={`mt-3 p-3 rounded-lg ${
                isLatestOverall ? "bg-gray-900" : "bg-gray-800"
              } text-white`}
            >
              <p
                className={`text-lg font-semibold ${
                  isLatestOverall ? weightColor : ""
                }`}
              >
                {w.Weight} kg
              </p>
              <p className="text-sm text-gray-400">{formatDate(w.Date)}</p>
              {w.Details && <p className="text-sm mt-1">{w.Details}</p>}

            </div>
          );
        })}
        <div className="flex justify-between mt-4">
          <button className="bg-gray-700 text-white px-4 py-2 rounded disabled:opacity-50" onClick={() => setCurrentPage(prev => prev + 1)} disabled={currentPage === months.length - 1}>Previous Month</button>
          <button className="bg-gray-700 text-white px-4 py-2 rounded disabled:opacity-50" onClick={handleNextPage} disabled={currentPage === 0}>Next Month</button>
        </div>
      </div>

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
