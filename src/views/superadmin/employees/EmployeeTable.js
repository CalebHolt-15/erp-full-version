import "@styles/react/libs/charts/apex-charts.scss"
import axios from "axios"
import React, { useEffect, forwardRef, useState } from "react"

//materialTable
import AddBox from "@material-ui/icons/AddBox"
import ArrowDownward from "@material-ui/icons/ArrowDownward"
import Check from "@material-ui/icons/Check"
import ChevronLeft from "@material-ui/icons/ChevronLeft"
import ChevronRight from "@material-ui/icons/ChevronRight"
import Clear from "@material-ui/icons/Clear"
import DeleteOutline from "@material-ui/icons/DeleteOutline"
import Edit from "@material-ui/icons/Edit"
import FilterList from "@material-ui/icons/FilterList"
import FirstPage from "@material-ui/icons/FirstPage"
import LastPage from "@material-ui/icons/LastPage"
import Remove from "@material-ui/icons/Remove"
import SaveAlt from "@material-ui/icons/SaveAlt"
import Search from "@material-ui/icons/Search"
import ViewColumn from "@material-ui/icons/ViewColumn"

import MaterialTable from "material-table"
import { Field, Form, Formik } from "formik"
import { createTheme } from "react-data-table-component"
import { ThemeProvider } from "styled-components"
import {
  MuiThemeProvider,
  createMuiTheme,
  FormControlLabel,
  Switch
} from "@material-ui/core"

//materialTable
const EmployeeTable = (props) => {
  const tableIcons = {
    Add: forwardRef((props, ref) => <AddBox {...props} ref={ref} />),
    Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
    Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
    Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref} />),
    DetailPanel: forwardRef((props, ref) => (
      <ChevronRight {...props} ref={ref} />
    )),
    Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} />),
    Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref} />),
    Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref} />),
    FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
    LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
    NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
    PreviousPage: forwardRef((props, ref) => (
      <ChevronLeft {...props} ref={ref} />
    )),
    ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
    Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
    SortArrow: forwardRef((props, ref) => (
      <ArrowDownward {...props} ref={ref} />
    )),
    ThirdStateCheck: forwardRef((props, ref) => (
      <Remove {...props} ref={ref} />
    )),
    ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />)
  }

  const [preferDarkMode, setPreferDarkMode] = useState(() => {
    const mode = localStorage.getItem("_tableDarkMode")
    return mode === "true" || false
  })

  const theme = createMuiTheme({
    palette: {
      type: preferDarkMode ? "dark" : "light",
      background: {
        paper: preferDarkMode ? "#343D55" : "#fff",
        default: preferDarkMode ? "#303030" : "#fafafa"
      }
    }
  })

  const handleDarkModeChange = () => {
    setPreferDarkMode(!preferDarkMode)
    localStorage.setItem("_tableDarkMode", !preferDarkMode)
  }
  // const { useState } = React
  const [empData, setEmpData] = useState([])
  const [columns, setColumns] = useState([
    {
      title: "Name",
      field: "name"
    },
    { title: "Email", field: "email", initialEditValue: "mn@gmail.com" },
    { title: "Password", field: "password" }
  ])

  const [loading, setLoading] = useState(true)
  const [reload, setReload] = useState(false)
  const refresh = () => {
    setReload((reload) => !reload)
  }

  //CRUD
  //********   Create  ****************
  const onSubmit = async (newRow, resolve) => {
    console.log("onSubmit.values:", newRow)
    console.log("props:", props)

    const options = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      withCredentials: true,
      data: { ...newRow },
      url: "https://127.0.0.1:8089/api/employee"
    }
    try {
      const { data } = await axios(options)
      console.log("added///:", data)
      refresh()
      resolve()
    } catch (e) {
      console.error(e)
    }
  }

  //********   Read *************/
  useEffect(() => {
    const getEmployees = async (values) => {
      console.log("getEmployees")
      const options = {
        method: "GET",
        headers: { "Content-Type": "application/json" },
        data: { ...values },
        withCredentials: true,
        url: "https://127.0.0.1:8089/api/employee/empData"
      }
      try {
        const { data } = await axios(options)
        // console.log("employees:", data)
        setEmpData(data)
      } catch (e) {
        console.error(e)
      }
    }
    getEmployees()
  }, ["https://127.0.0.1:8089/api/employee/empData", reload])

  //********   Update  ****************
  const onUpdate = async (oldData, newData, resolve) => {
    console.log("update.id:", oldData._id)
    const options = {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      data: { ...newData },
      withCredentials: true,
      url: `https://127.0.0.1:8089/api/employee/${oldData._id}`
    }
    try {
      const { data } = await axios(options)
      console.log("updated///:", data)
      refresh()
      resolve()
    } catch (e) {
      console.error(e)
    }
  }

  //********   Delete  ****************
  const onDelete = async (id, resolve) => {
    console.log("delete.values.id:", id)
    const options = {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      withCredentials: true,
      url: `https://127.0.0.1:8089/api/employee/${id}`
    }
    try {
      const { data } = await axios(options)
      console.log("deleted///:", data)
      refresh()
      resolve()
    } catch (e) {
      console.error(e)
    }
  }
  //CRUD

  return (
    <div className="App">
      <h1 align="center">Employees</h1>
      <h4 align="center">Registration and Update Table</h4>
      <FormControlLabel
        value="top"
        control={<Switch color="#343D55" checked={preferDarkMode} />}
        onChange={handleDarkModeChange}
        label={preferDarkMode ? "Dark Mode" : "Light Mode"}
        labelPlacement="top"
      />
      <MuiThemeProvider theme={theme}>
        <MaterialTable
          icons={tableIcons}
          columns={columns}
          data={empData}
          options={{
            actionsColumnIndex: -1,
            addRowPosition: "first"
            // headerStyle: {
            //   backgroundColor: "#343D55",
            //   color: "#FFF"
            // }
          }}
          editable={{
            onRowAdd: (newRow) => {
              return new Promise((resolve, reject) => {
                onSubmit(newRow, resolve)
              })
            },
            onRowUpdate: (newData, oldData) => {
              return new Promise((resolve, reject) => {
                onUpdate(oldData, newData, resolve)
              })
            },
            onRowDelete: (oldData) => {
              return new Promise((resolve, reject) => {
                onDelete(oldData._id, resolve)
              })
            }
          }}
        />
      </MuiThemeProvider>
    </div>
  )
}

export default EmployeeTable
