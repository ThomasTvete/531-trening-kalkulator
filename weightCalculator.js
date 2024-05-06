(function () {
    class WeightCalculator extends HTMLElement {
        constructor() {
            super();
            this.attachShadow({ mode: 'open' });

            const style = document.createElement('style');
            this.setStyle(style);
            this.shadowRoot.appendChild(style);

            this.root = document.createElement('div');
            this.shadowRoot.appendChild(this.root);
            this.model = {
                oneRM: 0,
                exercise: null,
            }

            // this.deleteProgram: function () {
            //     this.root.innerHTML = '';
            // }
        }

        connectedCallback() {
            let oneRepMax = this.getAttribute('oneRM');
            let exerciseName = this.getAttribute('id');

            this.model.oneRM = parseInt(oneRepMax);
            this.model.exercise = exerciseName;
            this.updateView();
        }

        setStyle(style) {
            style.innerText = `
            .workout {
                display: flex;
                justify-content: center;
                font-family: Arial, Helvetica, sans-serif;
                border-collapse: collapse;
            }

            h2 {
                display: flex;
                justify-content: center;
                margin-bottom: 0;
            }
            h3 {
                display: flex;
                justify-content: center;
                margin-top: 0;
            }
            
            .workout td, .workout th {
                border: 1px solid #ddd;
                padding: 8px;
            }
            
            .workout tr:nth-child(even){background-color: #f2f2f2;}
            
            .workout tr:hover {background-color: #ddd;}
            
            .workout th {
                padding-top: 12px;
                padding-bottom: 12px;
                text-align: left;
                background-color: #04AA6D;
                color: white;
            }

            .buttonWrap {
                display: flex;
                justify-content: center;
                margin: 10px;
            }

            .nonSet {
                background-color: lightgrey;
            }

            .done{
                text-decoration: line-through;
                color: #999; 
            }

            `;
        }
        updateView() {
            this.root.innerHTML = /*HTML*/ `
            <table class="workout">
                
                    <h2>${this.model.exercise}</h2>
                    <h3>(${this.model.oneRM} kg 1RM)</h3>
                
                <tr>
                    <th>Fullført</th>
                    <th>Uke</th>
                    <th>Type</th>
                    <th>Set 1</th>
                    <th>Set 2</th>
                    <th>Set 3</th>
                </tr>
                <tr>
                    <td><input type="checkbox" class="checkmark" id="${this.model.exercise}check1"></td>
                    <td class="nonSet">1</td>
                    <td class="nonSet">5/5/5+</td>
                    <td>${this.weightToLift(65)} kg x 5</td>
                    <td>${this.weightToLift(75)} kg x 5</td>
                    <td>${this.weightToLift(85)} kg x 5+</td>
                </tr>
                <tr>
                    <td><input type="checkbox" class="checkmark" id="${this.model.exercise}check2"/></td>
                    <td class="nonSet">2</td>
                    <td class="nonSet">3/3/3+</td>
                    <td>${this.weightToLift(70)} kg x 3</td>
                    <td>${this.weightToLift(80)} kg x 3</td>
                    <td>${this.weightToLift(90)} kg x 3+</td>
                </tr>
                <tr>
                    <td><input type="checkbox" class="checkmark" id="${this.model.exercise}check3"/></td>
                    <td class="nonSet">3</td>
                    <td class="nonSet">5/3/1+</td>
                    <td>${this.weightToLift(75)} kg x 5</td>
                    <td>${this.weightToLift(85)} kg x 3</td>
                    <td>${this.weightToLift(95)} kg x 1+</td>
                </tr>
                <tr>
                    <td><input type="checkbox" class="checkmark" id="${this.model.exercise}check4"/></td>
                    <td class="nonSet">4</td>
                    <td class="nonSet">Deload</td>
                    <td>${this.weightToLift(40)} kg x 5</td>
                    <td>${this.weightToLift(50)} kg x 5</td>
                    <td>${this.weightToLift(60)} kg x 5</td>
                </tr>
            </table>

            <div class="buttonWrap">
                <button class="delete">Slett program</button>
            </div>
            
            `;
            const checkboxes = this.root.querySelectorAll('.checkmark');

            this.root.querySelector('.delete').addEventListener('click', () => {
                this.deleteProgram(checkboxes);
            });



            for (let checkbox of checkboxes) {
                checkbox.addEventListener('click', () => {
                    let tr = checkbox.parentNode.parentNode;

                    if (checkbox.checked) {
                        tr.classList.add('done');
                    } else {
                        tr.classList.remove('done');
                    }
                });
                checkbox.addEventListener('change', () => {
                    localStorage.setItem(checkbox.id, checkbox.checked);
                });
            }


        }

        weightToLift(percentage) {
            let fraction = (percentage / 100);
            let trainingMax = this.model.oneRM * 0.9;
            let TMPercent = fraction * trainingMax
            return Math.round(TMPercent * 2)/2;

        }

        deleteProgram(checkboxes) {
            let id = this.getAttribute('id');
            let table = document.getElementById(`${id}`);
            // console.log(document.getElementById(`${id}`));
            table.remove();
            localStorage.removeItem(id);
            for (let checkbox of checkboxes)localStorage.removeItem(checkbox.id);
        }

    }

    customElements.define('weight-calculator', WeightCalculator);
})();