$.getJSON(API_BASE_URL+`/movie/${movie_id}`,api_options)
.then((movie)=>{
    console.log(movie)
    movie.genres.forEach((genre)=>{
        const moviegenre =  `<span style="background:linear-gradient(147deg, #000000 0%, #04619f 95%); font-size:20px; color: whitesmoke; margin:5px; border: 2px solid yellow; border-radius:10px;">${genre.name}</span>`
        $('#genres').append(" "+moviegenre+" ")
       /*  $('#moviedescrpn #genres span').css({"background":"yellow"}) */
    })
    $('#title').text(movie.title)
    $('#tagline').text(movie.tagline)
    $('#runtime').text(movie.runtime+" mins")
    $('#release_date').text(movie.release_date)
   
    $('#overview').append(movie.overview)
    $('#movieimg').attr({
        src: IMAGE_URL + movie.poster_path
    })    
})
.catch((err)=>{
    console.log(err)
})
