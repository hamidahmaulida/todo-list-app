import Image from "next/image";
import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="w-full bg-white shadow-sm px-6 py-4 flex items-center justify-between">
      {/* Logo */}
      <Link href="/" className="flex items-center space-x-2">
        <Image src="/logo.svg" alt="Logo" width={30} height={30} />
        <span className="font-bold text-xl text-green-800">Taskly</span>
      </Link>

      {/* Menu + CTA */}
      <div className="flex items-center space-x-6">
        <ul className="flex items-center space-x-6">
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
          <button className="bg-[#0F766E] text-white px-4 py-2 rounded-lg hover:bg-[#0D5F57]">
            Sign Up
          </button>
        </Link>

        <Link href="/login">
          <button className="border border-gray-300 px-4 py-2 rounded-lg hover:bg-gray-100">
            Sign In
          </button>
        </Link>
      </div>
    </nav>
  );
}