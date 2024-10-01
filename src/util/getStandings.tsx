
import 'server-only';
import { Standing } from "@/types";


export default async function getStandings(): Promise<Standing[]> {

    const API_KEY: string = process.env.API_KEY as string;

    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': API_KEY,
            'X-RapidAPI-Host': 'v3.football.api-sports.io'
        },
        next: {
            revalidate: 60 * 60 * 24
        }
    };

    const standings: Standing[] = [];

    const leagues = [
        { name: 'EPL', id: 39 },
        { name: 'La Liga', id: 140 },
        { name: 'BundesLiga', id: 78 },
        { name: 'Serie A', id: 135 },
        { name: 'Ligue1', id: 61 }
    ]

    for (const league of leagues) {
        let url = `https://v3.football.api-sports.io/standings?season=2022&league=${league.id}`

        try {
            const response = await fetch(url, options);
            const data = await response.json();
            const standing = data.response[0];
        
            if (standing) {
              standings.push(standing);
            }
        } catch (err) {
            console.error(`Error fetching ${league.name} standings: ${err}`);
        }
    }

    return standings;
}