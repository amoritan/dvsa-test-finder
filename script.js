const successAudio = new Audio('https://github.com/amoritan/dvsa-test-finder/raw/main/assets/success.mp3');
const warningAudio = new Audio('https://github.com/amoritan/dvsa-test-finder/raw/main/assets/warning.mp3');

const submitButton = document.getElementById('test-centres-submit');

if (submitButton) {
  let beforeDateString = localStorage.getItem('testFinderBeforeDate');
  if (!beforeDateString) {
    beforeDateString = prompt('What is the latest date you want to get notified for? (DD/MM/YYYY)');
    localStorage.setItem('testFinderBeforeDate', beforeDateString);
  }
  const beforeDate = new Date(beforeDateString);

  if (Notification.permission !== 'granted') {
    Notification.requestPermission();
  }

  let testCentresAvailable = [];
  document.querySelectorAll('.test-centre-details-link').forEach(e => {
    const centreAvailability = e.querySelectorAll('h5')[0].textContent;
    if (centreAvailability !== ' – No tests found on any date') {
      const centreDateString = centreAvailability.split(' ')[centreAvailability.split(' ').length - 1];
      const centreDate = new Date(centreDateString);

      if (centreDate < beforeDate) {
        const centreName = e.querySelectorAll('h4')[0].textContent;
        testCentresAvailable.push(`${centreName} - ${centreDateString}`);
      } else {
        console.log('📅 Availability found after the preferred date');
      }
    }
  });
  if (testCentresAvailable.length > 0) {
    alert(`🎉 Available test centre/s found: ${testCentresAvailable.join(', ')}`);
    successAudio.play();
  } else {
    console.log('😢 No available test centres were found');
    window.setTimeout(
      () => { document.getElementById('test-centres-submit').click(); },
      Math.floor(Math.random() * (300000 - 270000) + 270000) // Around 5 minutes
    );
  }
} else if (document.getElementById('main-iframe')) {
  alert('🛑 The website requires your attention');
  warningAudio.play();
} else {
  console.warn('🔍 Not on the right page yet...');
}
