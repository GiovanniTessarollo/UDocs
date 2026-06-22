import * as Notifications from "expo-notifications";

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowBanner: true,
    shouldShowList: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

export async function requestNotificationPermission() {
  const { status } =
    await Notifications.requestPermissionsAsync();

  console.log(
    "STATUS DA PERMISSÃO:",
    status
  );

  return status === "granted";
}

export async function scheduleExpirationNotification(
  nomeDocumento
) {
  try {
    const id =
      await Notifications.scheduleNotificationAsync({
        content: {
          title: "📄 Documento próximo do vencimento",
          body: `${nomeDocumento} precisa ser renovado.`,
        },
        trigger: null,
      });

    console.log(
      "NOTIFICAÇÃO CRIADA:",
      id
    );
  } catch (error) {
    console.log(
      "ERRO NOTIFICAÇÃO:",
      error
    );
  }
}