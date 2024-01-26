import NavLinks from "./navLink";
import AuthButton from "@/components/AuthButton";

interface Link {
  label: string;
  href: string;
}

interface HeaderProps {
  links: Link[];
}

export default function Header({ links }: HeaderProps) {
  // Return header with links if user is not authenticated
  return (
    <nav className="sticky top-0 z-10 w-full h-16 bg-white border-b border-gray-300">
      <div className="flex items-center justify-between h-full px-4 mx-auto max-w-7xl">
        <span className="text-lg font-semibold">
          Next JS Fullstack Portfolio
        </span>
        <div className="flex items-center space-x-4">
          <NavLinks links={links} />
          <AuthButton />
        </div>
      </div>
    </nav>
  );
}
