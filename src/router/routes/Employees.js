/* eslint implicit-arrow-linebreak: ["error", "beside"] */

import {lazy} from "react"

const SchoolRoutes = [
  // Dashboards
  {
    path: "/superadmin/employees/RegisterEmployee",
    /* eslint implicit-arrow-linebreak: ["error", "beside"] */
    component: lazy(() => {
      return import("../../views/superadmin/employees/RegisterEmployee")
    })
  },
  {
    path: "/superadmin/employees/EmployeeTable",
    /* eslint implicit-arrow-linebreak: ["error", "beside"] */
    component: lazy(() => {
      return import("../../views/superadmin/employees/EmployeeTable")
    })
  }
]

export default SchoolRoutes
