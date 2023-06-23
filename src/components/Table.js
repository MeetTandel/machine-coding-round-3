import React from "react";
import "./Tabls.css";
import { snacks } from "../data";
import { useState } from "react";

const headerData = {
  ID: "id",
  "Product Name": "product_name",
  "Product Weight": "product_weight",
  "Price (INR)": "price",
  Calories: "calories",
  Ingredients: "ingredients",
};

export const Table = () => {
  const [tableSort, setTableSort] = useState({
    sortField: "",
    sortOrder: 0,
  });
  const [tableSearch, setTableSearch] = useState("");

  const handleTableHeaderClick = (sortField) => {
    setTableSort((prevSort) => ({
      sortField: headerData[sortField],
      sortOrder:
        headerData[sortField] === prevSort.sortField
          ? prevSort.sortOrder === 1
            ? -1
            : 1
          : -1,
    }));
  };

  const sortedData =
    tableSort.sortField !== ""
      ? tableSort.sortOrder === 1
        ? [...snacks].sort((a, b) =>
            tableSort.sortField === "product_weight"
              ? Number(a[tableSort.sortField].slice(0, -1)) >
                Number(b[tableSort.sortField].slice(0, -1))
                ? 1
                : -1
              : a[tableSort.sortField] > b[tableSort.sortField]
              ? 1
              : -1
          )
        : [...snacks].sort((a, b) =>
            tableSort.sortField === "product_weight"
              ? Number(a[tableSort.sortField].slice(0, -1)) <
                Number(b[tableSort.sortField].slice(0, -1))
                ? 1
                : -1
              : a[tableSort.sortField] < b[tableSort.sortField]
              ? 1
              : -1
          )
      : snacks;

  const filteredData = sortedData.filter(
    (snack) =>
      tableSearch === "" ||
      snack.product_name.toLowerCase().includes(tableSearch.toLowerCase()) ||
      snack.ingredients
        .join(", ")
        .toLowerCase()
        .includes(tableSearch.toLowerCase())
  );

  console.log(filteredData);

  return (
    <div className="table__container">
      <input
        type="text"
        placeholder="Search with Products or Ingredients... "
        onChange={(e) => setTableSearch(e.target.value)}
      />
      <table className="table">
        <thead>
          <tr>
            {Object.keys(headerData).map((header, i) => (
              <th key={i} onClick={() => handleTableHeaderClick(header)}>
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {filteredData.map((snack) => (
            <tr key={snack.id}>
              <td>{snack.id}</td>
              <td>{snack.product_name}</td>
              <td>{snack.product_weight}</td>
              <td>{snack.price}</td>
              <td>{snack.calories}</td>
              <td>{snack.ingredients.join(", ")}</td>
            </tr>
          ))}
          {filteredData.length === 0 && (
            <tr>
              <td className="no-data" colSpan={6}>
                No Data Available
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};
