"use client";

import Script from "next/script";

export default function GoogleOneTap() {
  const handleCredentialResponse = async (response: any) => {
    console.log("callback", response.credential);

    const res = await fetch("/api/google-login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ idToken: response.credential }),
    });

    const result = await res.json();
    if (result.success) {
      console.log("Customer logged in or created:", result.customer);
    } else {
      console.error("Login failed:", result.error);
    }
  };

  const handleScriptLoad = () => {
    window.google.accounts.id.initialize({
      client_id: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID!,
      callback: (response) => handleCredentialResponse(response),
      auto_select: false, // safest default
    });

    window.google.accounts.id.prompt((notification) => {
      if (notification.isNotDisplayed()) {
        console.warn(
          "🚫 Not displayed:",
          notification.getNotDisplayedReason?.()
        );
      }
      if (notification.isSkippedMoment()) {
        console.warn("⏩ Skipped:", notification.getSkippedReason?.());
      }
      if (notification.isDisplayed()) {
        console.log("🎉 One Tap is displayed.");
      }
    });
  };

  return (
    <Script
      src="https://accounts.google.com/gsi/client"
      async
      onLoad={handleScriptLoad}
    />
  );
}
