// ** Routes Imports
import AppRoutes from "./Apps"
import FormRoutes from "./Forms"
import PagesRoutes from "./Pages"
import TablesRoutes from "./Tables"
import ChartMapsRoutes from "./ChartsMaps"
import DashboardRoutes from "./Dashboards"
import UiElementRoutes from "./UiElements"
import ExtensionsRoutes from "./Extensions"
import PageLayoutsRoutes from "./PageLayouts"
import SchoolRoutes from "./Schools"
import EmployeeRoutes from "./Employees"

// ** Document title
const TemplateTitle = "%s - Vuexy React Admin Template"

// ** Default Route
const DefaultRoute = "/dashboard/ecommerce"

// ** Merge Routes
const Routes = [
  ...DashboardRoutes,
  ...AppRoutes,
  ...PagesRoutes,
  ...UiElementRoutes,
  ...ExtensionsRoutes,
  ...PageLayoutsRoutes,
  ...FormRoutes,
  ...TablesRoutes,
  ...ChartMapsRoutes,
  ...SchoolRoutes,
  ...EmployeeRoutes
]

export { DefaultRoute, TemplateTitle, Routes }
