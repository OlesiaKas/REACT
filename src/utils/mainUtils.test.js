//import { handleSort } from "./mainUtils";

//it("should sort array of object", () => {
//  const arr = [{ title: "b" }, { title: "a" }, { title: "c" }];
//  const result = handleSort(arr, "az");
//  expect(result).toEqual([{ title: "a" }, { title: "b" }, { title: "c" }]);
//});

//it("should sort array of object in reverse", () => {
//  const arr = [{ title: "b" }, { title: "a" }, { title: "c" }];
//  const result = handleSort(arr);
//  expect(result).toEqual([{ title: "a" }, { title: "b" }, { title: "c" }]);
//});
//it("should return empty array if not array is provided", () => {
//  expect(handleSort()).toEqual([]);
//  expect(handleSort("string")).toEqual([]);
//  expect(handleSort(123)).toEqual([]);
//  expect(handleSort({})).toEqual([]);
//  expect(handleSort(null)).toEqual([]);
//  expect(handleSort(undefined)).toEqual([]);
//});

//test if all objects have title property

//it("should return same array if no title property is found", () => {
//  const arr = [{ name: "b" }, { name: "a" }, { name: "c" }];
//  const result = handleSort(arr);
//  expect(result).toEqual([{ name: "b" }, { name: "a" }, { name: "c" }]);
//});
