import { useState, useEffect } from "react";

export default function ChartData() {
  const [data, setData] = useState([""]);
  const [hashMap, setHashMap] = useState(new Map());

  useEffect(() => {
    fetch("http://localhost:8888/hello", {
      method: "GET",
      Accept: "/",
      headers: {
        Authorization: "Bearer " + localStorage.getItem("jwt"),
        "Access-Control-Allow-Method": "*",
        "Access-Control-Allow-Credentials": "true",
        "Access-Control-Allow-Origin": "http://localhost:3000",
        "Content-Type": "application/json",
        Origin: "http://localhost:3000",
      },
    })
      .then((response) => response.json())
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
  }, [data]); //data
  console.log("size before: ", data, hashMap);
  return [data, hashMap];
}
