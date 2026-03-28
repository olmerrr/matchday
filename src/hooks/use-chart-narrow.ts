import { useIsNarrow } from "@/hooks/use-is-narrow";
import { BREAKPOINT_SM_PX } from "@/lib/ui-constants";

export function useChartNarrow() {
  return useIsNarrow(BREAKPOINT_SM_PX);
}
