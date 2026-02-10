const NOTIFICATION_ENDPOINT = '/api/notify';

export async function sendNotification(type: 'form' | 'chat', data: any) {
  try {
    const response = await fetch(NOTIFICATION_ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        type,
        timestamp: new Date().toISOString(),
        payload: data
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error(`Notification failed (${response.status}):`, errorText);
      return false;
    }

    return true;
  } catch (error) {
    console.error('Error sending notification:', error);
    return false;
  }
}
