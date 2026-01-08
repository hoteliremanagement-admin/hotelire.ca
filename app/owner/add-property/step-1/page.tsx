"use client";

import { Suspense } from "react";
import StepOne from "./step-1";

export default function Page() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <StepOne />
    </Suspense>
  );
}
