import React from 'react';
import PropTypes from "prop-types";
import axios from "axios";
import Movie from "../components/Movie";
import "./Home.css";

class Home extends React.Component {
  state = {
    isLoading: true,
    movies: []
  };

  //axios는 data를 fetch하는데 사용됨
  //axios가 데이터를 가져오는데 시간이 좀 걸리므로
  //js에게 axios가 데이터를 다 가져올때까지 기다리라고 명령하는게 await
  //await를 쓰기 위해서는 async를 해줘야함
  getMovies = async () => {
    const {
      data: {
        data: { movies }
      }
    } = await axios.get("https://yts.mx/api/v2/list_movies.json?sort_by=rating");

    //= this.setState({ movies:movies, isLoading: false })
    //앞의 movies는 state의 movies
    //뒤의 movies는 const movies 객체
    //state의 movies = const movies라고 선언해 준 것
    //그러나 js는 똑똑하기에 아래처럼 써도 이해함
    this.setState({ movies, isLoading: false });
  }

  //컴포넌트가 mount된 직후 실행되는 함수
  //render function 실행 후 실행됨
  componentDidMount() {
    this.getMovies();
  }

  render() {
    const { isLoading, movies } = this.state;

    return (
      <section className="container">
        {isLoading ? ( 
          <div className="loader">
            <span className="loader__text">Loading...</span>
          </div>
        ) : (
          <div className="movies">
            {movies.map(movie => (
              <Movie 
                key={movie.id}
                id={movie.id} 
                year={movie.year} 
                title={movie.title} 
                summary={movie.summary}
                poster={movie.medium_cover_image}
                genres={movie.genres}
              />
            ))}
          </div>
        )}
      </section>
    );
  }
}

export default Home;
