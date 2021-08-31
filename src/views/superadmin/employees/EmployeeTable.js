import "@styles/react/libs/charts/apex-charts.scss"
import axios from "axios"
import {useEffect} from "react"

const EmployeeTable = () => {
  useEffect(() => {
    const getEmployees = async (values) => {
      console.log("getEmployees")
      const options = {
        method: "GET",
        headers: {"Content-Type": "application/json"},
        data: {...values},
        withCredentials: true,
        url: "https://127.0.0.1:8089/employee/empData"
      }
      try {
        const {data} = await axios(options)
        console.log("employees:", data)
      } catch (e) {
        console.error(e)
      }
    }
    getEmployees()
  }, ["https://127.0.0.1:8089/employee/empData"])

  return <h1>School Tables Here</h1>
}

export default EmployeeTable
