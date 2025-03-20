const fitmentSelects = document.querySelectorAll('select.vehicle-search-dropdown')
const fitmentSelectOptions = document.querySelectorAll('.vehicle-search-dropdown option');
const searchBtn = document.querySelector('.vehicle-search-btn')

let current = {
    year: "",
    make: "",
    model: "",
}

let selectArrays = {
    year: [],
    make: [],
    model: [], 
}

async function loadFitments() {
    try {
        await getDuplicateOptions()
        await fitmentChanged()
    }
     catch (error) {
        console.error(error)
    }
}   

function getDuplicateOptions() {
    let year = selectArrays.year
    let make = selectArrays.make
    let model = selectArrays.model
   
    fitmentSelectOptions.forEach(option =>{
        let type = option.dataset.fitmentType
        if(type){
            switch (type) {         
                case 'year':    
                   removeDuplicateOptions(year, option)                   
                   break;           
                case 'make':
                    removeDuplicateOptions(make, option) 
                    break;        
                case 'model':        
                    removeDuplicateOptions(model, option) 
                    break;
               }
        }     
    }) 
}

function removeDuplicateOptions(array, option){
    let name = option.value

    if(!array.includes(name)){
        array.push(name)
    } else if(array.includes(name)){
        option.classList.toggle("hide")
    }
}

function fitmentChanged() {
    fitmentSelects.forEach(select => {
        select.addEventListener('change', (e) => {
            filterSelectedFitmentOptions(e.target.name, e.target.value);
        });
    });
}

async function filterSelectedFitmentOptions(type, value) {
    try {
       switch (type) {         
        case 'year':    
           current.year = value     // Sets current year equal to selected year  
           updateSelectedFitmentOptions(type, value)                    
           break;           
        case 'make':
            current.make = value    // Sets current make equal to selected make
            let make = `${current.year } ${value}`
            updateSelectedFitmentOptions(type, make)
            break;        
        case 'model':        
            updateSearchBtn()
            break;
       }
    } catch (error) {
        console.error(error);
    }  
}

function updateSelectedFitmentOptions(type, value) {
   
    fitmentSelects.forEach(select => {
        let previousType = select.dataset.previousFitmentType

        if(previousType && type == previousType){   
            const options = select.querySelectorAll('option')
            options.forEach(option => {        
                let fitment = option.dataset.fitment  

                if(fitment.includes(value)){                 
                    option.disabled = false; // Shows valid fitment options
                } else {
                    option.disabled = true; // Hides invalid fitment options
                }
              });
        }
    });
}

// Disables search button when model selected
function updateSearchBtn() {
    searchBtn.disabled = false
}

loadFitments()

// function getFitmentOptions() {
//     const fitmentOptions = document.querySelectorAll('.fitment-option');
//     const fitmentValues = Array.from(fitmentOptions).map(option => ({
//         year: option.getAttribute('data-year'),
//         make: option.getAttribute('data-make'),
//         model: option.getAttribute('data-model'),
//         fitment: option.getAttribute('data-fitment'),
//         previous: option.getAttribute('data-previous-value'),
//         value: option.value
//     }));

//     return fitmentValues;
// }

// function processFitmentOptions(fitmentValues) {
//     // Example processing: log each fitment option
//     fitmentValues.forEach(fitment => {     
//        // console.log(`Year: ${fitment.year}, Make: ${fitment.make}, Model: ${fitment.model}, Fitment: ${fitment.fitment}, Value: ${fitment.value}`);
//     });
// }
// Get the fitment options and pass them to the new function
// const fitmentValues = getFitmentOptions();
// processFitmentOptions(fitmentValues);