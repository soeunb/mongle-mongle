import happyImg from '../assets/characters/happy.png';
import sparkleImg from '../assets/characters/sparkle.png';
import sleepyImg from '../assets/characters/sleepy.png';

export type Skin = {
    id: string;
    name: string;
    image: any; // 또는 image: ImageSourcePropType;
    cost: number;
};

export const SKINS: Skin[] = [
    {
        id: 'default',
        name: '기본 구름',
        image: happyImg,
        cost: 0,
    },
    {
        id: 'sparkle',
        name: '반짝 구름',
        image: sparkleImg,
        cost: 30,
    },
    {
        id: 'sleepy',
        name: '졸린 구름',
        image: sleepyImg,
        cost: 50,
    },
];