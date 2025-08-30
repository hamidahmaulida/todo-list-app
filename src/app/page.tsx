import Image from "next/image";
import Link from "next/link";

export default function Home() {
    // Server-side fetch
  // const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}`/top/)

  return (
    <main className="min-h-screen bg-[#fcfbf8] flex flex-col items-center justify-center px-4">
      {/* Hero Section */}
      <section
        className="flex flex-col gap-6 items-center justify-center text-center bg-cover bg-center bg-no-repeat p-4 rounded-xl min-h-[480px]"
        style={{
          backgroundImage:
            'linear-gradient(rgba(0, 0, 0, 0.1) 0%, rgba(0, 0, 0, 0.4) 100%), url("https://lh3.googleusercontent.com/aida-public/AB6AXuCHbjm3_9xlOTcEGcmLWIbM3hSUdyyw80jhn7VKcrOOVZ4yKOgnVNWuJsZkmlx7HwPBdGxMOu_TvvP0IzuqG5TzfF4uwLnVGw8WY0c7ZgAvm34qpxYDbnQEHY9D5rsAuALFqCz3Jpfzu3AgcbHlWgDiH9Q5v3-SdHVocJhMkc9IlVTyCLwRrg3AyhZrhPzTDOGmVwKyAKsZym7TfsTudNCRPJnKRS9zoBY_n5sj1_gWgGaU0tkGgsmqf63nHk1w4h8MUOnF4Tx0zUl8")',
        }}
      >
        <div className="flex flex-col gap-2 text-center">
          <h1 className="text-white text-4xl font-black leading-tight tracking-[-0.033em] md:text-5xl">
            Organize your work and life effortlessly.
          </h1>
          <h2 className="text-white text-sm font-normal md:text-base">
            Become focused, organized, and calm with Taskify. The world's #1 task management app.
          </h2>
        </div>

        <Link href="/register">
          <button className="mt-6 flex items-center justify-center h-12 px-6 bg-[#f0b00f] text-[#1c170d] text-sm font-bold rounded-full hover:bg-[#ddb30a] transition">
            Get Started
          </button>
        </Link>
      </section>
      <footer className="w-full py-6 text-center text-sm text-gray-600 mt-12">
        &copy; 2025 Taskly.
      </footer>
    </main>
  );
}

