import { useParams } from "react-router-dom";
import { baseImgUrl, options } from "./../constants/index";
import axios from "axios";
import { useState, useEffect } from "react";
import Loader from "./../components/Loader";
import DetailDisplay from "../components/DetailDisplay";
import millify from "millify";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import PlayerCard from "../components/PlayerCard";

const DetailPage = () => {
  const [movie, setMovie] = useState(null);

  // url'den filmin id'sini al
  const { id } = useParams();

  // api'dan filmin bilgilerini al
  useEffect(() => {
    axios
      .get(
        `https://api.themoviedb.org/3/movie/${id}?append_to_response=videos,credits,reviews`,
        options
      )
      .then((res) => setMovie(res.data));
  }, []);

  console.log(movie);
  return (
    <div>
      {!movie && <Loader />}

      {movie && (
        <div>
          {/* top */}
          <div className="relative h-[30vh]">
            <img
              className="object-cover w-full h-full"
              src={baseImgUrl + movie.backdrop_path}
            />
            <div className="absolute bg-black inset-0 bg-opacity-50 grid place-items-center">
              <span className="text-3xl font-semibold">{movie.title}</span>
            </div>
          </div>

          {/* middle */}
          <div className="grid grid-cols-1 md:grid-cols-2 my-5">
            {/* left */}
            <div>
              <DetailDisplay title="Categories" data={movie.genres} />
              <DetailDisplay title="Languages" data={movie.spoken_languages} />
              <DetailDisplay
                title="Companies"
                data={movie.production_companies}
              />
              <DetailDisplay
                title="Countries"
                data={movie.production_countries}
              />
            </div>

            {/* right */}
            <div>
              <p>{movie.overview}</p>

              <p className="my-4">
                <span>Budget:</span>
                <span className="text-green-500 ms-2">
                  {movie.budget === 0 ? "Unknown" : millify(movie.budget) + "£"}
                </span>
              </p>

              <p className="my-4">
                <span>Revenue:</span>
                <span className="text-green-500 ms-2">
                  {movie.revenue === 0
                    ? "Unknown"
                    : millify(movie.revenue) + "£"}
                </span>
              </p>
            </div>
          </div>

          {/* bottom */}
          <div>
            <Splide
              options={{
                autoWidth: true,
                gap: "10px",
                rewind: true,
                lazyLoad: true,
              }}
            >
              {movie.credits.cast.map((player) => (
                <SplideSlide>
                  <PlayerCard key={player.credit_id} player={player} />
                </SplideSlide>
              ))}
            </Splide>
          </div>
        </div>
      )}

      {/* <DetailDisplay title="Reviews" data={movie.reviews.page[1]} /> */}
    </div>
  );
};

export default DetailPage;
