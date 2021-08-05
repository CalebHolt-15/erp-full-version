import { Home, PlusCircle, Box } from 'react-feather'

export default [
  {
    header: 'Schools and Courses'
  },
  {
    id: 'schools',
    title: 'Schools',
    icon: <Home size={20} />,
    badge: 'light-warning',
    badgeText: '2',
    children: [
      {
        id: 'schoolId',
        title: 'Add Schools',
        icon: <PlusCircle size={25} />,
        navLink: '/superadmin/schools/AddSchool' 
     },
     {
        id: 'schoolTablesId',
        title: 'School Table',
        icon: <Box size={12} />,
        navLink: '/superadmin/schools/SchoolTables' 
      }
    ]
  }
]
