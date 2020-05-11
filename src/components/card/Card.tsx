import React from 'react';
import styles from './index.less';

interface CardProps {
  name: string;
  checked?: boolean;
  id: number;
  onClick: (key: number) => void;
  x?: number;
  y?: number;
  deg?: number;
  z?: number;
}

const Card: React.FC<CardProps> = props => {
  const { x, y, z, deg } = props;

  return (
    <div
      className={`${styles.container} ${props.checked ? styles.checked : null}`}
      style={
        props.checked
          ? {
              transform: 'translate(-50%, -85%) rotate(0deg)',
              zIndex: 99,
            }
          : {
              transform: `translate(${x || 0}px, ${y || 0}px) rotate(${deg || 0}deg)`,
              zIndex: z || 1,
            }
      }
      onClick={() => {
        props.onClick && props.onClick(props.id);
      }}
    >
      <div className={styles.front}></div>
      <div className={styles.backend}>{props.name || '迷'}</div>
    </div>
  );
};

export default Card;
