import { useState, useEffect } from "react";
import { OwnerNavbar } from "./OwnerNavbar";
import { OwnerSidebar } from "./OwnerSidebar";

interface OwnerLayoutProps {
  children: React.ReactNode;
}

const baseUrl = process.env.NEXT_PUBLIC_BACKEND_URL;

export function OwnerLayout({ children }: OwnerLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("owner-dark-mode");
    if (saved === "true") {
      setIsDarkMode(true);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("owner-dark-mode", String(isDarkMode));
    if (isDarkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [isDarkMode]);




    const [error, setError] = useState<string>("");
  
    const fetchStatus = async (): Promise<void> => {
      try {
        const res = await fetch(`${baseUrl}/ownerstripestatus/status`, {
          credentials: "include",
        });
  
        const data = await res.json();
  
        if (!res.ok) {
          throw new Error(data.error || "Failed to fetch Stripe status");
        }

        
  
         console.log("res",data)
  
      } catch (err: any) {
        setError(err.message);
      } finally {
      }
    };
  
    useEffect(() => {
      fetchStatus();
    }, []);



      const handleStripeConnect = async () => {
    try {
      const response = await fetch(`${baseUrl}/payout/connect`, {
        method: "POST",
        credentials: "include",
      });

      const data = await response.json();

      if (response.ok && data.url) {
        window.location.href = data.url; // Redirect to Stripe
      }
    } catch (err) {
      console.error("Stripe connect error:", err);
    }
  };



  return (
    <div
      className={`min-h-screen transition-colors ${isDarkMode ? "bg-gray-950" : "bg-gray-50"
        }`}
    >
      <div className="flex">
        <OwnerSidebar
          isOpen={sidebarOpen}
          onClose={() => setSidebarOpen(false)}
          isDarkMode={isDarkMode}
        />
        <div className="flex-1 flex flex-col min-h-screen lg:ml-0">
          <OwnerNavbar
            onMenuClick={() => setSidebarOpen(true)}
            isDarkMode={isDarkMode}
            onToggleDarkMode={() => setIsDarkMode(!isDarkMode)}
          />








        {error && (<>
        <div className="w-full bg-red-600 text-white px-4 py-2 flex items-center gap-2 text-sm font-medium  shadow-sm">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 9v2m0 4h.01M10.29 3.86L1.82 18a1 1 0 00.86 1.5h18.64a1 1 0 00.86-1.5L13.71 3.86a1 1 0 00-1.72 0z"
              />
            </svg>

            <span>
             Customers are unable to see your property, you haven't connected your Stripe account yet. Connect to receive payouts.
            </span>

            <button
              className="ml-auto bg-white text-red-600 px-3 py-1 rounded hover:bg-red-50 text-xs font-semibold"
              onClick={handleStripeConnect}
            >
              Connect Now
            </button>
          </div>
        </>)}
          











          <main
            className={`flex-1 p-4 md:p-6 lg:p-8 ${isDarkMode ? "text-white" : "text-gray-900"
              }`}
          >
            {children}
          </main>
        </div>
      </div>
    </div>
  );
}
