import {lazy} from "react"

const SchoolRoutes = [
  // Dashboards
  {
    path: "/superadmin/schools/AddSchool",
    component: lazy(() => import("../../views/superadmin/schools/AddSchool"))
  },
  {
    path: "/superadmin/schools/SchoolTables",
    component: lazy(() => import("../../views/superadmin/schools/SchoolTables"))
  }
]

export default SchoolRoutes
