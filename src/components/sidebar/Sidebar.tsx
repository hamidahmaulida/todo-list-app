// "use client";

// import { FiX } from "react-icons/fi";

// interface SidebarProps {
//   isOpen: boolean;
//   onClose: () => void;
//   onNewTask: () => void; // fungsi dari parent untuk buka modal
// }

// export default function Sidebar({ isOpen, onClose, onNewTask }: SidebarProps) {
//   return (
//     <>
//       {/* Overlay untuk mobile */}
//       {isOpen && (
//         <div
//           onClick={() => {
//             console.log("❌ Sidebar overlay diklik -> menutup sidebar");
//             onClose();
//           }}
//           className="fixed inset-0 bg-black/40 z-30 lg:hidden"
//         />
//       )}

//       {/* Sidebar */}
//       <aside
//         className={`fixed top-0 left-0 h-full w-64 bg-white border-r border-gray-200 flex flex-col transform transition-transform duration-300 z-40
//         ${isOpen ? "translate-x-0" : "-translate-x-full"} 
//         lg:translate-x-0 lg:static`}
//       >
//         {/* Header (mobile only) */}
//         <div className="flex justify-between items-center p-4 border-b lg:hidden">
//           <h2 className="font-bold text-lg text-[#0F766E]">Dashboard</h2>
//           <button
//             onClick={() => {
//               console.log("❌ Tombol close sidebar diklik");
//               onClose();
//             }}
//             className="p-2 rounded hover:bg-gray-100"
//             aria-label="Close Sidebar"
//           >
//             <FiX className="w-5 h-5 text-gray-600" />
//           </button>
//         </div>

//         {/* Menu utama */}
//         <nav className="flex-1 overflow-y-auto p-4 text-gray-700">
//           <button
//             onClick={() => {
//               console.log("✅ Sidebar: tombol + New Task diklik");
//               onNewTask();
//             }}
//             className="w-full text-left px-3 py-2 rounded-md bg-[#0F766E] text-white font-medium shadow-sm hover:bg-[#115E59] transition"
//           >
//             + New Task
//           </button>
//         </nav>
//       </aside>
//     </>
//   );
// }
