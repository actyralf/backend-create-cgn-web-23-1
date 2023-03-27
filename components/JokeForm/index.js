import { useState } from "react";
import useSWR from "swr";

export default function JokeForm() {
  const [joke, setJoke] = useState("");

  const { mutate } = useSWR("/api/jokes");

  async function handleSubmit(event) {
    event.preventDefault();
    try {
      const response = await fetch("/api/jokes", {
        method: "POST",
        body: JSON.stringify({ joke }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (response.ok) {
        mutate();
      } else {
        throw new Error(`Error: ${response.status}`);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setJoke("");
    }
  }
  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="joke">Gib hier bitte einen Witz ein</label>
      <input
        value={joke}
        onChange={(event) => {
          setJoke(event.target.value);
        }}
        id="joke"
        type="text"
        name="joke"
      />
      <button type="submit">Submit</button>
    </form>
  );
}
