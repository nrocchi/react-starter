import HomeTwoToneIcon from '@mui/icons-material/HomeTwoTone'
import ManageAccountsTwoToneIcon from '@mui/icons-material/ManageAccountsTwoTone'
import InsertChartTwoToneIcon from '@mui/icons-material/InsertChartTwoTone'

import {MenuItems} from './SidebarMenuTypes'

const menuItems: MenuItems[] = [
  {
    heading: 'dashboards',
    items: [
      {
        name: 'home',
        icon: HomeTwoToneIcon,
      },
      {
        name: 'example',
        icon: InsertChartTwoToneIcon,
      },
    ],
  },
  {
    heading: 'management',
    items: [
      {
        name: 'users',
        icon: ManageAccountsTwoToneIcon,
      },
    ],
  },
]

export default menuItems
