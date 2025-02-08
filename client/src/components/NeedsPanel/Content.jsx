import React from "react";
import getIconColor from "../../utils/IconColor";
import ProgressBar from "./ProgressBar";

const needs = [
  { name: "Hunger", value: 100 },
  { name: "Health", value: 100 },
  { name: "Energy", value: 100 },
  { name: "Hygiene", value: 100 },
  { name: "Bladder", value: 100 },
];

const Content = () => (
  <ul className="flex flex-wrap m-auto justify-center gap-2">
    {needs.map(({ name, value }) => (
      <div className="flex flex-col items-center" key={name}>
        {getIconColor(name, value)}
        <li>
          {name} <ProgressBar value={value} need={name} />
        </li>
      </div>
    ))}
  </ul>
);

export default Content;
