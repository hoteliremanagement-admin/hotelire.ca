"use client";

import { Suspense } from "react";
import StepOne from "./step-2";

export default function Page() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <StepOne />
    </Suspense>
  );
}
