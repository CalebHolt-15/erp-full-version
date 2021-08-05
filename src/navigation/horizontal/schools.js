import { Home, Circle } from 'react-feather'

export default [
  {
    id: 'schools',
    title: 'Schools',
    icon: <Home size={20} />,
    badge: 'light-warning',
    badgeText: '2',
    children: [
      {
        id: 'schoolId',
        title: 'school',
        icon: <Circle size={12} />,
        navLink: '/superadmin/schools/School.js' 
      }
    ]
  }
]
