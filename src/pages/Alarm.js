import React, { useContext, useEffect, useState } from "react";
import { RiDeleteBin6Line } from "react-icons/ri";
import { useTable } from "react-table"; 
import { Link } from "react-router-dom";
import "./css/Report.css";
import { TranslationContext } from '../hooks/translation'
import CreateAlarmModal from "../components/CreateAlarmModal";
import BallIcon from "../components/BallIcon";

const Alarm = () => {
  const [alarms, setAlarms] = useState([]);
  const [loadingReports, setLoadingReports] = useState(false);
  const [error, setError] = useState(null);
  const { translate } = useContext(TranslationContext)
  const [isAlarmModalOpen, setIsAlarmModalOpen] = useState(false);
  
  const handleAlarmModal = () => {
    setIsAlarmModalOpen((prev) => !prev)
  }

  useEffect(() => {
    const fetchReports = async () => {
      setLoadingReports(true);
      setError(null);

      const storedToken = localStorage.getItem("token");
      const myHeaders = new Headers();
      myHeaders.append("Authorization", `Bearer ${storedToken}`);

      const requestOptions = {
        method: "GET",
        headers: myHeaders,
        redirect: "follow",
      };

      try {
        const response = await fetch(
          "http://127.0.0.1:8000/api/v1.0/alarm/",
          requestOptions
        );

        if (!response.ok) {
          throw new Error("Failed to fetch reports");
        }

        const result = await response.json();
        if (result.success) {
          setAlarms(result.data);
        } else {
          throw new Error(result.message || "Failed to fetch reports");
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoadingReports(false);
      }
    };

    fetchReports();
  }, []);

  const handleDelete = async (alarmId) => {
    const storedToken = localStorage.getItem("token");
    const myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${storedToken}`);

    const requestOptions = {
      method: "DELETE",
      headers: myHeaders,
      redirect: "follow",
    };

    try {
      const response = await fetch(
        `http://127.0.0.1:8000/api/v1.0/alarm/${alarmId}`,
        requestOptions
      );

      if (!response.ok) {
        throw new Error("Failed to delete report");
      }

      setAlarms(prevAlarms => prevAlarms.filter(alarm => alarm._id !== alarmId));
    } catch (err) {
      setError(err.message);
    }
  };

  const columns = React.useMemo(
    () => [
      {
        Header: translate.Alarm.header_1,
        accessor: "threshold",
      },
      {
        Header: translate.Alarm.header_2,
        accessor: "threshold_type",
        Cell: ({ value }) => {
          if (!value) return
          return (
            <p>{translate.Alarm[value]}</p>
          )
        },
      },
        {
        Header: translate.Alarm.header_3,
        accessor: "enabled",
        Cell: ({ value }) => {
          if (!value) return
          return (
            <p>
              {value ? <BallIcon fill="green" /> : <BallIcon fill="red" />}
            </p>
          )
        },
      },
      {
        Header: translate.Alarm.header_4,
        Cell: ({ row }) => (
          <button
            className="delete-button"
            onClick={() => handleDelete(row.original._id)}
          >
          <RiDeleteBin6Line />
          </button>
        ),
      },
    ],
    [translate.Alarm]
  );

  const data = React.useMemo(() => alarms, [alarms]);

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({ columns, data });

  return (
    <div className="Report d-flex flex-grow-1">
      <div className="container d-flex flex-column pt-3 gap-3">
        <h1>{translate.Alarm.title}</h1>
        <div className="d-flex align-items-center">
          <p>{translate.Alarm.subtitle}</p>

          {/* Button to create a new report */}
          <div className=" ms-auto">
            <button
              onClick={handleAlarmModal}
              className={`kpi-tab`}
            >
            <span>{translate.Alarm.create_alarm}</span>
          </button>
            {isAlarmModalOpen && (<CreateAlarmModal isOpen={isAlarmModalOpen} setIsOpen={setIsAlarmModalOpen} />)}
          </div>
        </div>

        {/* Show loading spinner or error */}
        {loadingReports && <p>{translate.Report.loading}</p>}
        {error && <p className="error">{error}</p>}

        {/* Table for displaying reports */}
        {!loadingReports && alarms.length > 0 && (
          <table {...getTableProps()} className="reports-table">
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
                      <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
                    ))}
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}

        {/* No reports available */}
        {!loadingReports && alarms.length === 0 && !error && (
          <p>{translate.Alarm.no_alarms}</p>
        )}
      </div>
    </div>
  );
};

export default Alarm;
