"use client"
import { Team } from '@/types';
import styles from './SearchBar.module.scss';
import { useRouter } from 'next/router';
import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';

export default function SearchBar({teamsData}:{teamsData: Team[]}) {

    const [searchTeam, setSearchTeam] = useState('')
    // const [focusedIndex, setFocusedIndex] = useState(-1)
    const [showFilteredBox, setShowFilteredBox] = useState(false)

    // let router = useRouter();

    const filteredTeams = teamsData.filter(team =>
        team.team.name.toLowerCase().includes(searchTeam.toLowerCase())
    );

    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTeam(event.target.value);
        setShowFilteredBox(true);
    }

    // const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    //     if (event.key === 'ArrowDown') {
    //         let length = 0;
    //         if (filteredTeams.length > 10) {
    //             length = 10;
    //         } else {
    //             length = filteredTeams.length;
    //         }
    //         console.log(focusedIndex)
    //         setFocusedIndex(prevIndex => (prevIndex < length - 1 ? prevIndex + 1 : prevIndex));
    //     } else if (event.key === 'ArrowUp') {
    //         event.preventDefault();
    //         setFocusedIndex(prevIndex => (prevIndex > 0 ? prevIndex - 1 : prevIndex));
    //     } else if (event.key === 'Enter') {
    //         if (focusedIndex !== -1) {
    //             const teamId = filteredTeams[focusedIndex].team.id;
    //             router.push(`/team/${teamId}`);
    //             setSearchTeam('');
    //         }
    //     }
    // }

    const handleTeamItemClick = () => {
        setSearchTeam('');
    }

    const teamListRef = useRef<HTMLDivElement>(null);

    const handleOutsideClick = (event: MouseEvent) => {
        if (teamListRef.current && !teamListRef.current.contains(event.target as Node)) {
            setShowFilteredBox(false);
        }
    }

    useEffect(() => {
        document.addEventListener('click', handleOutsideClick);
        return () => {
            document.removeEventListener('click', handleOutsideClick);
        }
    }, [])
    return (
        <div className={styles.searchBar}>
            <input type="text" placeholder='Search for a team...' className={styles.searchBar__input}
            value={searchTeam}
            onChange={handleSearchChange}
            // onKeyDown={handleKeyDown}
        />
        {
                searchTeam && filteredTeams.length > 0 && showFilteredBox ? (
                    <div
                        ref={teamListRef}
                        className={styles.searchBar__result}
                    >
                        {filteredTeams.slice(0, 10).map((standing, i) => (
                            <Link
                                href={`/team/${standing.team.id}`}
                                key={standing.team.id}
                                onClick={() => handleTeamItemClick()}
                            >
                                {standing.team.name}
                            </Link>
                        ))}

                    </div>
                ) : null
            }
        </div>
    );
}