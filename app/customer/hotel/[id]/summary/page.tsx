import StripeProvider from "@/components/StripeProvider";
import BookingSummaryPage from "./BookingSummaryPage";

export default function Page() {
  return (
    <StripeProvider>
      <BookingSummaryPage />
    </StripeProvider>
  );
}
