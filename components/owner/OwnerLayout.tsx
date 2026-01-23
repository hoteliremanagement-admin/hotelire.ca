import { useState, useEffect } from "react";
import { OwnerNavbar } from "./OwnerNavbar";
import { OwnerSidebar } from "./OwnerSidebar";
import AlertStrip from "./alertStrip";
import { AlertCircle } from "lucide-react";

interface OwnerLayoutProps {
  children: React.ReactNode;
  hideStripeAlert?: boolean;

}

const baseUrl = process.env.NEXT_PUBLIC_BACKEND_URL;

export function OwnerLayout({ children, hideStripeAlert = false }: OwnerLayoutProps) {
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

      console.log("res", data)

    } catch (err: any) {
      setError(err.message);
    } finally {
    }
  };


  const [payout, setPayout] = useState({
    isConnected: false,
  });

  const fetchPayoutDetails = async () => {
    try {
      const response = await fetch(`${baseUrl}/payout/details`, {
        credentials: "include",
      });

      if (response.ok) {
        const data = await response.json();
        setPayout({
          isConnected: Boolean(data.payout.stripeConnectAccountId),
        });
      }
    } catch (err) {
      console.error("Error fetching payout details:", err);
    }
  };

  useEffect(() => {
    fetchStatus();
    fetchPayoutDetails();
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

          {error && !hideStripeAlert && (<>

            <AlertStrip
              title="Connection Required"
              message={
                payout.isConnected ? 
                  "Hmm. It looks like Your Stripe account is not fully set up. Please confirm bank details and complete the setup to enable payouts.": 
                  "Customers are unable to see your property. Connect to receive payouts. Some pages will not be accessible still."
              }
              type="error"
              icon={<AlertCircle className="h-5 w-5" />}
              action={{
                label: payout.isConnected ? "Manage Stripe Account" : "Connect with Stripe",
                onClick: handleStripeConnect
              }}
            />
          </>)
          }
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