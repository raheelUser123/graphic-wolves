"use client";

import { Fragment, type ReactNode } from "react";
import { usePathname } from "next/navigation";

export default function RouteShell({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  return <Fragment key={pathname}>{children}</Fragment>;
}
