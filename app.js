// async function getAnimes() {
//     try{
//         const response = await fetch('https://api.jikan.moe/v4/anime'); //Consulta API
//         const responseJson = await response.json(); //Volvemos todo en fortamo json
//         const animes = responseJson.data;
//         console.log(animes);
            
//         animes.forEach(anime => { 
//             const animeId = anime.mal_id;
//             const animeTitle = anime.title;
//             const animeImageUrl = anime.images.jpg.image_url;
//             const animeSynopsis = anime.synopsis;
//             const animeStatus = anime.status;
//             const animeEpisodes = anime.episodes;
            
//             const animeDetailsContainer = document.createRange().createContextualFragment(/*html*/`
//                 <div class="container">
//                     <div class="image-container">
//                         <img src="${animeImageUrl}" alt="${animeTitle}">
//                     </div>
//                     <h2> Titulo ${animeTitle}</h2>
//                     <p> sinopsis <br>${animeSynopsis}</p>
//                     <h3>${animeEpisodes}</h3>
//                     <p>${animeStatus}</p>
//                 </div>
//             `);

//             const main = document.querySelector("#principal");
//             main.append(animeDetailsContainer);
//         });
//     } catch (error) {
//         console.error("Error al consultar los anime: ", error);
//         return null;
//     }
// }


// getAnimes()


const cleanView = () => {
    main.innerHTML="";
}

async function getAnimes() {
    try{
        const globalAnimePromises = [];
        for (let i = 1; i <= 150; i++) {
            const url = `https://api.jikan.moe/v4/anime/${i}`;
            const response = await fetch(url)
                .then(res => {
                    if (!res.ok){
                        throw new Error('Anime no encontrado');
                    }
                    return res.json();
                })
                .catch (error => {
                    console.error(`El anime con el id ${i}: ${error.message}`)
                    return null;
                });
            globalAnimePromises.push(response);
        }

        const animesResponse = await Promise.all(globalAnimePromises);

        animesResponse.forEach(responseJson => {
            if (responseJson) {
                const anime = responseJson.data;
                
                console.log(anime);
                
                const animeTitle = anime.title;
                const animeImageUrl = anime.images.jpg.image_url;
                const animeSynopsis = anime.synopsis;
                const animeStatus = anime.status;
                const animeEpisodes = anime.episodes;
                
                const animeDetailsContainer = document.createRange().createContextualFragment(/*html*/`
                <div class="container">
                    <h1> Titulo: ${animeTitle}</h1>
                    <div class="image-container">
                        <img src="${animeImageUrl}" alt="${animeTitle}">
                    </div>
                    <h2> Sinopsis:</h2>
                    <p>${animeSynopsis}</p>
                    <h3>No. de episodeos: ${animeEpisodes}</h3>
                    <h4>Estado del anime: ${animeStatus}</h4>
                </div>
                `);
                const main = document.querySelector("#principal");
                main.append(animeDetailsContainer);
            }
        });
    } catch (error) {
        console.error("Error al consultar los anime: ", error);
        return null;
    }
}


getAnimes()




// const searchInput = document.querySelector("#search-input");

// searchInput.addEventListener("keyup",() => {
//     const inputText = searchInput.value;
//     let anime2 = searchByName(inputText);
//     cleanView();

// });


// function searchAnime(){
//     const getData=async()=> {
//         const res = await fetch(`https://api.jikan.moe/v4/anime?q=${search}&limit=20`)
//         const resData = await res.json()
//         console.log(resData);
//     }
// }
