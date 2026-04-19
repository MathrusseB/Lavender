import { headers } from "next/headers";

const MOBILE_UA = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini|Mobile|Tablet|Silk/i;

export function isMobile(): boolean {
  const ua = headers().get("user-agent") ?? "";
  return MOBILE_UA.test(ua);
}
