import { Player } from "@/types";

const API_KEY = process.env.API_KEY as string;

async function getPlayersByTeam(teamId: number): Promise<Player[]> {

    const url = `https://v3.football.api-sports.io/players?team=${teamId}&season=2022`;
    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': API_KEY,
            'X-RapidAPI-Host': 'v3.football.api-sports.io'
        },
        next: {
            revalidate: 86400 
        }
    };

    try {
        const response = await fetch(url, options);
        const data = await response.json();
        const players: Player[] = data.response;
       if (!players) {
            return [];
        }
        return players;
    } catch (err) {
        console.log(`Error fetching players for team ${teamId}: ${err}`);
        return [];
    }
}

export default getPlayersByTeam;
