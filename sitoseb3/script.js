document.getElementById('submitBtn').addEventListener('click', function () {
    // Raccogli i dati del modulo
    const eventDate = document.getElementById('eventDate').value;
    const participants = parseInt(document.getElementById('participants').value, 10);
    const courses = parseInt(document.getElementById('courses').value, 10);
    const eventType = document.getElementById('eventType').value;
    const contactPreference = document.getElementById('contactPreference').value;

    // Regole per il calcolo del preventivo
    let basePrice = 50; // Prezzo base per partecipante
    let eventMultiplier = 1;

    switch (eventType) {
        case 'matrimonio':
            eventMultiplier = 1.5;
            break;
        case 'battesimo':
        case 'comunione':
            eventMultiplier = 1.2;
            break;
        case 'cresima':
        case 'festa privata':
        case 'compleanno':
            eventMultiplier = 1.1;
            break;
        default:
            eventMultiplier = 1;
    }

    const isWeekend = ['Saturday', 'Sunday'].includes(new Date(eventDate).toLocaleDateString('en-US', { weekday: 'long' }));
    const weekendMultiplier = isWeekend ? 1.2 : 1;

    const price = participants * courses * basePrice * eventMultiplier * weekendMultiplier;

    // Nascondi il form
    document.getElementById('quoteForm').style.display = 'none';

    // Mostra il risultato
    const resultContainer = document.getElementById('resultContainer');
    const resultText = document.getElementById('resultText');
    resultText.innerHTML = `Il costo stimato per il tuo evento è: <strong>€${price.toFixed(2)}</strong>`;

    if (contactPreference === 'email' || contactPreference === 'phone') {
        resultText.innerHTML += '<br>Verrai ricontattato al più presto, grazie per aver scelto <strong>Rosso Cenere</strong>.';
    }

    resultContainer.style.display = 'block';
});
