import React, { useState, useEffect } from "react";
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
  const [data, setData] = useState([""]);
  const [hashMap, setHashMap] = useState(new Map());

  useEffect(() => {
    fetch(
      "http://localhost:8888/hello/name?name=" +
        localStorage.getItem("username")
    )
      .then((response) => response.json())
      //.then((data) => JSON.stringify(data))
      .then((text) => setData(text))
      .then(() => {
        var unique = [];

        data.forEach((element) => {
          if (!unique.includes(element)) {
            unique.push(element);
            setHashMap(hashMap.set(element, 1));
          } else {
            setHashMap(hashMap.set(element, hashMap.get(element) + 1));
          }
        });
        console.log("H size " + hashMap.size);
        for (let [key, value] of hashMap) {
          console.log(key + " = " + value);
        }
      });
  }, [data]);
  console.log("size before: " + data.length);
  /*
  const fixData = () => {
    var unique = [];

    data.forEach((element) => {
      if (!unique.includes(element)) {
        unique.push(element);
        hashMap.set(element, 1);
      } else {
        hashMap.set(element, hashMap.get(element) + 1);
      }
    });
    //setData(unique);
    console.log("H size " + hashMap.size);
    for (let [key, value] of hashMap) {
      console.log(key + " = " + value);
    }

    //const myObject = hashMap.entries();
    console.log(iterator1.next().value);
    console.log(iterator1.next().value);
  };

  
  {data.map((d) => (
        <div>
          <p>{d}</p>
        </div>
      ))}

hashMap.forEach(function (key, value) {
        <div>
          <p>h {key}</p>
        </div>;
      })

      */
  return (
    <div style={{ textAlign: "center" }}>
      <h1>Here is the chart</h1>
      <h3>The data: </h3>
      {data.map((d, id) => (
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
