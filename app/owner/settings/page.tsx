import { Suspense } from "react";
import SettingsPage from "./settings";

function SettingsLoader() {
  return (
    <div className="p-6 space-y-4 animate-pulse">
      <div className="h-8 w-40 bg-gray-200 rounded"></div>
      <div className="h-4 w-64 bg-gray-200 rounded"></div>

      <div className="bg-white rounded-xl shadow p-6 space-y-4">
        <div className="h-6 w-32 bg-gray-200 rounded"></div>
        <div className="h-10 w-full bg-gray-200 rounded"></div>
        <div className="h-10 w-full bg-gray-200 rounded"></div>
      </div>
    </div>
  );
}

export default function Page() {
  return (
    <Suspense fallback={<SettingsLoader />}>
      <SettingsPage />
    </Suspense>
  );
}
