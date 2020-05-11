import React, { useState } from 'react';
import styles from './index.css';
import Card from '@/components/card/Card';
// import ChessBoard from '@/components/chessboard';

const data = [
  {
    key: 0,
    name: '虾小哥',
    x: Math.random() * 800 - 400,
    y: Math.random() * 50 - 25,
    z: Math.round(Math.random() * 90),
    deg: Math.random() * 180,
  },
  {
    key: 1,
    name: '铁碗饭',
    x: Math.random() * 800 - 400,
    y: Math.random() * 50 - 25,
    z: Math.round(Math.random() * 90),
    deg: Math.random() * 180,
  },
  {
    key: 2,
    name: '陕老顺',
    x: Math.random() * 800 - 400,
    y: Math.random() * 50 - 25,
    z: Math.round(Math.random() * 90),
    deg: Math.random() * 180,
  },
  {
    key: 3,
    name: '胖妈水饺',
    x: Math.random() * 800 - 400,
    y: Math.random() * 50 - 25,
    z: Math.round(Math.random() * 90),
    deg: Math.random() * 180,
  },
  {
    key: 4,
    name: '聚光食堂',
    x: Math.random() * 800 - 400,
    y: Math.random() * 50 - 25,
    z: Math.round(Math.random() * 90),
    deg: Math.random() * 180,
  },
  {
    key: 5,
    name: '迷上你',
    x: Math.random() * 800 - 400,
    y: Math.random() * 50 - 25,
    z: Math.round(Math.random() * 90),
    deg: Math.random() * 180,
  },
  {
    key: 6,
    name: '望江面馆',
    x: Math.random() * 800 - 400,
    y: Math.random() * 50 - 25,
    z: Math.round(Math.random() * 90),
    deg: Math.random() * 180,
  },
  {
    key: 7,
    name: '大鱼',
    x: Math.random() * 800 - 400,
    y: Math.random() * 50 - 25,
    z: Math.round(Math.random() * 90),
    deg: Math.random() * 180,
  },
];

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
