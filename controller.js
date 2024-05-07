function addWorkoutPlan() {
    let exercise = document.getElementById("exercise");
    let oneRepMax = document.getElementById("oneRepMax");

    document.getElementById('programs').innerHTML += /*HTML*/ `
    <weight-calculator 
    id="${exercise.value}" 
    oneRM="${oneRepMax.value}"></weight-calculator>
    `;
    saveLocalWorkouts(exercise.value);
    exercise.value = '';
    oneRepMax.value = '';

}

// function toggleOther(){
//     document.getElementById('otherInput').classList.toggle('hidden');
// }

function saveLocalWorkouts(workoutID) {
    let workout = document.getElementById(workoutID);
    const data = {
        exercise: workout.getAttribute('id'),
        oneRM: workout.getAttribute('oneRM'),
    };
    localStorage.setItem(workoutID, JSON.stringify(data));
}

function loadLocalWorkouts() {
        for (let i = 0; i < localStorage.length; i++) {
            let key = localStorage.key(i);
            if (!key.includes('check')) {
                let workoutString = localStorage.getItem(key);
                let data = JSON.parse(workoutString);
                document.getElementById('programs').innerHTML += /*HTML*/ `
            <weight-calculator 
            id="${data.exercise}" 
            oneRM="${data.oneRM}"></weight-calculator>
            `;
        }
    }
    
}


function loadLocalCheckmarks() {
    for (let i = 0; i < localStorage.length; i++) {
        let checkKey = localStorage.key(i);
        if (checkKey.includes('check')) {
            let exercise = checkKey.substring(0, checkKey.lastIndexOf('check'))
            console.log(exercise);
            let weightCalculator = document.querySelector(`weight-calculator[id="${exercise}"]`);
            let isChecked = localStorage.getItem(checkKey);
            let checkbox = weightCalculator.shadowRoot.getElementById(checkKey);
            let tr = checkbox.parentNode.parentNode;
            console.log(checkKey);
            console.log(isChecked);
            console.log(checkbox);

            if (isChecked === 'true') {
                // console.log(checkbox);
                // console.log(checkbox.checked);
                
                checkbox.checked = true;
                tr.classList.add('done');
                // console.log(checkbox.checked);
            } else {
                checkbox.checked = false;
            }
        }
    }
}