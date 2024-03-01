/* 
Nombre Mision: mission_name, 
Año lanzamiento: launch_year, 
Numero Vuelo: flight_number

video= ….inks.youtube_id;
name= ….rocket.rocket_name;
tipo= …....rocket.rocket_type;
estado= …....launch_success;
*/

const container = document.querySelector(".container")
const url = "https://api.spacexdata.com/v3/launches"
const modal = document.querySelector(".modal-body")
document.addEventListener("DOMContentLoaded", getData())

/* FETCH con Async Await */
async function getData(){ //Debe colocar ASYNC antes del function
    try {
        const response = await fetch(url);
        const datos = await response.json()
        dataMission(datos)
        modalMision(datos)
    } catch (error) {
        console.log(error)
    }
}


function dataMission(misiones){
    misiones.forEach(mision => {
        const img = mision.links.mission_patch
        const {mission_name, launch_year, flight_number} = mision
    
    const cardMision = document.createElement("div")

    cardMision.innerHTML = `
        <div class="card" style="width: 18rem;">
            <img src="${img}" class="card-img-top" alt="...">
                <div class="card-body">
                <h5 class="card-title">${mission_name}</h5>
                <p class="card-text">${launch_year}</p>
                <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal" id="${flight_number}">
                    Ver info-mision
                </button>
                </div>
        </div>
    `
    container.appendChild(cardMision)
    })
}



function modalMision(infoMision){
    cleanHtml()
    const botonModal = document.querySelectorAll(".btn-primary")
    
    //Detalles MODAL
    infoMision.forEach( info => {
        const video = info.links.youtube_id
        const rocket_name = info.rocket.rocket_name
        const rocket_type = info.rocket.rocket_type
        const {launch_success, flight_number} = info

        botonModal.forEach(boton =>{
            boton.addEventListener("click", (e) => {

                const idLauncher = e.target.getAttribute("id")

                if (idLauncher == flight_number){
                    cleanHtml()
                    const modalMision = document.createElement("table")
                    modalMision.classList.add("table")

                    modalMision.innerHTML = `
                    <thead>
                        <p style="text-align: center;">Space Explortion Tecnologies Corp</p>
                        <div class="video">
                            <iframe width="465" height="315" 
                            src="https://www.youtube.com/embed/${video}" title="YouTube video player" frameborder="0" 
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                            allowfullscreen></iframe>
                        </div>
                    </thead>
            
                    <tbody>
                        <tr><th>Cohete:</th><td>${rocket_name}</td></tr>

                        <tr><th>Tipo de cohete:</th><td>${rocket_type}</td></tr>

                        <tr><th>Exito lanzamiento:</th><td>${launch_success}</td></tr>
                    </tbody>
                    `
                    modal.appendChild(modalMision)
                }
            })
        })
    })
}

function cleanHtml(){
    modal.innerHTML = '';
}