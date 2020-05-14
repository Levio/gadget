import React, { useState, useEffect, useRef } from 'react';
import styles from './index.css';
import Card from '@/components/card/Card';
// import ChessBoard from '@/components/chessboard';
import { data } from './config';

export default function() {
  const [current, setCurrent] = useState<number | null>(null);
  const [onlineNum, setOnlineNum] = useState<number>(0);
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
      console.log(1);
      setCurrent(key);
    }
  };

  useEffect(() => {
    if (!wsRef.current) {
      try {
        // (wsRef as any).current = new WebSocket('ws://192.168.5.106:4000');http://192.168.1.101/
        (wsRef as any).current = new WebSocket('ws://139.186.79.153:3003');
        let ws: any = wsRef.current;
        ws.onopen = () => {
          ws.send(
            JSON.stringify({
              type: 'jn',
              message: 1,
            }),
          );
        };
        ws.onmessage = (message: any) => {
          console.log(message);
          const { type, message: data } = JSON.parse(message.data);
          if (type === 'sc') {
            setCurrent(data);
          }
          if (type === 'jn') {
            setOnlineNum(data);
          }
        };
      } catch (error) {
        console.log(error);
        (wsRef as any).current = null;
      }
    }
    window.onunload = () => {
      wsRef.current &&
        wsRef.current.send(
          JSON.stringify({
            type: 'exit',
          }),
        );
    };
    return () => {
      window.onunload = null;
    };
  }, []);

  return (
    <div className={styles.normal}>
      {/* <ChessBoard></ChessBoard> */}
      <div className={styles.title}>
        <div>抽取您的塔罗牌，让命运决定午时去向...</div>
        <div className={styles.online}>
          围观民众: <span>{onlineNum || 1}</span>人
        </div>
      </div>

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
