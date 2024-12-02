document.getElementById('submitBtn').addEventListener('click', function () {
    // Raccogli i dati del modulo
    const eventDate = document.getElementById('eventDate').value;
    const participants = parseInt(document.getElementById('participants').value, 10);
    const courses = parseInt(document.getElementById('courses').value, 10);
    const eventType = document.getElementById('eventType').value;
    const contactPreference = document.getElementById('contactPreference').value;

    // Verifica se i valori sono validi
    if (!eventDate || isNaN(participants) || participants <= 0 || isNaN(courses) || courses < 4 || courses > 20) {
        alert("Per favore, compila tutti i campi correttamente.");
        return; // Interrompe l'invio del modulo se i dati sono errati
    }

    // Calcolo del preventivo
    let basePrice = 50;
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

    // Verifica se il prezzo calcolato è valido
    if (price <= 0 || isNaN(price)) {
        alert("Si è verificato un errore nel calcolo del preventivo. Riprova.");
        return;
    }

    // Nascondi il modulo e mostra il risultato
    document.getElementById('quoteForm').style.display = 'none';
    const resultContainer = document.getElementById('resultContainer');
    const resultText = document.getElementById('resultText');
    resultText.innerHTML = `Il costo stimato per il tuo evento è: <strong>€${price.toFixed(2)}</strong>`;

    if (contactPreference === 'email' || contactPreference === 'phone') {
        resultText.innerHTML += '<br>Verrai ricontattato al più presto, grazie per aver scelto <strong>Rosso Cenere</strong>.';
    }

    resultContainer.style.display = 'block';
});
