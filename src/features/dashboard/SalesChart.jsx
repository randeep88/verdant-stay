import React from "react";
import { eachDayOfInterval, format, isSameDay, subDays } from "date-fns";
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

// const salesData = [
//   { label: "Jan 01", totalSales: 320, extrasSales: 120 },
//   { label: "Jan 02", totalSales: 340, extrasSales: 150 },
//   { label: "Jan 03", totalSales: 330, extrasSales: 130 },
//   { label: "Jan 04", totalSales: 360, extrasSales: 180 },
//   { label: "Jan 05", totalSales: 350, extrasSales: 160 },
//   { label: "Jan 06", totalSales: 370, extrasSales: 190 },
//   { label: "Jan 07", totalSales: 390, extrasSales: 210 },
//   { label: "Jan 08", totalSales: 385, extrasSales: 200 },
//   { label: "Jan 09", totalSales: 400, extrasSales: 220 },
//   { label: "Jan 10", totalSales: 420, extrasSales: 240 },
//   { label: "Jan 11", totalSales: 410, extrasSales: 230 },
//   { label: "Jan 12", totalSales: 430, extrasSales: 250 },
//   { label: "Jan 13", totalSales: 440, extrasSales: 270 },
//   { label: "Jan 14", totalSales: 435, extrasSales: 260 },
//   { label: "Jan 15", totalSales: 450, extrasSales: 280 },
//   { label: "Jan 16", totalSales: 470, extrasSales: 300 },
//   { label: "Jan 17", totalSales: 465, extrasSales: 290 },
//   { label: "Jan 18", totalSales: 480, extrasSales: 310 },
//   { label: "Jan 19", totalSales: 490, extrasSales: 320 },
//   { label: "Jan 20", totalSales: 500, extrasSales: 330 },
//   { label: "Jan 21", totalSales: 510, extrasSales: 340 },
//   { label: "Jan 22", totalSales: 505, extrasSales: 325 },
//   { label: "Jan 23", totalSales: 520, extrasSales: 350 },
//   { label: "Jan 24", totalSales: 530, extrasSales: 370 },
//   { label: "Jan 25", totalSales: 540, extrasSales: 380 },
//   { label: "Jan 26", totalSales: 535, extrasSales: 375 },
//   { label: "Jan 27", totalSales: 550, extrasSales: 390 },
//   { label: "Jan 28", totalSales: 560, extrasSales: 410 },
//   { label: "Jan 29", totalSales: 570, extrasSales: 430 },
//   { label: "Jan 30", totalSales: 580, extrasSales: 450 },
// ];

const SalesChart = ({ bookings, numDays }) => {
  const allDates = eachDayOfInterval({
    start: subDays(new Date(), numDays - 1),
    end: new Date(),
  });

  const data = allDates.map((date) => {
    return {
      label: format(date, "MMM dd"),
      totalSales: bookings
        .filter((booking) => isSameDay(date, new Date(booking.created_at)))
        .reduce((acc, cur) => acc + cur.totalPrice, 0),
      extrasSales: bookings
        .filter((booking) => isSameDay(date, new Date(booking.created_at)))
        .reduce((acc, cur) => acc + cur.extrasPrice, 0),
    };
  });

  return (
    <div className="bg-white p-5 rounded-md select-none">
      <div>
        <h1 className="text-xl font-bold -mt-5 mb-10">
          Sales from {format(allDates.at(0), "MMM dd yyyy")} &mdash;{" "}
          {format(allDates.at(-1), "MMM dd yyyy")}
        </h1>
      </div>
      <div className="w-[700px] h-80">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} height={300} width={700}>
            <XAxis dataKey="label" />
            <YAxis unit="₹" />
            <CartesianGrid />
            <Tooltip />
            <Area
              dataKey="totalSales"
              type="monotone"
              stroke="#818CF8"
              fill="#A5B4FC"
              strokeWidth={2}
              name="Total Sales"
            />
            <Area
              dataKey="extrasSales"
              type="monotone"
              stroke="#34D399"
              fill="#6EE7B7"
              strokeWidth={2}
              name="Extras Sales"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default SalesChart;
