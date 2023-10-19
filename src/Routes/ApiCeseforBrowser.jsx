import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Api } from "../Components/Api";

export const ApiCeseforBrowser = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Api />}></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
};
