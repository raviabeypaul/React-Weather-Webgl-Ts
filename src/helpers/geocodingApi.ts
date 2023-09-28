import { CONFIG } from "config";
import { get } from "helpers/restCall";
export const geocodingApi = async address => {
  console.log("inside geocoding");

  const url =
    await CONFIG.GEOCODING_BASE_URL() +
    "/json?key=" +
    await CONFIG.GOOGLE_API_KEY() +
    "&address=" +
    encodeURIComponent(address);

  const headers = {
    "Content-Type": "application/json"
  };

  const getCoordinatesFromAddress = await get(url, headers);
  const results = getCoordinatesFromAddress.results;

  let coordinates;

  console.log(results);
  if (getCoordinatesFromAddress.status == "ZERO_RESULTS") {
    return null;
  }

  await results.forEach(function(result) {
    if (
      result.geometry.location_type == "ROOFTOP" ||
      result.geometry.location_type == "GEOMETRIC_CENTER" ||
      result.geometry.location_type == "RANGE_INTERPOLATED"
    ) {
      const latitude = result.geometry.location.lat.toString();
      const longitude = result.geometry.location.lng.toString();
      coordinates = { lat: latitude, lng: longitude };
    } else {
      if (coordinates == undefined)
        coordinates = null
    }
  });

  console.log("getCoordinatesFromAddress => ", coordinates);
  return coordinates;
};
