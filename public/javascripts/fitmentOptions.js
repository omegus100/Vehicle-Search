
const fitmentSelects = document.querySelectorAll('select');

function getFitmentOptions() {
    const fitmentOptions = document.querySelectorAll('.fitment-option');
    const fitmentValues = Array.from(fitmentOptions).map(option => ({
        year: option.getAttribute('data-year'),
        make: option.getAttribute('data-make'),
        model: option.getAttribute('data-model'),
        fitment: option.getAttribute('data-fitment'),
        previous: option.getAttribute('data-previous-value'),
        value: option.value
    }));

    return fitmentValues;
}

let current = {
    year: "",
    make: "",
    model: "",
};

// function processFitmentOptions(fitmentValues) {
//     // Example processing: log each fitment option
//     fitmentValues.forEach(fitment => {     
//        // console.log(`Year: ${fitment.year}, Make: ${fitment.make}, Model: ${fitment.model}, Fitment: ${fitment.fitment}, Value: ${fitment.value}`);
//     });
// }
// Get the fitment options and pass them to the new function
// const fitmentValues = getFitmentOptions();
// processFitmentOptions(fitmentValues);

function fitmentChanged() {
    fitmentSelects.forEach(select => {
        select.addEventListener('change', (e) => {
            console.log(e.target)
            filterSelectedFitmentOptions(e.target.name, e.target.value);
        });
    });
}

async function filterSelectedFitmentOptions(type, value) {
    let fitments = getFitmentOptions()
    try {
       switch (type) {         
        case 'year':    
           current.year = value     
           updateSelectedFitmentOptions(type, value)        
            //   const filteredFitmentsByYear = fitments.filter(
            //     fitment => fitment.fitment && fitment.make != null && fitment.fitment.includes(value)
            // )          
            break;           
        case 'make':
            current.make = value  
            let make = `${current.year } ${value}`
            updateSelectedFitmentOptions(type, make)
            //   const filteredFitmentsByMake = fitments.filter(
            //     fitment => fitment.fitment && fitment.model != null && fitment.fitment.includes(current.year) && fitment.fitment.includes(value)
            // ) 
            break;        
        case 'model':
              console.log('model', value);
               break;
       }
    } catch (error) {
        console.log(error);
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
                    console.log(value, option)
                    option.disabled = false;
                } else {
                    option.disabled = true;
                }
              });
        }
    });
}

fitmentChanged();

