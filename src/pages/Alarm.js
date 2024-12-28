import React, { useContext, useEffect, useState } from "react";
import { RiDeleteBin6Line, RiPencilFill } from "react-icons/ri";
import { useTable } from "react-table"; 
import "./css/Report.css";
import { TranslationContext } from '../hooks/translation'
import { DataContext } from '../hooks/data'
import CreateAlarmModal from "../components/CreateAlarmModal";
import BallIcon from "../components/BallIcon";
import { fetchAlarmsSDK, deleteAlarmSDK, fetchKPIsSDK, updateAlarmSDK, createAlarmSDK, fetchMachinesBySiteSDK } from '../sdk'
import UpdateAlarmModal from "../components/UpdateAlarmModal";
import { format } from 'date-fns'
import { AuthContext } from "../hooks/user";
import DeleteAlarmModal from "../components/deleteAlarmModal";

const Alarm = () => {
  const [alarms, setAlarms] = useState([]);
  const [loadingReports, setLoadingReports] = useState(false);
  const [error, setError] = useState(null);
  const { translate } = useContext(TranslationContext)
  const { KPIs, setCachedKPIs, setCachedMachinesBySite } = useContext(DataContext)
  const user = useContext(AuthContext)
  const [createModal, setCreateModal] = useState(false);
  const [updateModal, setUpdateModal] = useState(false)
  const [deleteModal, setDeleteModal] = useState(false)
  const [alarmToDelete, setAlarmToDelete] = useState('')
  const [updateAlarm, setUpdateAlarm]= useState(null)
  const handleAlarmModal = () => {
    setCreateModal((prev) => !prev)
  }

  useEffect(() => {
    const fetchAlarms = async () => {
      setLoadingReports(true);
      setError(null);
      try {
        let result = await fetchAlarmsSDK()
        setAlarms(result.data)
        let KPIsResult = {}
        let MachinesResult = {}
        if (!KPIs) {
          if (user.site === null) {
            KPIsResult = { data: [] }
            MachinesResult = { data: [] }
          }
          else {
            KPIsResult = await fetchKPIsSDK(user.site)
            MachinesResult = await fetchMachinesBySiteSDK(user.site)
          }
          setCachedKPIs(KPIsResult.data)
          setCachedMachinesBySite(MachinesResult.data)
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoadingReports(false);
      }
    };

    fetchAlarms();
  }, [KPIs, setCachedKPIs, setCachedMachinesBySite, user]);

  const handleDelete = async () => {
    try {
      if (!alarmToDelete) return
      await deleteAlarmSDK(alarmToDelete)
      setAlarms(prevAlarms => prevAlarms.filter(alarm => alarm._id !== alarmToDelete));
    } catch (err) {
      setError(err.message);
    }
  };
  console.log("alarms: ", alarms)
  const columns = React.useMemo(
    () => [
      {
        Header: translate.Alarm.threshold,
        accessor: "threshold",
      },
      {
        Header: translate.Alarm.threshold_type,
        accessor: "threshold_type",
        Cell: ({ value }) => {
          if (!value) return
          return (
            <p>{translate.Alarm[value]}</p>
          )
        },
      },
      {
        Header: translate.Alarm.kpi,
        accessor: "kpi_id",
        Cell: ({ value }) => {
          if (!KPIs) return
          const kpi = KPIs.find((KPI) => KPI._id === value)
          if (!value) return
          return (
            <p>{kpi.name}</p>
          )
        },
      },
      {
        Header: translate.Alarm.site,
        accessor: "site_id",
        Cell: ({ value }) => (
            <p>{value}</p>
          ),
      },
      {
        Header: translate.Alarm.machine,
        accessor: "machine_id",
        Cell: ({ value }) => (
            <p>{value ?? 'NO'}</p>
          ),
      },
      {
        Header: translate.Alarm.active,
        accessor: "enabled",
        Cell: ({ value }) => {
          return (
            <p>
              {value ? <BallIcon fill="green" /> : <BallIcon fill="red" />}
            </p>
          )
        },
      },
      {
        Header: translate.Alarm.created_at,
        accessor: "created_at",
        Cell: ({ value }) => {
          return (
            <p>
              {format(value, "dd-MM-yyyy hh:mm")}
            </p>
          )
        },
      },
      {
        Header: translate.labels.update,
        Cell: ({ row }) => {
          return (
            <button
              className="delete-button"
              onClick={() => {
                setUpdateModal(true)
                setUpdateAlarm(alarms[row.index])
              }}
            >
              <RiPencilFill />
            </button>
          )
        },
      },
      {
        Header: translate.Alarm.delete,
        Cell: ({ row }) => {
          console.log(row.original._id)
          return (
          <button
            className="delete-button"
              onClick={() => {
                setAlarmToDelete(row.original._id)
                setDeleteModal(true)
              }}
          >
          <RiDeleteBin6Line />
          </button>
          )
        }
        ,
      },
    ],
    [KPIs, alarms, translate.Alarm, translate.labels.update]
  );
  const handleUpdateAlarm = async (update) => {
    await updateAlarmSDK(update._id, update)
    const result = await fetchAlarmsSDK()
    setAlarms(result.data)
  };
  const handleCreateAlarm = async (inputValue) => {
    await createAlarmSDK(inputValue)
    const result = await fetchAlarmsSDK()
    setAlarms(result.data)
  }
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
            {createModal && (<CreateAlarmModal isOpen={createModal} setIsOpen={setCreateModal} onCreateAlarm={handleCreateAlarm} />)}
            {deleteModal && (<DeleteAlarmModal isOpen={deleteModal} setIsOpen={setDeleteModal} onDeleteAlarm={() => handleDelete()} />)}
            {updateModal && updateAlarm && (<UpdateAlarmModal data={updateAlarm} isOpen={updateModal} setIsOpen={setUpdateModal} onUpdateAlarm={handleUpdateAlarm} />)}
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
