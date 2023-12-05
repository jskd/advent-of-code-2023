import { Day05Part1, MapEntry, Mapping, MappingList } from "./day-05-part-1";
import fs from "fs";

describe("Day 5 part 1", function () {
  const seedToSoilLines = ["50 98 2", "52 50 48"];
  const soilToFertilizerLines = ["0 15 37", "37 52 2", "39 0 15"];
  const fertilizerWaterLines = ["49 53 8", "0 11 42", "42 0 7", "57 7 4"];
  const waterLight = ["88 18 7", "18 25 70"];
  const lightTemperatureLines = ["45 77 23", "81 45 19", "68 64 13"];
  const temperatureHumidityLines = ["0 69 1", "1 0 69"];
  const humidityLocationLines = ["60 56 37", "56 93 4"];

  it("Parse map entry", function () {
    expect(new MapEntry(seedToSoilLines[0])).toEqual({
      dst: 50,
      src: 98,
      len: 2,
    });
    expect(new MapEntry(seedToSoilLines[1])).toEqual({
      dst: 52,
      src: 50,
      len: 48,
    });
  });

  it("Parse full mapping", function () {
    expect(new Mapping(seedToSoilLines)).toEqual({
      maps: [
        { src: 98, dst: 50, len: 2 },
        { src: 50, dst: 52, len: 48 },
      ],
    });
    expect(new Mapping(soilToFertilizerLines)).toEqual({
      maps: [
        { dst: 0, len: 37, src: 15 },
        { dst: 37, len: 2, src: 52 },
        { dst: 39, len: 15, src: 0 },
      ],
    });
  });

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
