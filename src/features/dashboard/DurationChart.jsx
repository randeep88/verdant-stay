import React from "react";
import {
  Cell,
  Pie,
  PieChart,
  ResponsiveContainer,
  Legend,
  Tooltip,
} from "recharts";

const defaultData = [
  { duration: "1 night", value: 0, color: "#ef4444" },
  { duration: "2 nights", value: 0, color: "#f97316" },
  { duration: "3 nights", value: 0, color: "#eab308" },
  { duration: "4-5 nights", value: 0, color: "#84cc16" },
  { duration: "6-7 nights", value: 0, color: "#22c55e" },
  { duration: "8-14 nights", value: 0, color: "#14b8a6" },
  { duration: "15-21 nights", value: 0, color: "#3b82f6" },
  { duration: "21+ nights", value: 0, color: "#a855f7" },
];

const prepareData = (defaultData, stays) => {
  function incArrayValue(arr, field) {
    return arr.map((obj) =>
      obj.duration === field ? { ...obj, value: obj.value + 1 } : obj
    );
  }

  const data = stays.reduce((arr, cur) => {
    const num = cur.numNights;
    if (num === 1) return incArrayValue(arr, "1 night");
    if (num === 2) return incArrayValue(arr, "2 nights");
    if (num === 3) return incArrayValue(arr, "3 nights");
    if ([4, 5].includes(num)) return incArrayValue(arr, "4-5 nights");
    if ([6, 7].includes(num)) return incArrayValue(arr, "6-7 nights");
    if (num >= 8 && num <= 14) return incArrayValue(arr, "8-14 nights");
    if (num >= 15 && num <= 21) return incArrayValue(arr, "15-21 nights");
    if (num > 21) return incArrayValue(arr, "21+ nights");
    return arr;
  }, defaultData);

  return data;
};

const DurationChart = ({ confirmedStays = [] }) => {
  const data = prepareData(defaultData, confirmedStays);
  console.log(data);

  return (
    <div className="bg-white rounded-md select-none w-[500px] h-80">
      <div>
        <h1 className="text-xl ps-5 pt-5 -mb-5 font-bold">
          Stay duration summary
        </h1>
      </div>
      <div className="w-[500px] h-80">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              nameKey="duration"
              dataKey="value"
              innerRadius={85}
              outerRadius={110}
              paddingAngle={1}
            >
              {data.map((entry) => (
                <Cell
                  fill={entry.color}
                  stroke={entry.color}
                  key={entry.duration}
                />
              ))}
            </Pie>
            <Tooltip />
            <Legend
              verticalAlign="middle"
              align="right"
              width="30%"
              layout="vertical"
              iconSize={15}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default DurationChart;
