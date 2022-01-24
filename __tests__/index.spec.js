"use strict";

const { pactWith } = require("jest-pact")
const { Matchers } = require("@pact-foundation/pact")

const { handler } = require("../index")

pactWith({ consumer: "flight_search", provider: "acl" }, (provider) => {
  describe("Stations API stations exist", () => {
    const station = {
      stationCode: "LGW",
      fullName: "London Gatwick",
      countryCode: "GB",
      countryName: "United Kingdom",
    };

    const stationsSuccessResponse = {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
      body: Matchers.eachLike(station),
    };

    const stationsRequest = {
      uponReceiving: "a request for stations",
      withRequest: {
        method: "GET",
        path: "/stations",
        headers: {
          Accept: "application/json",
        },
      },
    };

    beforeEach(() => {
      const interaction = {
        state: "i have a list of stations",
        ...stationsRequest,
        willRespondWith: stationsSuccessResponse,
      };
      return provider.addInteraction(interaction);
    });

    // add expectations
    it("returns a successful body", async () => {
      const resp = await handler({
        url: provider.mockService.baseUrl,
      })
      expect(JSON.parse(resp.body)).toEqual([station])
    });
  });
  
  describe("Stations API stations don't exist", () => {
    const stationsSuccessResponse = {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
      body: [] ,
    };

    const stationsRequest = {
      uponReceiving: "a request for stations",
      withRequest: {
        method: "GET",
        path: "/stations",
        headers: {
          Accept: "application/json",
        },
      },
    };

    beforeEach(() => {
      const interaction = {
        state: "no stations exist",
        ...stationsRequest,
        willRespondWith: stationsSuccessResponse,
      };
      return provider.addInteraction(interaction);
    });

    // add expectations
    it("returns an empty array", async () => {
      const resp = await handler({
        url: provider.mockService.baseUrl,
      })
      expect(JSON.parse(resp.body)).toEqual([])
    });
  });
});