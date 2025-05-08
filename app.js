// Vérifier si les notifications sont prises en charge
if ('serviceWorker' in navigator && 'Notification' in window) {
  navigator.serviceWorker.register('/service-worker.js').then(function(registration) {
    console.log('Service Worker enregistré avec succès:', registration);
  }).catch(function(error) {
    console.error('Erreur lors de l\'enregistrement du Service Worker:', error);
  });
} else {
  console.warn('Les notifications ne sont pas prises en charge sur ce navigateur.');
}

function afficherNotification() {
  Notification.requestPermission().then(function(result) {
    if (result === 'granted') {
      navigator.serviceWorker.ready.then(function(registration) {
        registration.showNotification('Ouverture de la caméra', {
          body: 'Cliquez ici pour ouvrir la caméra.',
          icon: 'icon.png', // Chemin vers une icône pour la notification
          tag: 'ouvrir-camera', // Un identifiant unique pour cette notification
        });
      });
    } else {
      console.log('Permission pour les notifications refusée.');
    }
  });
}

// Écouter l'événement de clic sur la notification
navigator.serviceWorker.addEventListener('message', function(event) {
  if (event.data && event.data.action === 'ouvrir-camera') {
    ouvrirCamera();
  }
});

function ouvrirCamera() {
  navigator.mediaDevices.getUserMedia({ video: true })
    .then(function(stream) {
      // Utilisez le flux vidéo ici (par exemple, l'afficher dans un élément <video>)
      const videoElement = document.getElementById('camera-flux');
      if (videoElement) {
        videoElement.srcObject = stream;
      } else {
        console.log('Élément vidéo non trouvé.');
      }
    })
    .catch(function(error) {
      console.error('Erreur lors de l\'accès à la caméra:', error);
    });
}

// Exemple d'appel pour afficher la notification (par exemple, au clic d'un bouton)
document.getElementById('bouton-notification').addEventListener('click', afficherNotification);