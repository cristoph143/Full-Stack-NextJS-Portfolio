"use client";
import Link from "next/link";
import { RocketIcon, ReaderIcon, HomeIcon } from "@radix-ui/react-icons";
import { usePathname } from "next/navigation";

const navLinks = [
  { path: "/admin", label: "Home", icon: <HomeIcon /> },
  { path: "/admin/projects", label: "Projects", icon: <RocketIcon /> },
  { path: "/admin/blogs", label: "Blogs", icon: <ReaderIcon /> },
];

const SideNavigation = () => {
  const path = usePathname();

  const commonLinkStyles =
    "hover:bg-gray-100 px-3 py-2 rounded text-gray-600 hover:text-gray-800 flex items-center gap-2";

  return (
    <aside className="fixed top-0 bottom-0 left-0 h-screen p-5 bg-white border-r border-gray-300 w-60">
      <div>
        <Link href="/admin">
          <h1 className="px-4 space-x-3 text-2xl font-bold uppercase">
            Portfolio
          </h1>
          <h1 className="px-4 text-sm font-normal text-gray-400">ADMIN</h1>
        </Link>
      </div>
      <div className="mt-5">
        <ul>
          {navLinks.map(({ path: linkPath, label, icon }) => (
            <li className="mb-2" key={linkPath}>
              <Link href={linkPath}>
                <div
                  className={`${
                    path === linkPath ? "bg-gray-100" : ""
                  } ${commonLinkStyles}`}
                >
                  {icon}
                  {label}
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </aside>
  );
};

export default SideNavigation;
