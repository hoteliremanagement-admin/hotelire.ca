import { Suspense } from "react";
import SignUpClient from "./signup-client";

export default function SignUpPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <SignUpClient />
    </Suspense>
  );
}
