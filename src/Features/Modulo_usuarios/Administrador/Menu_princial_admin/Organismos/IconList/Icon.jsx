import { 
  TestTubeDiagonal, 
  LayoutDashboard, 
  ClipboardList, 
  FileText, 
  Users, 
  Settings, 
  CalendarDays,
  UserPlus 
} from "lucide-react"

export const Icon = ({ name }) => {
  const icons = {
    flask: <TestTubeDiagonal />,
    dashboard: <LayoutDashboard />,
    clipboard: <ClipboardList />,
    file: <FileText />,
    users: <Users />,
    settings: <Settings />,
    calendar: <CalendarDays />,
    userPlus: <UserPlus />,
  }

  return <span className="icon">{icons[name] || "icono"}</span>
}