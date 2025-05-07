"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

export default function BrowserNavigationGuard() {
  const pathname = usePathname();

  useEffect(() => {
    const preventNavigation = (event) => {
      event.preventDefault();
      event.stopPropagation();
      // Push current path again to keep the user on current page
      window.history.pushState(null, "", pathname);
    };

    // Prevent navigation attempts
    window.addEventListener("popstate", preventNavigation);

    // Set initial history state
    window.history.pushState(null, "", pathname);

    // Handle any attempts to modify history
    const originalPushState = window.history.pushState.bind(window.history);
    const originalReplaceState = window.history.replaceState.bind(
      window.history
    );

    window.history.pushState = function () {
      originalPushState.apply(this, arguments);
      window.dispatchEvent(new Event("popstate"));
    };

    window.history.replaceState = function () {
      originalReplaceState.apply(this, arguments);
      window.dispatchEvent(new Event("popstate"));
    };

    return () => {
      window.removeEventListener("popstate", preventNavigation);
      window.history.pushState = originalPushState;
      window.history.replaceState = originalReplaceState;
    };
  }, [pathname]);

  return null;
}
