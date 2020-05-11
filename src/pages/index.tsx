import React, { useState } from 'react';
import styles from './index.css';
import Card from '@/components/card/Card';
// import ChessBoard from '@/components/chessboard';
import { data } from './config';

export default function() {
  const [current, setCurrent] = useState<number | null>(null);

  const onCardClick = (key: number) => {
    setCurrent(key);
  };

  return (
    <div className={styles.normal}>
      {/* <ChessBoard></ChessBoard> */}
      <div className={styles.title}>抽取您的塔罗牌，让命运决定午时去向...</div>
      {data.map(item => {
        return (
          <Card
            key={item.key}
            id={item.key}
            x={item.x}
            y={item.y}
            z={item.z}
            deg={item.deg}
            name={item.name}
            onClick={onCardClick}
            checked={item.key === current}
          ></Card>
        );
      })}
    </div>
  );
}
