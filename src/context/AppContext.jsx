import React, { useState, createContext, useEffect } from "react";

export const AppContext = createContext();

function AppContextProvider(props) {
  const [data, setData] = useState([]);
  const [cardData, setCardData] = useState(
    JSON.parse(localStorage.getItem("cardData")) || []
  );
  const [favoritesData, setFavoritesData] = useState(
    JSON.parse(localStorage.getItem("favoritesData")) || []
  );
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:3000/product");
        console.log("response", response);

        const products = await response.json();
        console.log("products", products);
        const filteredData = products.filter(
          (item) => !cardData.some((cardItem) => cardItem.title === item.title)
        );
        setData(products);
      } catch (error) {}
    };
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
        setCardData,
        handleAddToCard,
        handleRemoveFromCard,
        favoritesData,
        setFavoritesData,
        handleAddToFavorites,
        handleRemoveFromFavorites,
      }}
    >
      {props.children}
    </AppContext.Provider>
  );
}

export default AppContextProvider;
