import Link from "next/link";

async function NavLink({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      className="text-gray-200 hover:text-white px-3 py-2 font-semibold lg:text-lg"
    >
      {children}
    </Link>
  );
}

export default async function NavMenu() {
  return (
    <nav className="bg-purple-600 flex justify-between items-center px-1 lg:px-6 h-12 shadow-sm">
      <NavLink href="/">Home</NavLink>
      <ul className="flex flex-row gap-1 lg:gap-6">
        <li>
          <NavLink href="/students">Students</NavLink>
        </li>
        <li>
          <NavLink href="/leaderboard">Leaderboard</NavLink>
        </li>
        <li>
          <NavLink href="/import">Import Data</NavLink>
        </li>
      </ul>
    </nav>
  );
}
