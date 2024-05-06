function loadForm() {
    document.getElementById('app').innerHTML = /*HTML*/ `
    <h1>5/3/1 Treningskalkulator</h1>
    <div id="programs"></div>
    <div class="userInput">
        <div class="inputBox">
            <h3>Legg inn øvelse</h3>
            <input id="exercise" type="text"/>
        </div>
        <div class="inputBox">
            <h3>Legg inn 1RM</h3>
            <input id="oneRepMax" type="number"/>
        </div>
        <button onclick="addWorkoutPlan()">Legg til treningsplan</button>
    </div>
    
    `;
    loadLocalWorkouts();
    loadLocalCheckmarks();
}