// import { useEffect, useState } from "react";

// type BalanceItem = {
//   currency: string;
//   amount: number;
// };

// type StripeStatusResponse = {
//   payoutsStatus: "active" | "restricted" | "pending" | string;
//   balanceAvailable: BalanceItem[];
//   balancePending: BalanceItem[];
// };
// const baseUrl = process.env.NEXT_PUBLIC_BACKEND_URL;


// const OwnerStripeStatus: React.FC = () => {
//   const [status, setStatus] = useState<StripeStatusResponse>({
//     payoutsStatus: "",
//     balanceAvailable: [],
//     balancePending: [],
//   });

//   const [loading, setLoading] = useState<boolean>(true);
//   const [error, setError] = useState<string>("");

//   const fetchStatus = async (): Promise<void> => {
//     try {
//       const res = await fetch(`${baseUrl}/ownerstripestatus/status`, {
//         credentials: "include",
//       });

//       const data = await res.json();

//       if (!res.ok) {
//         throw new Error(data.error || "Failed to fetch Stripe status");
//       }

//       setStatus({
//         payoutsStatus: data.payoutsStatus,
//         balanceAvailable: data.balanceAvailable ?? [],
//         balancePending: data.balancePending ?? [],
//       });
//     } catch (err: any) {
//       setError(err.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchStatus();
//   }, []);

//   if (loading) return <p>Loading Stripe info...</p>;

//   if (error)
//     return <p className="text-red-600 font-medium">{error}</p>;

//   return (
//     <div className="space-y-4 p-4 border rounded-xl   bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-100 dark:border-gray-700">
//       <h2 className="font-semibold text-lg">Stripe Connect Status</h2>

//       <p>
//         Payouts Status:{" "}
//         <span
//           className={`font-bold ${
//             status.payoutsStatus === "active"
//               ? "text-green-600"
//               : status.payoutsStatus === "restricted"
//               ? "text-red-600"
//               : "text-yellow-600"
//           }`}
//         >
//           {status.payoutsStatus.toUpperCase()}
//         </span>
//       </p>

//       {status.payoutsStatus === "restricted" && (
//         <div className="bg-red-100 p-3 rounded text-red-800 text-sm">
//           Your Stripe account payouts are restricted.
//           <br />
//           Please complete required verification in Stripe to receive money.
//         </div>
//       )}

//       <div>
//         <h3 className="font-medium">Available Balance</h3>
//         {status.balanceAvailable.length === 0 && <p>0.00</p>}
//         {status.balanceAvailable.map((b, i) => (
//           <p key={i}>
//             {b.amount} {b.currency.toUpperCase()}
//           </p>
//         ))}
//       </div>

//       <div>
//         <h3 className="font-medium">Pending Balance</h3>
//         {status.balancePending.length === 0 && <p>0.00</p>}
//         {status.balancePending.map((b, i) => (
//           <p key={i}>
//             {b.amount} {b.currency.toUpperCase()}
//           </p>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default OwnerStripeStatus;


import { useEffect, useState } from "react";
import { AlertCircle, CheckCircle, Clock } from "lucide-react";

type BalanceItem = {
  currency: string;
  amount: number;
};

type StripeStatusResponse = {
  payoutsStatus: "active" | "restricted" | "pending" | string;
  balanceAvailable: BalanceItem[];
  balancePending: BalanceItem[];
};
const baseUrl = process.env.NEXT_PUBLIC_BACKEND_URL;

const OwnerStripeStatus: React.FC = () => {
  const [status, setStatus] = useState<StripeStatusResponse>({
    payoutsStatus: "",
    balanceAvailable: [],
    balancePending: [],
  });

  const [loading, setLoading] = useState<boolean>(true);
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

      setStatus({
        payoutsStatus: data.payoutsStatus,
        balanceAvailable: data.balanceAvailable ?? [],
        balancePending: data.balancePending ?? [],
      });

       console.log("res",data)

    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStatus();
  }, []);

  if (loading) {
    return (
      <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-100 dark:border-gray-700">
        <div className="flex items-center justify-center h-32">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-red-200 dark:border-red-900">
        <div className="flex items-center gap-3">
          <AlertCircle className="w-5 h-5 text-red-600" />
          <p className="text-red-600 font-medium">{error}</p>
        </div>
      </div>
    );
  }

  const getStatusIcon = (payoutsStatus: string) => {
    switch (payoutsStatus) {
      case "active":
        return <CheckCircle className="w-6 h-6 text-green-600" />;
      case "restricted":
        return <AlertCircle className="w-6 h-6 text-red-600" />;
      default:
        return <Clock className="w-6 h-6 text-yellow-600" />;
    }
  };

  const getStatusBadge = (payoutsStatus: string) => {
    switch (payoutsStatus) {
      case "active":
        return (
          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200">
            Active
          </span>
        );
      case "restricted":
        return (
          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200">
            Restricted
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-200">
            Pending
          </span>
        );
    }
  };



  return (
    <div className="space-y-6">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden">
        {/* Header */}
        <div className="p-6 border-b border-gray-100 dark:border-gray-700">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
            Stripe Connect Status
          </h2>
        </div>

        {/* Status Card */}
        <div className="p-6 space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-gray-600 dark:text-gray-400 font-medium">
              Payout Status
            </span>
            <div className="flex items-center gap-3">
              {getStatusIcon(status.payoutsStatus)}
              {getStatusBadge(status.payoutsStatus)}
            </div>
          </div>

          {/* <CHANGE> Improved restricted account warning with better styling */}
          {status.payoutsStatus === "restricted" && (
            <div className="mt-4 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
              <div className="flex gap-3">
                <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                <div className="text-sm text-red-700 dark:text-red-300">
                  <p className="font-medium mb-1">Account Restricted</p>
                  <p>Your Stripe account payouts are restricted. Please complete required verification in Stripe to receive money.</p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Balance Cards Grid */}
        <div className="px-6 pb-6 grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Available Balance Card */}
          <div className="bg-gradient-to-br from-green-50 to-green-50 dark:from-green-900/10 dark:to-green-900/10 border border-green-100 dark:border-green-800 rounded-lg p-4">
            <p className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-3">
              Available Balance
            </p>
            <div className="space-y-2">
              {status.balanceAvailable.length === 0 ? (
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  CAD 0.0
                </p>
              ) : (
                status.balanceAvailable.map((b, i) => (
                  <p key={i} className="text-2xl font-bold text-green-700 dark:text-green-400">
                    CAD {b.amount}
                  </p>
                ))
              )}
            </div>
          </div>

          {/* Pending Balance Card */}
          <div className="bg-gradient-to-br from-yellow-50 to-yellow-50 dark:from-yellow-900/10 dark:to-yellow-900/10 border border-yellow-100 dark:border-yellow-800 rounded-lg p-4">
            <p className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-3">
              Pending Balance
            </p>
            <div className="space-y-2">
              {status.balancePending.length === 0 ? (
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                 CAD 0.0
                </p>
              ) : (
                status.balancePending.map((b, i) => (
                  <p key={i} className="text-2xl font-bold text-yellow-700 dark:text-yellow-400">
                   CAD {b.amount}
                  </p>
                ))
              )}
            </div>
          </div>
        </div>
      </div>

      {/* <CHANGE> Added visual separator to show component boundary */}
      <hr className="border-gray-200 dark:border-gray-700" />
    </div>
  );
};

export default OwnerStripeStatus;