import "./Report.css";
import React from 'react';
import { Link } from 'react-router-dom';
//import { useTable } from "react-table";

const Report = () => {
    /*const data = React.useMemo(() => fakeData, []);
    const columns = React.useMemo(
      () => [
        {
          Header: "Date",
          accessor: "date",
        },
        {
          Header: "Download",
          accessor: "download",
        },
      ],
      []
    );
  
    const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
      useTable({ columns, data });
  
    return (
      <div className="Report">
        <div className="container">
          <table {...getTableProps()}>
            <thead>
              {headerGroups.map((headerGroup) => (
                <tr {...headerGroup.getHeaderGroupProps()}>
                  {headerGroup.headers.map((column) => (
                    <th {...column.getHeaderProps()}>
                      {column.render("Header")}
                    </th>
                  ))}
                </tr>
              ))}
            </thead>
            <tbody {...getTableBodyProps()}>
              {rows.map((row) => {
                prepareRow(row);
                return (
                  <tr {...row.getRowProps()}>
                    {row.cells.map((cell) => (
                      <td {...cell.getCellProps()}> {cell.render("Cell")} </td>
                    ))}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    );*/

    return (
      <div>
      <h1>Report History</h1>
      <p>Welcome to the report page. Here you can manage your reports.</p>

      {/* button to create report */}
      <div className="button-container">
        <Link to="/report/createreport" className="create-report-button">
          <span>Create Report</span>
        </Link>
      </div>
      </div>)
}
  

export default Report