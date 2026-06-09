import { request } from "node:http";
import { test, expect } from "../../fixtures/hooks-fixture";
import apiPathData from "../../data/api-data/api-path-data.json";
import restfulApiData from "../../data/api-data/restful-booker-api-module.json";
// test("API Testing", async ({ request }) => {
//   const bookingIds = await request.get("/booking");
//   console.log(await bookingIds.json());
// });

// test("API Testing with id", async ({ request }, testInfo) => {
//   /*   const url = `${testInfo.project.use.baseURL}booking/1`;

//   console.log("Final URL:", url); */
//   const bookingDetails = await request.get("/booking/1");
//   console.log(await bookingDetails.json());
// });

test(
  "id=8 [Restful-Broker > Booking] verify that the user is able to fetch all the booking IDs using GET API and receive valid response",
  {
    tag: ["@API", "@UAT"],
    annotation: {
      type: "Test case Link",
      description: "https://restful-booker.herokuapp.com/booking",
    },
  },

  async ({ request }) => {
    const bookingIds = await request.get(apiPathData.booking_path);
    const bookingIdJsonData = await bookingIds.json();
    console.log(bookingIdJsonData);
    // expect(bookingIds.status()).toBe(200);
    //expect(bookingIds.statusText()).toBe("OK");
    expect(bookingIds.ok()).toBeTruthy();
    expect(bookingIds.headers()["content-type"]).toBe(
      restfulApiData["content-type"],
    );
    expect(bookingIds).not.toBeNull();
  },
);

test(
  "Id-9 -[Restful-Booker] Verify that the user is able to fetch booking details for a booking id using GET API and receives valid response",
  {
    tag: ["@API", "@UAT"],
    annotation: {
      type: "test case link",
      description: "https://www.google.com",
    },
  },
  async ({ request }) => {
    const response = await request.get(
      `${apiPathData.booking_path}/${apiPathData.booking_path_id}`,
    );
    const responseData = await response.json();
    console.log(responseData);
    expect(response.status()).toBe(200);
    expect(response.statusText()).toBe("OK");
    expect(response).not.toBeNull();
    /*  expect(responseData).toMatchObject({
      firstname: "Test",
      lastname: "Dude",
      totalprice: 500,
      depositpaid: true,
      bookingdates: { checkin: "2026-01-07", checkout: "2026-01-21" },
      additionalneeds: "Brekky",
    }); */
    expect(responseData.firstname).not.toBeNull();
  },
);

test(
  "Id-10 - [Restful-Broker >Booking] Verify that the user is able to Create new Booking using post API and receives valid response",
  {
    tag: ["@API", "@UAT"],
    annotation: {
      type: "API LINK",
      description: "https://www,google.com",
    },
  },
  async ({ request }) => {
    const respData = await request.post(apiPathData.booking_path, {
      data: restfulApiData.create_booking,
    });
    const jsonResp = await respData.json();
    expect(respData.status()).toBe(200);
    expect(jsonResp.booking).toMatchObject(restfulApiData.create_booking);
    console.log(jsonResp);
  },
);

test(
  "Id-11 - [Restful-Booker > Booking] verify that the user is able to update existing booking using PUT API and receive valid response",
  {
    tag: ["@API", "@UAT"],
    annotation: {
      type: "API LINK",
      description: "https://www,google.com",
    },
  },
  async ({ request }) => {
    const respData = await request.put(
      `${apiPathData.booking_path}/${apiPathData.booking_path_id}`,
      {
        headers: {
          Authorization: "Basic YWRtaW46cGFzc3dvcmQxMjM=",
        },
        data: restfulApiData.update_data,
      },
    );
    const jsonData = await respData.json();
    console.log(jsonData);
    expect(jsonData).toMatchObject({
      firstname: "NAWAZ",
      lastname: "SKB",
      totalprice: 111,
      depositpaid: true,
      bookingdates: { checkin: "2018-01-01", checkout: "2019-01-01" },
      additionalneeds: "Breakfast",
    });
    expect(respData.status()).toBe(200);

    //console.log(await respData.json());
  },
);

test(
  "Id-12 - [Restful-Booker > Booking] USING TOKEN verify that the user is able to update existing booking using PUT API and receive valid response",
  {
    tag: ["@API", "@UAT"],
    annotation: {
      type: "API LINK",
      description: "https://www,google.com",
    },
  },
  async ({ request, commonUtilsApiFixture }) => {
    const token = await commonUtilsApiFixture.createToken(request);
    const respData = await request.put(
      `${apiPathData.booking_path}/${apiPathData.booking_path_id}`,
      {
        headers: {
          Cookie: `token=${token}`,
        },
        data: restfulApiData.update_data,
      },
    );
    const jsonData = await respData.json();
    console.log(jsonData);
    expect(jsonData).toMatchObject({
      firstname: "NAWAZ",
      lastname: "SKB",
      totalprice: 111,
      depositpaid: true,
      bookingdates: { checkin: "2018-01-01", checkout: "2019-01-01" },
      additionalneeds: "Breakfast",
    });
    expect(respData.status()).toBe(200);

    //console.log(await respData.json());
  },
);

test(
  "Id-13 -[Restful-Booker > Booking] verify that the user is able to partially update existing booking using PATCH API and receive valid response",
  {
    tag: ["@API", "@UAT"],
    annotation: {
      type: "API LINK",
      description: "https://www,google.com",
    },
  },
  async ({ request, commonUtilsApiFixture }) => {
    const token = await commonUtilsApiFixture.createToken(request);
    const respData = await request.patch(
      `${apiPathData.booking_path}/${apiPathData.booking_path_id}`,
      {
        headers: {
          Cookie: `token=${token}`,
        },
        data: restfulApiData.update_partial_booking,
      },
    );
    const partialUpdatejson = await respData.json();
    console.log(partialUpdatejson);
    expect(respData.status()).toBe(200);
    expect(partialUpdatejson.firstname).toMatch(
      restfulApiData.update_partial_booking.firstname,
    );
    expect(partialUpdatejson.lastname).toMatch(
      restfulApiData.update_partial_booking.lastname,
    );
  },
);
// test(
//   "Id-14 DELETE -[Restful-Booker > Booking] Verify that user is able to delete existing booking using Delete API and receive valid response",
//   {
//     tag: ["@API", "@UAT"],
//     annotation: {
//       type: "API LINK",
//       description: "https://www.google.com",
//     },
//   },
//   async ({ request, commonUtilsApiFixture }) => {
//     const token = await commonUtilsApiFixture.createToken(request);

//     const respData = await request.delete(
//       `${apiPathData.booking_path}/${apiPathData.booking_path_id}`,
//       {
//         headers: {
//           Cookie: `token=${token}`,
//         },
//       },
//     );

//     expect(respData.status()).toBe(201);
//     expect(respData.statusText()).toBe("Created");
//   },
// );
