// DOM
let countries = [];
const info = document.querySelector('#info');
const fetchData = async () =>{
   
    try {
        const res = await fetch(`https://restcountries.com/v3.1/all`, {method: 'GET'});
        countries = await res.json();
        console.log(countries);
    } catch (error) {
        console.log(error);   
    }

 };
 

 fetchData()
const input = document.querySelector('#buscar');

input.addEventListener('input', async e =>{
    info.innerHTML = `<div class="loader"></div>`
   
    fetchData();
    e.preventDefault();
    info.innerHTML = `<div class="loader"></div>`
    const listafiltrada = countries.filter(element => element.name.common.toLowerCase().startsWith(e.target.value.toLowerCase()));
    console.log(listafiltrada);
    if ( listafiltrada.length > 10  && listafiltrada.length < countries.length){
        info.innerHTML = `
        <div class="cart">
                  <p>Debes especificar más tú busqueda...</p>
             </div>
       
        `
    } else if(!listafiltrada.length){
        info.innerHTML = `
        <div class="cart">
                  <p>Debes poner un pais valido...</p>
             </div>
       
        `

    } 
    else if (listafiltrada.length < 10 && listafiltrada.length !== 1) {
        let elementos = '';

        [...listafiltrada].forEach(item => {
             elementos +=
             `<div class="cart">
                  <ul>
                 <img src="${item.flags.svg}" class="banderas">
                 <p class:"info">${item.name.common}</p>
                
                 </ul>
             </div>
                 
                 ` 
        });
    
     info.innerHTML = elementos
    
     


    } else if(listafiltrada.length === 1){

    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${listafiltrada[0].latlng[0]}&lon=${listafiltrada[0].latlng[1]}&appid=ce349008e5a77a0b1d6688eab5a11e88&units=metric&leng=es`
   const clima = await (await fetch(url, {method: 'GET'})).json();
   console.log(clima);

        [...listafiltrada].forEach(lista =>{
                const flags = lista.flags.svg;
                const name = lista.name.common;
                const capital = lista.capital;
                const region = lista.region;
                const population = lista.population;
                
        
                info.innerHTML =`
                <div class="cart-final">
                  <img src="${flags}" id="bandera" >
                <h3 class="info"> ${name}</h3>
                    <p class="info">La Capital es: ${capital}</p>
                    <p class="info">Tiene una poblacion de: ${population} habitantes</p>
                    <p class="info">Esta en el continente: ${region}</p>
                    <p class="info">La temperatura actual es: ${clima.main.temp} Cº</p>

                
             </div>
                ` 
                
            });
        
    }
    else {
        info.innerHTML = ''
    };
    
});
    
    
    
//     else if (listafiltrada.length <= 10 && listafiltrada.length > 1){
//         listafiltrada.forEach( elementos => {
//             const listItem = document.createElement('li');
//             listItem.li = elementos.li
//         });
//             elementos.innerHTML =`
//             <img src="${listItem.flags.svg}" id="banderas" class="info" alt="bandera">
//             <h3 class="info"> ${listItem.name.common}</h3>
//             `
// };
            
//         });
    
    

    // [...listafiltrada].forEach(lista =>{
    //     const flags = lista.flags.svg;
    //     const name = lista.name.common;
    //     const capital = lista.capital;
    //     const region = lista.region;
    //     const population = lista.population;

        // info.innerHTML =`
        // <img src="${flags}" id="banderas" class="info" alt="bandera">
        // <h3 class="info"> ${name}</h3>
        //     <p class="info">La Capital es: ${capital}</p>
        //     <p class="info">Tiene una poblacion de: ${population} habitantes</p>
        //     <p class="info">Esta en el continente: ${region}</p>
        // ` 
        
    // });

    