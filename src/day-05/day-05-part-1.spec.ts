import { Day05Part1, Mapping, MappingList, MapEntry } from "./day-05-part-1";
import fs from "fs";

describe("Day 5 part 1", function () {
  const seedToSoilLines = ["50 98 2", "52 50 48"];
  const soilToFertilizerLines = ["0 15 37", "37 52 2", "39 0 15"];
  const fertilizerWaterLines = ["49 53 8", "0 11 42", "42 0 7", "57 7 4"];
  const waterLight = ["88 18 7", "18 25 70"];
  const lightTemperatureLines = ["45 77 23", "81 45 19", "68 64 13"];
  const temperatureHumidityLines = ["0 69 1", "1 0 69"];
  const humidityLocationLines = ["60 56 37", "56 93 4"];

  test.each`
    src                         | dst                         | expected
    ${new MapEntry(10, 60, 10)} | ${new MapEntry(65, 10, 5)}  | ${new MapEntry(15, 10, 5)}
    ${new MapEntry(10, 60, 5)}  | ${new MapEntry(60, 10, 10)} | ${new MapEntry(10, 10, 5)}
    ${new MapEntry(10, 60, 5)}  | ${new MapEntry(0, 10, 5)}   | ${null}
    ${new MapEntry(50, 20, 5)}  | ${new MapEntry(20, 50, 5)}  | ${new MapEntry(50, 50, 5)}
  `("Get merged intersection $#", ({ src, dst, expected }) =>
    expect(Mapping.getMergedIntersection(src, dst)).toStrictEqual(expected)
  );

  test.each`
    src                         | merge                       | expected
    ${new MapEntry(60, 20, 20)} | ${new MapEntry(50, 10, 40)} | ${[]}
    ${new MapEntry(60, 20, 20)} | ${new MapEntry(20, 0, 20)}  | ${[new MapEntry(60, 20, 20)]}
    ${new MapEntry(60, 20, 20)} | ${new MapEntry(60, 20, 10)} | ${[new MapEntry(70, 30, 10)]}
    ${new MapEntry(60, 20, 20)} | ${new MapEntry(70, 20, 10)} | ${[new MapEntry(60, 20, 10)]}
    ${new MapEntry(60, 20, 20)} | ${new MapEntry(65, 25, 10)} | ${[new MapEntry(60, 20, 5), new MapEntry(75, 35, 5)]}
  `("Get remove intersection on source $#", ({ src, merge, expected }) =>
    expect(Mapping.removeIntesection(src, merge, "src")).toStrictEqual(expected)
  );

  test.each`
    dst                         | merge                       | expected
    ${new MapEntry(20, 60, 20)} | ${new MapEntry(10, 50, 40)} | ${[]}
    ${new MapEntry(20, 60, 20)} | ${new MapEntry(0, 20, 20)}  | ${[new MapEntry(20, 60, 20)]}
    ${new MapEntry(20, 60, 20)} | ${new MapEntry(20, 60, 10)} | ${[new MapEntry(30, 70, 10)]}
    ${new MapEntry(20, 60, 20)} | ${new MapEntry(20, 70, 10)} | ${[new MapEntry(20, 60, 10)]}
    ${new MapEntry(20, 60, 20)} | ${new MapEntry(25, 65, 10)} | ${[new MapEntry(20, 60, 5), new MapEntry(35, 75, 5)]}
  `("Get remove intersection on destination $#", ({ dst, merge, expected }) =>
    expect(Mapping.removeIntesection(dst, merge, "dst")).toStrictEqual(expected)
  );

  it("Get corresponding destination", function () {
    const mapping = new Mapping(seedToSoilLines);
    expect(mapping.getDestination(79)).toEqual(81);
    expect(mapping.getDestination(14)).toEqual(14);
    expect(mapping.getDestination(55)).toEqual(57);
    expect(mapping.getDestination(13)).toEqual(13);
  });

  it("Get seeds location", function () {
    const mappingList = new MappingList();
    mappingList.push(
      new Mapping(seedToSoilLines),
      new Mapping(soilToFertilizerLines),
      new Mapping(fertilizerWaterLines),
      new Mapping(waterLight),
      new Mapping(lightTemperatureLines),
      new Mapping(temperatureHumidityLines),
      new Mapping(humidityLocationLines)
    );
    expect(mappingList.getDestination(79)).toBe(82);
    expect(mappingList.getDestination(14)).toBe(43);
    expect(mappingList.getDestination(55)).toBe(86);
    expect(mappingList.getDestination(13)).toBe(35);
  });

  it("Solve day 5 part 2", function () {
    const content = fs.readFileSync(`${__dirname}/day-05-input.txt`);
    expect(Day05Part1.solve(content.toString())).toBe(157211394);
  });
});
