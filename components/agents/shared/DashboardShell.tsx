"use client";

import { createContext, useContext, useState } from "react";
import type { ReactNode } from "react";
import Navigation from "@/components/agents/shared/Navigation";
import Sidebar, { type WorkspaceRole } from "@/components/agents/shared/Sidebar";

const WorkspaceRoleContext = createContext<WorkspaceRole>("agent");
export const useWorkspaceRole = () => useContext(WorkspaceRoleContext);

export default function DashboardShell({ children }: { children: ReactNode }) {
  const [role, setRole] = useState<WorkspaceRole>("agent");
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <WorkspaceRoleContext.Provider value={role}>
      <div className="min-h-screen bg-[#f5f7f3] lg:flex">
        <Sidebar role={role} mobileOpen={mobileOpen} onClose={() => setMobileOpen(false)}/>
        <div className="min-w-0 flex-1">
          <Navigation role={role} onRoleChange={setRole} onMenuClick={() => setMobileOpen(true)}/>
          <main className="mx-auto max-w-[1500px] p-4 sm:p-6 lg:p-8">{children}</main>
        </div>
      </div>
    </WorkspaceRoleContext.Provider>
  );
}
