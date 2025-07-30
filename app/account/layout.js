// app/account/layout.jsx

import React from "react";
import Sidebar from "./_components/Sidebar";
import Breadcrumb from "./_components/Breadcrumb";

export default function AccountLayout({ children }) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-cream-50 via-cream-100 to-brand-50">
      <div className="flex flex-col md:flex-row">
        {/* Sidebar - hidden on mobile by default */}
        <Sidebar />

        {/* Main content */}
        <main className="md:pl-80 flex-1 w-full">
          <div className="px-4 md:px-8 py-6">
            {/* Page header with breadcrumb */}
            <Breadcrumb />

            {/* Page content - centered with proper max-width */}
            <div className="mx-auto max-w-4xl w-full">{children}</div>
          </div>
        </main>
      </div>
    </div>
  );
}
