let globalAnime = [];


async function getAnimes() {
    try{
        const response = await fetch('https://api.jikan.moe/v4/anime'); //Consulta API
        const responseJson = await response.json(); //Volvemos todo en fortamo json
        const animes = responseJson.data;
        console.log(animes);
        
        animes.forEach(anime => {
            
            const animeId = anime.mal_id;
            const animeTitle = anime.title;
            const animeImageUrl = anime.images.jpg.image_url;
            const animeSynopsis = anime.synopsis;
            const animeStatus = anime.status;
            const animeEpisodes = anime.episodes;
            
            const animeDetailsContainer = document.createRange().createContextualFragment(/*html*/`
                <div class="container">
                    <div class="image-container">
                        <img src="${animeImageUrl}" alt="${animeTitle}">
                    </div>
                    <h2> Titulo ${animeTitle}</h2>
                    <p>${animeSynopsis}</p>
                    <h3>${animeEpisodes}</h3>
                    <p>${animeStatus}</p>
                </div>
            `);

            const main = document.querySelector("#principal");
            main.append(animeDetailsContainer);
        });

    } catch (error) {
        console.error("Error al consultar los anime: ", error);
        return null;
    }
}


getAnimes()


