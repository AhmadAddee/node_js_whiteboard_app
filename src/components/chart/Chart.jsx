//import React, { useState, useEffect } from "react";
import ChartData from "./ChartData";
import { useState, useEffect } from "react";

import {
  BarChart,
  Bar,
  Legend,
  YAxis,
  XAxis,
  CartesianGrid,
  Tooltip,
  Line,
  LineChart,
} from "recharts";

import "../../App.css";

function Chart() {
  const [data, hashMap] = ChartData();

  return (
    <div style={{ textAlign: "center" }}>
      <h1>Here is the chart</h1>
      <h3>The data: </h3>
      {data?.map((d, id) => (
        <p key={id}>{d}</p>
      ))}

      <h3>Amount of dates: {hashMap.size}</h3>
      {[...hashMap.keys()].map((k) => (
        <div key={k}>
          <p>
            key: {k}, value: {hashMap.get(k)}
          </p>
        </div>
      ))}
      <div className="App">
        <LineChart
          width={300}
          height={100}
          data={[...hashMap.keys()].map((k) => ({
            name: k,
            value: hashMap.get(k),
          }))}
        >
          <Line type="monotone" dataKey="pv" stroke="#8884d8" strokeWidth={2} />
        </LineChart>

        <BarChart
          width={500}
          height={300}
          data={[...hashMap.keys()].map((k) => ({
            name: k,
            value: hashMap.get(k),
          }))}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="value" fill="#8884d8" />
          <Bar dataKey="value" fill="#82ca9d" />
        </BarChart>
      </div>
    </div>
  );
}

export default Chart;
