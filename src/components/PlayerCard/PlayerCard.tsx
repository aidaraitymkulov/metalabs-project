import { type FC } from 'react'
import styles from './PlayerCard.module.scss'
import { Player } from '@/types';
import Image from 'next/image';

type PlayerCardProps = {
    player: Player
}

export const PlayerCard: FC<PlayerCardProps> = ({player}) => {
    console.log(player)
    return (
        <div className={styles.card}>
            <Image
             className={styles.playerPhoto}
             src={player.photo}
             alt={player.name}
             width={100}
             height={100}
            />
            <div className={styles.info}>
                <p className={styles.name}>{player.name}</p>
                <p className={styles.age}>Age: {player.age}</p>
                <p className={styles.nation}>{player.nationality}</p>
            </div>
        </div>
    );
}