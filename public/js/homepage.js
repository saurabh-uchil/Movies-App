$.getJSON(API_BASE_URL+'/discover/movie',api_options)
.then((data)=>{
    const {results} = data
    results.forEach((movie)=>{
        /* console.log(movie) */
        const html = `
        <div style="float:left;color:whitesmoke;margin:10px; border: 2px solid black; width:350px; background: linear-gradient(147deg, #000000 0%, #04619f 95%);">
        <img src="${IMAGE_URL + movie.poster_path}" style="margin:15px; height:450px; width:320px;">
        <h4 style="margin:15px; font-size:16px;">${movie.title}</h4>
        <form method="get" action="/movies/${movie.id}">
        <button style="height:40px; width:200px; background-color: darkblue; background-image: linear-gradient(darkblue,blue); border:2px solid yellow; color:whitesmoke;margin:15px; border-radius: 5px;">View Details</button>
        </form>
        </div>
        `
        $('.movies').append(html)
        $('.movies').css("margin-left","100px")
    })
})
.catch((err)=>{
    console.log(err)
})



$('#searchbtn').click(function(e) {
    e.preventDefault()
    /* alert( $('#searchtxtbox').val()); */
    /* $('#searchtxtbox').val(" ")  */
    /* https://api.themoviedb.org/3/search/movie?query=Avengers&api_key=b6467f0e003a77cb8fd5b5b955cc1645&page=1
    alert(API_BASE_URL+'/search/movie?query='+$('#searchtxtbox').val()+"&"+api_options.api_key) */
    $.getJSON(API_BASE_URL+'/search/movie?query='+$('#searchtxtbox').val()+"&",api_options)
    .then((data)=>{
        const {results} = data
        if(results.length==0){
            $('.movies').empty()
            const html = `<h2 style="color:white; text-align:center;">No movies found</h2>`
            $('.movies').append(html)

        }else{
        console.log(data)
        $('.movies').empty()
        results.forEach((movie)=>{
            
            if(movie.poster_path){
                const html = `
                <div style="float:left;color:whitesmoke;margin:10px; border: 2px solid black; width:350px; min-width:350px; min-height:610px; background: linear-gradient(147deg, #000000 0%, #04619f 95%);">
                <img src="${IMAGE_URL + movie.poster_path}" style="margin:15px; height:450px; width:320px;" alt="${movie.original_title}">
                <h4 style="margin:15px; font-size:16px;">${movie.original_title}</h4>
                <form method="get" action="/movies/${movie.id}">
                <button style="height:40px; width:200px; background-color: darkblue; background-image: linear-gradient(darkblue,blue); border:2px solid yellow; color:whitesmoke;margin:15px; border-radius: 5px;">View Details</button>
                </form>
                </div>
                `
                $('.movies').append(html)
                $('.movies').css("margin-left","100px")

            }else{
                const html = `
                <div style="float:left;color:whitesmoke;margin:10px; border: 2px solid black; width:350px; min-width:350px; min-height:610px; background: linear-gradient(147deg, #000000 0%, #04619f 95%);">
                <img src="" style="margin:15px; height:450px; width:320px;" alt="Image Not Available">
                <h4 style="margin:15px; font-size:16px;">${movie.original_title}</h4>
                <form method="get" action="/movies/${movie.id}">
                <button style="height:40px; width:200px; background-color: darkblue; background-image: linear-gradient(darkblue,blue); border:2px solid yellow; color:whitesmoke;margin:15px; border-radius: 5px;">View Details</button>
                </form>
                </div>
                `
                $('.movies').append(html)
                $('.movies').css("margin-left","100px")
            }
           
        
        })}
    })
    .catch((err)=>{
        console.log(err)
    })
    
  });
