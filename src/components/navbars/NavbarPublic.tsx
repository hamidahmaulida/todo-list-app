import Image from "next/image";
import Link from "next/link";

export default function NavbarPublic() {
  return (
    <nav className="w-full bg-white shadow-sm px-6 py-4 flex items-center justify-between">
      {/* Logo */}
      <Link href="/" className="flex items-center space-x-2">
        <Image src="/logo.svg" alt="Logo" width={30} height={30} />
        <span className="font-bold text-xl text-green-800">Taskly</span>
      </Link>

      {/* Menu + CTA */}
      <div className="flex items-center space-x-4 md:space-x-6">
        <ul className="hidden md:flex items-center space-x-6">
          <li>
            <a href="#" className="text-gray-700 hover:text-green-800">
              Features
            </a>
          </li>
          <li>
            <a href="#" className="text-gray-700 hover:text-green-800">
              Support
            </a>
          </li>
        </ul>

        {/* Tombol CTA */}
        <Link href="/register">
          <button className="bg-green-800 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition">
            Sign Up
          </button>
        </Link>

        <Link href="/login">
          <button className="border border-green-800 text-green-800 px-4 py-2 rounded-lg hover:bg-green-100 transition">
            Sign In
          </button>
        </Link>
      </div>
    </nav>
  );
}
