/* Inhalt: Logik für das Kontaktformular (Senden an Google Web App) */

document.getElementById('contactForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Standard-Formularsendung verhindern
    
    const form = event.target;
    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());
    const submitButton = document.getElementById('submitButton');
    const submitMessage = document.getElementById('submitMessage');
    
    // Status auf 'Laden' setzen
    submitMessage.style.display = 'block';
    submitMessage.className = 'loading';
    submitMessage.textContent = 'Ihre Anfrage wird gesendet...';
    submitButton.disabled = true;
    
    // Dies ist die URL, die Sie in Google Apps Script nach der Bereitstellung erhalten
    const webAppUrl = 'https://script.google.com/macros/s/AKfycbxpng3RZSbRtAhnRSzS_HRVivm3WAInXbyMgfaAeaMTr0Dg92_blAcXQBCTKZLtBGx0/exec'; 
    
    // Formular-Daten als URL-kodierte Zeichenkette vorbereiten
    const params = new URLSearchParams(data).toString();

    fetch(webAppUrl, {
        method: 'POST',
        mode: 'no-cors', // Notwendig für das Senden an Google Apps Script von einer separaten Domain
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: params
    })
    .then(response => {
        // Obwohl 'no-cors' keine echte Antwort zurückgibt, gehen wir hier von Erfolg aus
        // da der Fetch-Aufruf selbst gestartet wurde.

        // Status auf 'Erfolg' setzen
        submitMessage.className = 'success';
        submitMessage.textContent = 'Vielen Dank! Ihre Nachricht wurde erfolgreich gesendet.';
        
        // Formular zurücksetzen
        form.reset();
    })
    .catch(error => {
        console.error('Fetch-Fehler:', error);
        // Status auf 'Fehler' setzen
        submitMessage.className = 'error';
        submitMessage.textContent = 'Ein Fehler ist aufgetreten. Bitte versuchen Sie es später erneut oder senden Sie eine E-Mail.';
    })
    .finally(() => {
        // Nach 5 Sekunden den Button wieder aktivieren und die Nachricht ausblenden
        setTimeout(() => {
            submitButton.disabled = false;
            submitMessage.style.display = 'none';
        }, 5000); 
    });
});