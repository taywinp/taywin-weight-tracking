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
      day: "2-digit",
      month: "short",
    }),
    fullDate: new Date(w.Date).toLocaleDateString("en-GB", {
      day: "numeric",
      month: "short",
      year: "numeric",
    }),
    weight: w.Weight,
  }));

  useEffect(() => {
    fetchWeights().then(setWeights);
  }, []);

  // Calculate statistics
  const stats = weights.length > 1 ? {
    totalChange: weights[weights.length - 1].Weight - weights[0].Weight,
    minWeight: Math.min(...weights.map(w => w.Weight)),
    maxWeight: Math.max(...weights.map(w => w.Weight)),
    avgWeight: weights.reduce((sum, w) => sum + w.Weight, 0) / weights.length,
  } : null;

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
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 text-white font-sans">
      <div className="max-w-md mx-auto p-4">
        {/* Header */}
        <div className="text-center mb-8 pt-4">
          <h1 className="text-2xl font-bold mb-2 bg-gradient-to-r from-emerald-400 to-emerald-600 bg-clip-text text-transparent">
            Pantagon Weight Tracking
          </h1>
          {weights.length > 0 && (
            <div className="text-sm text-gray-400">
              {weights.length} entries • Latest: {formatDate(weights[weights.length - 1].Date)}
            </div>
          )}
        </div>

        {/* Chart Section */}
        <div className="mb-8 bg-gray-800/50 rounded-2xl p-4 border border-gray-700/50 backdrop-blur-sm">
          <div className="mb-4">
            <h2 className="text-lg font-semibold text-emerald-400 mb-1">Weight Progress</h2>
            <div className="text-sm text-gray-400">
              {weights.length > 1 && (
                <>
                  {(() => {
                    const latest = weights[weights.length - 1].Weight;
                    const previous = weights[weights.length - 2].Weight;
                    const diff = latest - previous;
                    const isIncrease = diff > 0;
                    return (
                      <div className="space-y-1">
                        <div className="flex items-center justify-between">
                          <span>Latest: <span className="text-white font-medium">{latest}kg</span></span>
                          <span>Previous: <span className="text-white font-medium">{previous}kg</span></span>
                        </div>
                        <span className={`inline-flex items-center gap-1 ${isIncrease ? 'text-red-400' : 'text-green-400'}`}>
                          {isIncrease ? '↗' : '↘'} {Math.abs(diff).toFixed(1)}kg from last entry
                        </span>
                      </div>
                    );
                  })()}
                </>
              )}
            </div>
          </div>
          <ResponsiveContainer width="100%" height={280}>
            <LineChart
              data={chartData}
              margin={{ top: 20, right: 15, bottom: 40, left: -10 }}
            >
              <CartesianGrid strokeDasharray="2 2" stroke="#374151" strokeOpacity={0.3} />
              <XAxis
                dataKey="date"
                stroke="#9CA3AF"
                interval={Math.max(0, Math.floor(chartData.length / 8))} // Show fewer labels on crowded charts
                padding={{ left: 15, right: 15 }}
                tick={({ x, y, payload }) => (
                  <text
                    x={x}
                    y={y + 35}
                    transform={`rotate(45, ${x}, ${y + 30})`}
                    textAnchor="start"
                    fontSize={9}
                    fill="#9CA3AF"
                  >
                    {payload.value}
                  </text>
                )}
              />
              <YAxis
                fontSize={11}
                domain={["dataMin - 0.5", "dataMax + 0.5"]}
                stroke="#9CA3AF"
                tickFormatter={(value) => `${value}kg`}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#1F2937',
                  border: '1px solid #374151',
                  borderRadius: '8px',
                  fontSize: '12px'
                }}
                labelStyle={{ color: '#D1D5DB' }}
              />
              <Line
                type="monotone"
                dataKey="weight"
                stroke="#10b981"
                strokeWidth={2.5}
                dot={{ r: 4, fill: "#10b981", strokeWidth: 2, stroke: "#064E3B" }}
                activeDot={{ r: 6, stroke: "#10b981", strokeWidth: 2, fill: "#ffffff" }}
                label={({ x, y, value }) => (
                  <text
                    x={x}
                    y={y - 12}
                    fill="#D1D5DB"
                    fontSize={10}
                    textAnchor="middle"
                    fontWeight="500"
                  >
                    {value}
                  </text>
                )}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Statistics Section */}
        {stats && (
          <div className="mb-6 grid grid-cols-2 gap-3">
            <div className="bg-gray-800/40 rounded-xl p-3 border border-gray-700/50">
              <div className="text-xs text-gray-400 mb-1">Total Change</div>
              <div className={`text-lg font-bold ${stats.totalChange >= 0 ? 'text-red-400' : 'text-green-400'}`}>
                {stats.totalChange >= 0 ? '+' : ''}{stats.totalChange.toFixed(1)}kg
              </div>
            </div>
            <div className="bg-gray-800/40 rounded-xl p-3 border border-gray-700/50">
              <div className="text-xs text-gray-400 mb-1">Average</div>
              <div className="text-lg font-bold text-white">
                {stats.avgWeight.toFixed(1)}kg
              </div>
            </div>
            <div className="bg-gray-800/40 rounded-xl p-3 border border-gray-700/50">
              <div className="text-xs text-gray-400 mb-1">Minimum</div>
              <div className="text-lg font-bold text-green-400">
                {stats.minWeight.toFixed(1)}kg
              </div>
            </div>
            <div className="bg-gray-800/40 rounded-xl p-3 border border-gray-700/50">
              <div className="text-xs text-gray-400 mb-1">Maximum</div>
              <div className="text-lg font-bold text-red-400">
                {stats.maxWeight.toFixed(1)}kg
              </div>
            </div>
          </div>
        )}

        {/* Add Button */}
        <button
          className="bg-gradient-to-r from-emerald-500 to-emerald-600 text-white px-6 py-3 rounded-xl w-full hover:from-emerald-600 hover:to-emerald-700 transition-all duration-200 shadow-lg shadow-emerald-500/20 font-medium mb-6"
          onClick={() => setShowModal(true)}
        >
          <span className="flex items-center justify-center gap-2">
            <span className="text-lg">+</span>
            Add Weight Entry
          </span>
        </button>

        {/* Weight History */}
        <div className="space-y-3">
          <h3 className="text-lg font-semibold text-emerald-400 mb-4">Recent Entries</h3>
          {weights
            .slice()
            .reverse()
            .map((w, index) => {
              const isLatest = index === 0;
              const previousWeight =
                index < weights.length - 1
                  ? weights[weights.length - index - 2].Weight
                  : null;

              const weightDiff = previousWeight !== null ? w.Weight - previousWeight : 0;
              const weightColor =
                isLatest && previousWeight !== null
                  ? w.Weight > previousWeight
                    ? "text-red-400"
                    : "text-green-400"
                  : "text-white";

              return (
                <div
                  key={w.id}
                  className={`relative p-4 rounded-xl border transition-all duration-200 ${
                    isLatest 
                      ? "bg-gradient-to-br from-gray-800/80 to-gray-700/80 border-emerald-500/30 shadow-lg" 
                      : "bg-gray-800/40 border-gray-700/50 hover:bg-gray-800/60"
                  } backdrop-blur-sm`}
                >
                  {isLatest && (
                    <div className="absolute -top-2 -right-2 bg-emerald-500 text-xs px-2 py-1 rounded-full font-medium">
                      Latest
                    </div>
                  )}
                  
                  <div className="flex justify-between items-start">
                    <div>
                      <p className={`text-xl font-bold flex items-center gap-2 ${isLatest ? weightColor : "text-white"}`}>
                        {w.Weight} kg
                        {w.Exercise === true && (
                          <span title="Exercised" className="inline-block align-middle text-emerald-400 text-lg ml-1">🏃‍♂️</span>
                        )}
                      </p>
                      {isLatest && previousWeight !== null && (
                        <p className={`text-sm font-medium ${weightColor}`}>
                          {weightDiff > 0 ? '+' : ''}{weightDiff.toFixed(1)}kg from previous
                        </p>
                      )}
                      <p className="text-sm text-gray-400 mt-1">{formatDate(w.Date)}</p>
                      {w.Details && (
                        <p className="text-sm mt-2 text-gray-300 bg-gray-700/50 px-2 py-1 rounded">
                          {w.Details}
                        </p>
                      )}
                    </div>
                    
                    {isLatest && previousWeight !== null && (
                      <div className={`text-2xl ${weightColor}`}>
                        {w.Weight > previousWeight ? '↗️' : '↘️'}
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
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