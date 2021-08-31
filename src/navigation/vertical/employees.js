import { Home, PlusCircle, Box } from "react-feather"

export default [
  {
    header: "Employees"
  },
  {
    id: "employees",
    title: "Employees",
    icon: <Home size={20} />,
    badge: "light-warning",
    badgeText: "2",
    children: [
      {
        id: "employeesId",
        title: "Employees Registration",
        icon: <PlusCircle size={25} />,
        navLink: "/superadmin/employees/RegisterEmployee"
      },
      {
        id: "employeesTablesId",
        title: "Employee Table",
        icon: <Box size={12} />,
        navLink: "/superadmin/employees/EmployeeTable"
      }
    ]
  }
]
