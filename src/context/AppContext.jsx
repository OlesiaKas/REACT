import React, { useState, createContext, useEffect } from "react";
import { cfg } from "../cfg/cfg";
export const AppContext = createContext();

function AppContextProvider(props) {
  const [showLogin, setShowLogin] = useState(false);
  const [loadingProducts, setLoadingProducts] = useState(false);
  const [data, setData] = useState([]);
  const [cardData, setCardData] = useState(
    JSON.parse(localStorage.getItem("cardData")) || []
  );
  const [favoritesData, setFavoritesData] = useState(
    JSON.parse(localStorage.getItem("favoritesData")) || []
  );

  const fetchData = async () => {
    try {
      setLoadingProducts(true);
      const response = await fetch(`${cfg.API.HOST}/product`);
      console.log("response", response);

      const products = await response.json();
      console.log("products", products);
      const filteredData = products.filter(
        (item) => !cardData.some((cardItem) => cardItem.title === item.title)
      );
      setData(filteredData);
    } catch (error) {
      console.log(error.message);
    } finally {
      setLoadingProducts(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    localStorage.setItem("cardData", JSON.stringify(cardData));
  }, [cardData]);

  useEffect(() => {
    localStorage.setItem("favoritesData", JSON.stringify(favoritesData));
  }, [favoritesData]);
  const handleAddToCard = (item) => {
    setCardData([...cardData, item]);
    const filteredData = data.filter(
      (dataItem) => dataItem.title !== item.title
    );
    setData(filteredData);
    //localStorage.setItem("data", JSON.stringify(filteredData));
  };
  const handleRemoveFromCard = (item) => {
    setData([item, ...data]);
    //localStorage.setItem("data", JSON.stringify([item, ...data]));
    const filteredCardData = cardData.filter(
      (dataItem) => dataItem.title !== item.title
    );
    setCardData(filteredCardData);
  };
  const handleAddToFavorites = (item) => {
    setFavoritesData([...favoritesData, item]);
  };
  const handleRemoveFromFavorites = (item) => {
    const filteredFavoritesData = favoritesData.filter(
      (dataItem) => dataItem.title !== item.title
    );
    setFavoritesData(filteredFavoritesData);
  };
  return (
    <AppContext.Provider
      value={{
        data,
        setData,
        cardData,
        showLogin,
        setShowLogin,
        fetchData,
        setCardData,
        handleAddToCard,
        handleRemoveFromCard,
        favoritesData,
        setFavoritesData,
        loadingProducts,
        handleAddToFavorites,
        handleRemoveFromFavorites,
      }}
    >
      {props.children}
    </AppContext.Provider>
  );
}

export default AppContextProvider;
