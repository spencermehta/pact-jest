"use strict";

import { pactWith } from "jest-pact"
import { InteractionObject, Matchers } from "@pact-foundation/pact"

import { APIGatewayProxyEvent } from 'aws-lambda'
import { handler } from "../index"

pactWith({ consumer: "flight_search", provider: "acl" }, (provider) => {
  describe("Stations API stations exist", () => {
    // add expectations
    it("returns a successful body", async () => {
      const interaction: InteractionObject = {
        state: "i have a list of stations",
        uponReceiving: "request for stations",
        withRequest: {
          method: "GET",
          path: "/stations",
          headers: {
            Accept: "application/json",
          }
        },
        willRespondWith: {
          status: 200,
          headers: {
            "Content-Type": "application/json",
          },
          body: Matchers.eachLike({
            stationCode: "LGW",
            fullName: "London Gatwick"
          })
        }
      };
      await provider.addInteraction(interaction);

      const event: APIGatewayProxyEvent = {
        queryStringParameters: {
          a: provider.mockService.baseUrl
        }
      } as any

      const resp = await handler(event)
      console.log(resp)
      expect(JSON.parse(resp.body)).toEqual([{stationCode: "LGW", fullName: "London Gatwick"}])
    });
  });
});
