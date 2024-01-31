// import { Liveblocks } from "@liveblocks/node";
// import type { NextApiRequest, NextApiResponse } from "next";

// const API_KEY = "sk_dev_JBcep8yT60Sv5M45fOt9Nry9jHrt2-dsC0rWXrZt8DtT2lRdu5ctZlYqT84I3Bl3";

// const liveblocks = new Liveblocks({
//   secret: API_KEY!,
// });

// export default async function handler(
//   request: NextApiRequest,
//   response: NextApiResponse
// ) {
//   // Get the current user's info from your database
//   const user = {
//     id: "charlielayne@example.com",
//     info: {
//       name: "Charlie Layne",
//       color: "#D583F0",
//       picture: "https://liveblocks.io/avatars/avatar-1.png",
//     },
//   };

//   // Create a session for the current user
//   // userInfo is made available in Liveblocks presence hooks, e.g. useOthers
//   const session = liveblocks.prepareSession(user.id, {
//     userInfo: user.info,
//   });

//   // Give the user access to the room
//   const { room } = request.body;
//   session.allow(room, session.FULL_ACCESS);

//   // Authorize the user and return the result
//   const { status, body } = await session.authorize();
//   response.status(status).send(body);
// }