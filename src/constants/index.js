export const options = {
  params: { language: "en-UK" },
  headers: {
    accept: "application/json",
    Authorization: import.meta.env.VITE_API_KEY,
  },
};

// you have too add this before pics
export const baseImgUrl = "https://image.tmdb.org/t/p/original";
