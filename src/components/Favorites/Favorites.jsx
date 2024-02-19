import React, { useContext } from "react";
import { handleSort } from "../../utils/mainUtils";
//components
import Card from "../Card/Card";
import SortButtons from "../SortButtons/SortButtons";
import { AppContext } from "../../context/AppContext";

function Favorites() {
  const { favoritesData, setFavoritesData } = useContext(AppContext);

  const handleSortData = (direction) => {
    const sortedData = handleSort(favoritesData, direction);
    setFavoritesData(sortedData);
  };
  return (
    <main className="main-container">
      <SortButtons handleSortData={handleSortData} />

      {favoritesData.map((item) => (
        <Card
          key={item.title}
          title={item.title}
          description={item.description}
          handleCardButton={() => {}}
        />
      ))}
    </main>
  );
}

export default Favorites;
