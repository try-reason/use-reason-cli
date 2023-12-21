import { reasonStream } from 'tryreason'

interface City {
  /** A two sentence description of the city */
  description: string;  
  points_of_interest: {
    name: string;
    description: string;
    address: string;
  }[];
}

// POST /hello
export async function* GET() {
  const res = await fetch(`http://ip-api.com/json/`)
  if (res.status !== 200) {
    return new Response('Error', { status: 500 })
  }
  const { city } = await res.json()

  for await (const output of reasonStream<City>(`Tell me about ${city}`)) {
    yield output
  }
}