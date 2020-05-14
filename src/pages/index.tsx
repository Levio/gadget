import React, { useState, useEffect, useRef } from 'react';
import styles from './index.css';
import Card from '@/components/card/Card';
// import ChessBoard from '@/components/chessboard';
import { data } from './config';

export default function() {
  const [current, setCurrent] = useState<number | null>(null);
  const wsRef = useRef<WebSocket>(null);

  const onCardClick = (key: number) => {
    // setCurrent(key);
    if (wsRef.current && wsRef.current.readyState === 1) {
      console.log(wsRef);
      wsRef.current.send(
        JSON.stringify({
          type: 'sc',
          message: key,
        }),
      );
    } else {
      setCurrent(key);
    }
  };

  useEffect(() => {
    if (!wsRef.current) {
      try {
        (wsRef as any).current = new WebSocket('ws://192.168.5.106:4000');
        (wsRef as any).current.onmessage = (message: any) => {
          console.log(message);
          const { type, message: data } = JSON.parse(message.data);
          if (type === 'sc') {
            setCurrent(data);
          }
        };
      } catch (error) {
        (wsRef as any).current = null;
      }
    }
  }, []);

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
