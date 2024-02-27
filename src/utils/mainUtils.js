export const handleSort = (arr, direction) => {
  if (!Array.isArray(arr)) return [];
  //check if at least one object has title priperty
  if (arr.some((obj) => !obj.title)) return arr;
  const sortedData = arr.toSorted((a, b) => {
    if (!a.title || !b.title) return 0;
    let fa = a.title.toLowerCase(),
      fb = b.title.toLowerCase();
    if (fa < fb) return direction === "az" ? -1 : 1;
    if (fa > fb) return direction === "az" ? 1 : -1;
    return 0;
  });
  return sortedData;
};
