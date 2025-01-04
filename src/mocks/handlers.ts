import { delay, http, HttpResponse } from "msw";

const API_DELAY = 2000;

export const handlers = [
  http.post("/api/create-project", async ({ request }) => {
    const requestBody = await request.json();
    await delay(API_DELAY);
    if (
      typeof requestBody === "object" &&
      // to imitate failing request start project name with "fail" string
      requestBody?.name?.toLowerCase().startsWith("fail")
    ) {
      return HttpResponse.json(
        { message: "Something went wrong." },
        { status: 500 },
      );
    }
    return HttpResponse.json({ createdAt: new Date() }, { status: 201 });
  }),
];
