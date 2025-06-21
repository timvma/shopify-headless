interface Window {
  google: typeof google;
}

declare const google: {
  accounts: {
    id: {
      initialize: (config: {
        client_id: string;
        callback: (response: { credential: string }) => void;
        auto_select?: boolean;
        cancel_on_tap_outside?: boolean;
        context?: "signin" | "signup" | "use";
      }) => void;
      prompt: (callback?: (notification: any) => void) => void;
    };
  };
};
