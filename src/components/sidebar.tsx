
import { Button } from "../components/ui/button"
import { RiCloseLargeFill } from "react-icons/ri";

interface SidebarProps {
  isOpen: boolean
  onClose: () => void
}

const sidebarItems = [
  { name: "Home", active: true },
  { name: "Notifications", active: false },
  { name: "Products", active: false },
  { name: "Link", active: false },
  { name: "Activity", active: false },
  { name: "Developer", active: false },
  { name: "Get Help", active: false },
  { name: "Settings", active: false },
]

export default function Sidebar({ isOpen, onClose }: SidebarProps){
    return(
      <>
        <aside className={`fixed left-0 top-0 h-full w-64 bg-white border-r border-gray-200 flex flex-col transform transition-transform duration-300 ease-in-out z-50 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } shadow-lg`}>
        <div className="py-5 px-3 border-b-2 border-gray-900">
          <div className="w-full text-sm font-medium justify-between">
            <Button variant="link" size="sm" onClick={onClose} className="h-8 cursor-pointer w-8 p-0 absolute top-0 right-0">
              <div className="w-4 h-4" ><RiCloseLargeFill className="pointer-events-auto! transition-transform duration-300 hover:rotate-45"/></div>
            </Button>
                <div className="flex items-center space-x-2">
                  <div className="w-8 h-8 bg-gray-800 rounded-full flex items-center justify-center">
                    <span className="text-white text-sm font-medium">CN</span>
                  </div>
                  <span className="font-medium">Customer Name</span>
                </div>
              </div>
        </div>

        <nav className="flex-1 p-3">
          <ul className="space-y-2">
            {sidebarItems.map((item) => (
              <li key={item.name}>
                <Button
                  variant={item.active ? "default" : "ghost"}
                  className={`w-auto pl-0 justify-start ${
                    item.active ? "text-white bg-black rounded-md pl-2" : " "
                  }`}
                >
                  {item.name}
                </Button>
              </li>
            ))}
          </ul>
          {/* Top Naviagation location on mobile */}
          <div className="items-center mt-2 pt-4 border-t space-y-4 items-start space-x-4 flex flex-col md:hidden">
              <Button variant="outline" size="sm">
                Manage team
              </Button>
              <Button variant="outline" size="sm">
                API keys
              </Button>
              <Button variant="outline" size="sm">
                Your products
              </Button>
            </div>
        </nav>
      </aside>
      {/* Overlay for mobile */}
      {isOpen && <div className="fixed inset-0 bg-black opacity-50 z-40" onClick={onClose} />}
      </>
    )
}