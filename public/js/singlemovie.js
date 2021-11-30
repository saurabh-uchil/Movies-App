$.getJSON(API_BASE_URL + `/movie/${movie_id}`, api_options)
    .then((movie) => {
        //  console.log(movie)
        movie.genres.forEach((genre) => {
            const moviegenre = `<span>${genre.name}</span>`
            $('#genres').append(moviegenre + " ")
            /*  $('#moviedescrpn #genres span').css({"background":"yellow"}) */
        })
        $('#title').text(movie.title)
        $('#tagline').text(movie.tagline)
        $('#runtime').text(movie.runtime + " mins")
        $('#release_date').text(movie.release_date)
        $('#overview').append(movie.overview)
        $('#movieimg').attr({
            src: IMAGE_URL + movie.poster_path
        })
    })
    .catch((err) => {
        console.log(err)
    })
// /movie/{movie_id}/videos
$.getJSON(API_BASE_URL + `/movie/${movie_id}/videos`, api_options)
    .then((video) => {
        console.log(video)
        let first = $(video.results).get(0);
        console.log(first)
        const video_url = "https://www.youtube.com/embed/"
        $("#trailer").attr({
            src: video_url + first.key
        })
    })
    .catch((err) => {
        console.log(err)
    })
