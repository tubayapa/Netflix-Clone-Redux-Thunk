import { useSelector } from "react-redux";
import { baseImgUrl } from "../constants";
import Loader from "./Loader";

const Hero = () => {
  // reach data where the store
  const store = useSelector((store) => store.movieReducer);

  // create random number between 0-20
  const i = Math.floor(Math.random() * 20);

  // and reach the movie via this randomly created number
  const randomMovie = store.popularMovies[i];

  //   console.log(randomMovie);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 my-4 md:max-h-[300px]">
      {!randomMovie ? (
        <Loader />
      ) : (
        <>
          <div className="flex flex-col gap-6 items-center justify-center">
            <h1 className="text-3xl font-bold">{randomMovie.title}</h1>
            <p className="text-start">{randomMovie.overview}</p>
            <p>
              <span>IMDB: </span>
              <span>{randomMovie.vote_average.toFixed(1)}</span>
            </p>
            <div className="flex gap-5">
              <button className="p-2 rounded bg-red-600 hover:bg-red-700">
                Watch
              </button>
              <button className="p-2 rounded border hover:bg-red-600 ">
                Add to List
              </button>
            </div>
          </div>

          <div className="flex justify-center">
            <img
              className="my-4 img-fluid rounded hero-image md:max-h-[300px]"
              src={baseImgUrl.concat(randomMovie.backdrop_path)}
              alt={randomMovie.title}
            />
          </div>
        </>
      )}
    </div>
  );
};

export default Hero;
