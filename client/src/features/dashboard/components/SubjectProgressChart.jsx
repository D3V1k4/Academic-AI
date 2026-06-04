import React from "react";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
} from "recharts";

const data = [
  { name: "OS", value: 80 },
  { name: "DBMS", value: 65 },
  { name: "CN", value: 45 },
  { name: "DAA", value: 90 },
];

const COLORS = [
  "#F5C842",
  "#4ECDC4",
  "#FF6B6B",
  "#E8A020",
];

export default function SubjectProgressChart() {
  return (
    <div className="h-72">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            dataKey="value"
            innerRadius={60}
            outerRadius={95}
          >
            {data.map((entry, index) => (
              <Cell
                key={entry.name}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Pie>
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}
