"use client";

import { useEffect, useState } from "react";
import { BREAKPOINT_SM_PX } from "@/lib/ui-constants";

export function useIsNarrow(breakpointPx = BREAKPOINT_SM_PX) {
  const [narrow, setNarrow] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia(`(max-width: ${breakpointPx - 1}px)`);
    const update = () => setNarrow(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, [breakpointPx]);

  return narrow;
}
