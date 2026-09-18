"use client";

import { useEffect, useState } from "react";
import { BellRing, BellOff } from "lucide-react";

type Status =
  | "checking"
  | "unsupported"
  | "denied"
  | "subscribed"
  | "unsubscribed";

function urlBase64ToUint8Array(base64String: string) {
  const padding = "=".repeat((4 - (base64String.length % 4)) % 4);
  const base64 = (base64String + padding).replace(/-/g, "+").replace(/_/g, "/");
  const rawData = atob(base64);
  return Uint8Array.from([...rawData].map((char) => char.charCodeAt(0)));
}

export default function PushNotificationSetup() {
  const [status, setStatus] = useState<Status>("checking");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function init() {
      if (
        typeof window === "undefined" ||
        !("serviceWorker" in navigator) ||
        !("PushManager" in window)
      ) {
        setStatus("unsupported");
        return;
      }

      if (Notification.permission === "denied") {
        setStatus("denied");
        return;
      }

      const registration = await navigator.serviceWorker.register("/sw.js");
      const subscription = await registration.pushManager.getSubscription();
      setStatus(subscription ? "subscribed" : "unsubscribed");
    }

    init().catch(() => setStatus("unsupported"));
  }, []);

  async function handleEnable() {
    setBusy(true);
    setError(null);
    try {
      const permission = await Notification.requestPermission();
      if (permission !== "granted") {
        setStatus("denied");
        return;
      }

      const publicKey = process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY;
      if (!publicKey) {
        throw new Error("Notifications push non configurées.");
      }

      const registration = await navigator.serviceWorker.ready;
      const subscription = await registration.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: urlBase64ToUint8Array(publicKey),
      });

      const res = await fetch("/admin/push/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(subscription),
      });

      if (!res.ok) throw new Error("Échec de l'enregistrement.");

      setStatus("subscribed");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Échec de l'activation.");
    } finally {
      setBusy(false);
    }
  }

  async function handleDisable() {
    setBusy(true);
    setError(null);
    try {
      const registration = await navigator.serviceWorker.ready;
      const subscription = await registration.pushManager.getSubscription();

      if (subscription) {
        await fetch("/admin/push/unsubscribe", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ endpoint: subscription.endpoint }),
        });
        await subscription.unsubscribe();
      }

      setStatus("unsubscribed");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Échec de la désactivation.");
    } finally {
      setBusy(false);
    }
  }

  if (status === "checking" || status === "unsupported") {
    return null;
  }

  return (
    <div className="mb-8 flex flex-col items-start justify-between gap-4 rounded-xl bg-white p-5 shadow-sm sm:flex-row sm:items-center">
      <div className="flex items-center gap-3">
        {status === "subscribed" ? (
          <BellRing className="text-green-600" size={22} />
        ) : (
          <BellOff className="text-[#999]" size={22} />
        )}
        <div>
          <p className="font-semibold text-primary">
            {status === "subscribed" && "Notifications activées"}
            {status === "unsubscribed" && "Notifications désactivées"}
            {status === "denied" &&
              "Notifications bloquées par le navigateur"}
          </p>
          {status === "denied" && (
            <p className="text-sm text-[#777]">
              Autorise les notifications pour ce site dans les réglages de
              ton navigateur/téléphone pour les activer.
            </p>
          )}
          {error && <p className="text-sm text-red-600">{error}</p>}
        </div>
      </div>

      {status === "unsubscribed" && (
        <button
          onClick={handleEnable}
          disabled={busy}
          className="rounded-full bg-accent px-5 py-2 text-sm font-semibold text-white transition-transform hover:-translate-y-0.5 disabled:opacity-50"
        >
          {busy ? "..." : "Activer les notifications"}
        </button>
      )}
      {status === "subscribed" && (
        <button
          onClick={handleDisable}
          disabled={busy}
          className="text-sm font-semibold text-red-600 hover:underline disabled:opacity-50"
        >
          Désactiver
        </button>
      )}
    </div>
  );
}
