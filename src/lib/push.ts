import "server-only";
import webpush from "web-push";
import { prisma } from "@/lib/prisma";

function configureWebPush() {
  const publicKey = process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY;
  const privateKey = process.env.VAPID_PRIVATE_KEY;
  const subject = process.env.VAPID_SUBJECT;

  if (!publicKey || !privateKey || !subject) {
    throw new Error(
      "Notifications push non configurées (clés VAPID manquantes).",
    );
  }

  webpush.setVapidDetails(subject, publicKey, privateKey);
}

export async function sendPushToAll(payload: {
  title: string;
  body: string;
  url?: string;
}) {
  configureWebPush();

  const subscriptions = await prisma.pushSubscription.findMany();
  const message = JSON.stringify(payload);

  await Promise.all(
    subscriptions.map(async (sub) => {
      try {
        await webpush.sendNotification(
          {
            endpoint: sub.endpoint,
            keys: { p256dh: sub.p256dh, auth: sub.auth },
          },
          message,
        );
      } catch (err) {
        const statusCode =
          err && typeof err === "object" && "statusCode" in err
            ? (err as { statusCode?: number }).statusCode
            : undefined;

        if (statusCode === 404 || statusCode === 410) {
          await prisma.pushSubscription
            .delete({ where: { id: sub.id } })
            .catch(() => null);
        }
      }
    }),
  );
}
