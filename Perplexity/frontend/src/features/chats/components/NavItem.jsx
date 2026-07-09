import React from "react";

export default function NavItem({ icon: Icon, label, collapsed, active, onClick }) {
  return (
    <button
      onClick={onClick}
      className={`group flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors ${
        active
          ? "bg-[#1c1c1f] text-[#F2F1EC]"
          : "text-[#8B8B93] hover:bg-[#141416] hover:text-[#F2F1EC]"
      }`}
      title={collapsed ? label : undefined}
    >
      <Icon
        size={17}
        className={active ? "text-[#D4AF37]" : "text-[#8B8B93] group-hover:text-[#D4AF37]"}
      />
      {!collapsed && <span>{label}</span>}
    </button>
  );
}
