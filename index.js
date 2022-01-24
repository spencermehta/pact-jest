"use strict"

const axios = require("axios")

exports.getStations = endpoint => {
  const url = endpoint.url

  return axios
    .request({
      method: "GET",
      baseURL: url,
      url: "/stations",
      headers: { Accept: "application/json" },
    })
    .then(response => response.data)
}
