import Link from "next/link";

interface NavLink {
  label: string;
  href: string;
}

interface NavLinksProps {
  links: NavLink[];
}

export default function NavLinks({ links }: NavLinksProps) {
  return (
    <>
      {links.map((link, index) => (
        <Link key={index} href={link.href}>
          <div className="text-gray-500">{link.label}</div>
        </Link>
      ))}
    </>
  );
}
