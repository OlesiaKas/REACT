import React, { useState, createContext } from "react";
import { mockData } from "../mockData";
export const AppContext = createContext();

function AppContextProvider(props) {
  const [data, setData] = useState(mockData);
  const [cardData, setCardData] = useState([]);
  const [favoritesData, setFavoritesData] = useState([]);

  const handleAddToCard = (item) => {
    setCardData([...cardData, item]);
    const filteredData = data.filter(
      (dataItem) => dataItem.title !== item.title
    );
    setData(filteredData);
  };
  const handleRemoveFromCard = (item) => {
    setData([item, ...data]);
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
