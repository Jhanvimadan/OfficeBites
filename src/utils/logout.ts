import type { NavigateFunction } from "react-router-dom";

/**
 * Logs the user out by clearing ONLY session-related data.
 * Order history is intentionally preserved per email.
 */
export function logout(navigate: NavigateFunction): void {
  // Clear session identity
  localStorage.removeItem("currentUserEmail");

  // Clear session-only data
  localStorage.removeItem("lastOrder");
  localStorage.removeItem("currentRestaurantOffer");
  localStorage.removeItem("office");

  // Force redirect to Login and prevent back navigation
  navigate("/", { replace: true });
}