import React, { useEffect, useState } from "react";
import "./styles/Books.css";
import axios from "axios";

function BookScreen(props) {
  const [searchVal, setSearchVal] = useState();

  useEffect(() => {
    console.log(props);
    if (localStorage.getItem("loggedIn") !== "true") {
      alert("Not logged in!");
      props.history.push("/");
    }
  });

  return (
    <div className="container">
      <h2>Input Book Here:</h2>
      <form>
        <div className="form-group">
          <input
            type="text"
            className="bookInput"
            placeholder="Enter book name"
            autoComplete="off"
            onChange={(e) => {
              setSearchVal(e.target.value);
            }}
          />
        </div>

        <button
          type="submit"
          onClick={() => {
            axios
              .post(
                "http://localhost:3000/books/search",
                {
                  query: searchVal,
                },
                {
                  headers: {
                    "Access-Control-Allow-Origin": "*",
                    "Access-Control-Allow-Headers": "*",
                  },
                }
              )
              .then((res) => {
                console.log(
                  "ddd",
                  res.data.results.map((obj) => obj)
                );
              })
              .catch((err) => {
                console.log(err);
                alert(
                  "Something went wrong. Are you connected to the internet?"
                );
              });
          }}
          className="btn btn-danger"
        >
          Search
        </button>
        <button
          type="submit"
          className="btn btn-danger"
          onClick={() => {
            localStorage.setItem("loggedIn", false);
            props.history.push("/");
          }}
        >
          Logout
        </button>
      </form>
    </div>
  );
}

export default BookScreen;
