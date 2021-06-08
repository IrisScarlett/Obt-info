const baseURL ='https://api.github.com/users';
//llamo a la api
const request = async (url) =>{
    const results = await fetch(url);
    const response = await results.json();
    return response;
}

//Llamo al usuario
const getUser = async (user) => {
    const url = `${baseURL}/${user}`;
    return request(url);
}

//Llamo a la cantidad de repositorios del usuario
const getRepo = async (user, pagina, cantidad_repos) => {
    const url = `${baseURL}/${user}/repos?page=${pagina}&per_page=${cantidad_repos}`;
    return request(url);
}

//event click en el botón enviar para "agarrar" los valores agregados.
document.getElementById("btnForm").addEventListener("click", () =>{
    const nombre = document.getElementById("nombre").value;
    const pagina = document.getElementById("pagina").value;
    const repoPagina = document.getElementById("repoPagina").value;
    const resultado = document.getElementById("resultados")

    //Promesa para llamar a las dos funciones, conectarse con la api y traer la informaicón requerida.
    Promise.all([getUser(nombre), getRepo(nombre, pagina, repoPagina)])
    .then(resp => {
      resultado.innerHTML = resp;
    })
    .catch (alert => {
        alert('El usuario no existe')})
})
