
import { Input } from "../components/ui/input"
import { Button } from "../components/ui/button"
import { LuSettings } from "react-icons/lu";

interface HeaderProps {
  onSidebarToggle: () => void
}

export default function Header({ onSidebarToggle }: HeaderProps) {

return(
  <header className=" border-b-2 border-gray-900 px-6 py-4">
          <div className="max-w-7xl mx-auto flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Button variant="link" size="xsm" onClick={onSidebarToggle} className="hidden  md:block cursor-pointer bg-transparent hover:bb-0">
                <LuSettings className="pointer-events-auto! size-6! transition-transform duration-300 hover:rotate-45 " />
              </Button>
              <div className="flex-grow flex-1 flex-shrink space-x-2">
                <img className="w-[64px]" src="src/assets/knot-logo.svg" />
              </div>
              <div className="flex-grow flex-shrink flex-1">
                <Input placeholder="Search dashboard" className="w-[200px] border-black" />
                
              </div>
            </div>
            <div className="items-center space-x-4 hidden md:flex">
              
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
            <Button variant="outline" size="sm" onClick={onSidebarToggle} className="block md:hidden bg-transparent">
                <LuSettings className="w-4 h-4" />
              </Button>
          </div>
        </header>
)
      }