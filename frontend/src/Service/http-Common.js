import axios from "axios";

export const thumbnailbaseurl = "http://localhost:8000/static"

export default axios.create({
  baseURL: "http://localhost:8000/api",

  headers: {
    "Content-type": "application/json",
  },
});