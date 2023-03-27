import dbConnect from "../../../db/connect";
import Joke from "../../../db/models/Joke";

export default async function handler(request, response) {
  await dbConnect();

  if (request.method === "GET") {
    const jokes = await Joke.find();
    return response.status(200).json(jokes);
  }
  if (request.method === "POST") {
    try {
      const joke = new Joke(request.body);
      await joke.save();
      return response.status(201).json({ status: "ok" });
    } catch (error) {
      return response.status(500).json({ message: error.message });
    }
  }
}
