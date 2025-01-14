import { Outlet } from "react-router-dom";
import { Sprout, Users, Truck, LayoutDashboard, Map, BookCheck, Hammer} from "lucide-react";
import Sidebar from "./Sidebar";
import Header from "./Header"; // Import Header

const navigation = [
  { name: "Dashboard", href: "/", icon: LayoutDashboard },
  { name: "Crop Management", href: "/crops", icon: Sprout },
  { name: "Staff Management", href: "/staff", icon: Users },
  { name: "Vehicle Management", href: "/vehicles", icon: Truck },
  { name: "Field Management", href: "/fields", icon: Map },
  { name: "Equipment Management", href: "/equipment", icon: Hammer },
  { name: "Log Management", href: "/logs", icon: BookCheck },
];

export default function Layout() {
  return (
      <div className="min-h-screen bg-gray-50">
        <Sidebar navigation={navigation} />
        <div className="lg:pl-72">
          {/* Add Header Here */}
          <Header />
          <main className="py-10">
            <div className="px-4 sm:px-6 lg:px-8">
              <Outlet />
            </div>
          </main>
        </div>
      </div>
  );
}
