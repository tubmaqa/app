self.addEventListener('notificationclick', function(event) {
  if (event.notification.tag === 'ouvrir-camera') {
    // Envoyer un message au client pour ouvrir la caméra
    event.waitUntil(clients.matchAll({
      type: 'window',
      includeUncontrolled: true
    }).then(function(clientList) {
      for (var i = 0; i < clientList.length; i++) {
        var client = clientList[i];
        client.postMessage({ action: 'ouvrir-camera' });
        return;
      }
      // Si aucune fenêtre n'est ouverte, en ouvrir une nouvelle
      if (clients.openWindow) {
        return clients.openWindow('/'); // Rediriger vers la page principale
      }
    }));
  }
  event.notification.close();
});