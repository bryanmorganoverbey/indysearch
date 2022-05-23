import React from "react";
import cloneDeep from "lodash/cloneDeep";
import throttle from "lodash/throttle";
import Pagination from "rc-pagination";
import "rc-pagination/assets/index.css";
import "./event-table.css";

import { allData } from "../global";

const tableHead = {
  title: "Event Name",
  date: "Date",
  location: "Location",
  link: "Link",
};

const EventTable = () => {
  const countPerPage = 5;
  const [value, setValue] = React.useState("");
  const [currentPage, setCurrentPage] = React.useState(1);
  const [collection, setCollection] = React.useState(
    cloneDeep(allData.slice(0, countPerPage))
  );
  const [sortDir, setSortDir] = React.useState("");
  const searchData = React.useRef(
    throttle((val) => {
      const query = val.toLowerCase();
      setCurrentPage(1);
      const data = cloneDeep(
        allData
          .filter((item) => item.title.toLowerCase().indexOf(query) > -1)
          .slice(0, countPerPage)
      );
      setCollection(data);
    }, 400)
  );

  const sortData = (val) => {
    console.log("in sortData", sortDir);
    setCurrentPage(1);
    let data;
    if (sortDir === "" || sortDir === "desc") {
      data = cloneDeep(
        allData
          .sort((a, b) => {
            if (a[val] > b[val]) {
              return 1;
            }
            if (a[val] < b[val]) {
              return -1;
            }
            return 0;
          })
          .slice(0, countPerPage)
      );
      setSortDir("asc");
      setCollection(data);
    }
    if (sortDir === "asc") {
      data = cloneDeep(
        allData
          .sort((a, b) => {
            if (a[val] < b[val]) {
              return 1;
            }
            if (a[val] > b[val]) {
              return -1;
            }
            return 0;
          })
          .slice(0, countPerPage)
      );
      setSortDir("desc");
      setCollection(data);
    }
  };

  React.useEffect(() => {
    if (!value) {
      updatePage(1);
    } else {
      searchData.current(value);
    }
  }, [value]);

  const updatePage = (p) => {
    setCurrentPage(p);
    const to = countPerPage * p;
    const from = to - countPerPage;
    setCollection(cloneDeep(allData.slice(from, to)));
  };

  const tableRows = (rowData) => {
    const { key, index } = rowData;
    const tableCell = Object.keys(tableHead);
    const columnData = tableCell.map((keyD, i) => {
      return <td key={i}>{key[keyD]}</td>;
    });

    return <tr key={index}>{columnData}</tr>;
  };

  const tableData = () => {
    return collection.map((key, index) => tableRows({ key, index }));
  };

  const headRow = () => {
    return Object.values(tableHead).map((title, index) => (
      <td key={index} onClick={() => sortData(Object.keys(tableHead)[index])}>
        <strong>{title}&#9660;</strong>
      </td>
    ));
  };

  return (
    <>
      <div class="search">
        <input
          placeholder="Search Events"
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
      </div>
      <table>
        <thead>
          <tr>{headRow()}</tr>
        </thead>
        <tbody className="trhover">{tableData()}</tbody>
      </table>
      <Pagination
        pageSize={countPerPage}
        onChange={(p) => updatePage(p)}
        current={currentPage}
        total={allData.length}
      />
    </>
  );
};
export default EventTable;
