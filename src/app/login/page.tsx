// app/login/page.tsx
"use client";

import { useEffect } from "react";

export default function LoginPage() {
  useEffect(() => {
    const initializeGoogle = () => {
      if (window.google) {
        window.google.accounts.id.initialize({
          client_id: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID!,
          callback: handleCredentialResponse,
        });
        window.google.accounts.id.renderButton(
          document.getElementById("google-button")!,
          { theme: "outline", size: "large" }
        );
      }
    };

    const script = document.createElement("script");
    script.src = "https://accounts.google.com/gsi/client";
    script.onload = initializeGoogle;
    document.body.appendChild(script);
  }, []);

  const handleCredentialResponse = async (response: any) => {
    const token = response.credential;

    const res = await fetch("/api/google-login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ idToken: token }),
    });

    const result = await res.json();
    if (result.success) {
      alert("Login successful!");
      // Redirect or set session here
    } else {
      alert("Login failed.");
    }
  };

  return (
    <main>
      <h1>Login with Google</h1>
      <div id="google-button" />
    </main>
  );
}
