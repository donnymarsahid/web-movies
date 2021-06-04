// Search
// ini menggunakan jquery ajax
// $('.search-button').on('click', function () {
//   $.ajax({
//     url: 'http://www.omdbapi.com/?apikey=85c7c1f2&s=' + $('.input-keyword').val(),
//     success: (results) => {
//       const movies = results.Search;
//       let cards = '';
//       movies.forEach((m) => {
//         cards += showCards(m);
//       });
//       $('.movie-container').html(cards);

//       // Ketika tombol Detail diklik
//       $('.modal-detail-button').on('click', function () {
//         $.ajax({
//           url: 'http://www.omdbapi.com/?apikey=85c7c1f2&i=' + $(this).data('imdbid'),
//           success: (m) => {
//             const movieDetail = showDetails(m);
//             $('.modal-body').html(movieDetail);
//           },
//           error: (e) => {
//             console.log(e.responseText);
//           },
//         });
//       });
//     },
//     error: (e) => {
//       console.log(e.responseText);
//     },
//   });
// });

// Fetch
const searchButton = document.querySelector('.search-button');
searchButton.addEventListener('click', function () {
  const inputKeyword = document.querySelector('.input-keyword');
  fetch('http://www.omdbapi.com/?apikey=85c7c1f2&s=' + inputKeyword.value)
    .then((res) => res.json())
    .then((res) => {
      const movies = res.Search;
      let cards = '';
      movies.forEach((m) => (cards += showCards(m)));
      const movieContainer = document.querySelector('.movie-container');
      movieContainer.innerHTML = cards;
      // Ketika tombol diklik
      const modalDetailButton = document.querySelectorAll('.modal-detail-button');
      modalDetailButton.forEach((btn) => {
        btn.addEventListener('click', function () {
          const imdbid = this.dataset.imdbid;
          fetch('http://www.omdbapi.com/?apikey=85c7c1f2&i=' + imdbid)
            .then((res) => res.json())
            .then((m) => {
              const movieDetail = showDetails(m);
              const modalBody = document.querySelector('.modal-body');
              modalBody.innerHTML = movieDetail;
            });
        });
      });
    });
});

// Function
function showCards(m) {
  return `<div class="col-md-4 my-5">
            <div class="card" style="width: 18rem">
                <img src="${m.Poster}" class="card-img-top" />
                    <div class="card-body">
                    <h5 class="card-title">${m.Title}</h5>
                    <p class="text-muted">${m.Year}</p>
                <a href="#" class="btn btn-primary modal-detail-button" data-bs-toggle="modal" 
                 data-bs-target="#movieDetailModal" data-imdbid="${m.imdbID}" >Show Details</a>
                 </div>
            </div>
        </div>`;
}

function showDetails(m) {
  return `<div class="container-fluid">
                <div class="row">
                <div class="col-md-3">
                    <img src="${m.Poster}" class="img-fluid" />
                </div>
                <div class="col-md">
                    <ul class="list-group">
                    <li class="list-group-item"><h4>${m.Title} ${m.Year}</h4></li>
                    <li class="list-group-item"><strong>Director : </strong>${m.Director}</li>
                    <li class="list-group-item"><strong>Actors : </strong>${m.Actors}</li>
                    <li class="list-group-item"><strong>Writer : </strong>${m.Writer}</li>
                    <li class="list-group-item"><strong>Plot : </strong>${m.Plot}</li>
                    </ul>
                </div>
                </div>
            </div>`;
}
