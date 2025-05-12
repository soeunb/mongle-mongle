import { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Image } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage'; // ✅ AsyncStorage 불러오기
type UserState = {
    currentSkinId: string;
    ownedSkins: string[];
    points: number;
};

export default function HomeScreen() {
    const [text, setText] = useState<string>('');
    const [emotion, setEmotion] = useState<string>('');
    const [image, setImage] = useState<any>(null);
    const [backgroundColor, setBackgroundColor] = useState<string>('#fffafc');

    useEffect(() => {
        const loadDiary = async () => {
            try {
                const savedEntry = await AsyncStorage.getItem('latestDiary');
                const savedUser = await AsyncStorage.getItem('userState'); // ✅ [추가] 선택한 스킨 불러오기

                let currentSkinId = 'default';
                if (savedUser) {
                    const user = JSON.parse(savedUser);
                    currentSkinId = user.currentSkinId || 'default';
                }

                if (savedEntry !== null) {
                    const diary = JSON.parse(savedEntry);
                    setText(diary.text);
                    setEmotion(diary.emotion);

                    let emotionKey = 'neutral';
                    if (diary.emotion === '😊 기쁨') emotionKey = 'happy';
                    else if (diary.emotion === '😢 슬픔') emotionKey = 'sad';

                    const imagePath = getSkinImage(currentSkinId, emotionKey);
                    setImage(imagePath);

                    setBackgroundColor(getEmotionBackground(diary.emotion));
                } else {
                    const imagePath = getSkinImage(currentSkinId, 'neutral');
                    setImage(imagePath);
                }
                console.log('📖 저장된 감정일기 불러오기 완료!');
            } catch (error) {
                console.error('❌ 감정일기 불러오기 실패:', error);
            }
        };

        loadDiary(); // 앱이 켜질 때 함수 실행
    }, []);

    const addPoints = async (amount: number) => {
        try {
            const saved = await AsyncStorage.getItem('userState');
            let user: UserState;

            if (saved) {
                user = JSON.parse(saved);
            } else {
                user = {
                    currentSkinId: 'default',
                    ownedSkins: ['default'],
                    points: 0,
                };
            }

            user.points += amount;

            await AsyncStorage.setItem('userState', JSON.stringify(user));
            console.log(`💰 포인트 적립 완료! 현재 포인트: ${user.points}`);
        } catch (e) {
            console.error('포인트 적립 실패:', e);
        }
    };

    const handleAnalyze = async (): Promise<void> => {
        let detectedEmotion = '';
        let characterImage: any = null;
        let bgColor = '';

        if (text.includes('좋아') || text.includes('행복')) {
            detectedEmotion = '😊 기쁨';
            characterImage = require('../../assets/characters/happy.png');
            bgColor = '#ffe6ec';
        } else if (text.includes('슬퍼') || text.includes('힘들')) {
            detectedEmotion = '😢 슬픔';
            characterImage = require('../../assets/characters/sad.png');
            bgColor = '#d0e7ff';
        } else {
            detectedEmotion = '😐 중립';
            characterImage = require('../../assets/characters/neutral.png');
            bgColor = '#e0e0e0';
        }

        setEmotion(detectedEmotion);
        setImage(characterImage);
        setBackgroundColor(bgColor);

        const newEntry = {
            text: text,
            emotion: detectedEmotion,
            date: new Date().toISOString(),
        };

        try {
            const savedData = await AsyncStorage.getItem('diaryList');
            let diaryList = savedData ? JSON.parse(savedData) : [];

            diaryList.unshift(newEntry);

            await AsyncStorage.setItem('diaryList', JSON.stringify(diaryList));

            console.log('📝 감정일기 추가 저장 완료!');

            await addPoints(5);

        } catch (error) {
            console.error('❌ 저장 실패:', error);
        }
    };

    const getSkinImage = (skinId: string, emotion: string) => {
        const key = `${skinId}_${emotion}`; // 예: 'default_happy'

        const imageMap: Record<string, any> = {
            default_happy: require('../../assets/characters/happy.png'),
            default_sad: require('../../assets/characters/sad.png'),
            default_neutral: require('../../assets/characters/neutral.png'),

            sparkle_happy: require('../../assets/characters/sparkle.png'),
            sparkle_sad: require('../../assets/characters/sparkle.png'),
            sparkle_neutral: require('../../assets/characters/sparkle.png'),

            sleepy_happy: require('../../assets/characters/sleepy.png'),
            sleepy_sad: require('../../assets/characters/sleepy.png'),
            sleepy_neutral: require('../../assets/characters/sleepy.png'),
        };

        return imageMap[key] || imageMap['default_neutral'];
    };

    const getEmotionBackground = (emotion: string) => {
        if (emotion === '😊 기쁨') return '#ffe6ec';
        if (emotion === '😢 슬픔') return '#d0e7ff';
        return '#e0e0e0';
    };

    return (
        <View style={[styles.container, { backgroundColor }]}>
            {image && <Image source={image} style={styles.character} />}
            <Text style={styles.title}>🌸 오늘 하루 어땠나요?</Text>
            <TextInput
                style={styles.input}
                placeholder="마음속 이야기를 적어보세요..."
                value={text}
                onChangeText={setText}
                multiline
            />
            <Button title="감정 분석하기" onPress={handleAnalyze} />
            {emotion !== '' && (
                <Text style={styles.result}>결과: {emotion}</Text>
            )}
        </View>
    );
}

// 스타일
const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20,
    },
    character: {
        width: 120,
        height: 120,
        marginBottom: 16,
        resizeMode: 'contain',
    },
    title: {
        fontSize: 22,
        marginBottom: 12,
        color: '#ff9eb5',
    },
    input: {
        width: '100%',
        height: 120,
        backgroundColor: '#ffffff',
        borderColor: '#ffd9e1',
        borderWidth: 1,
        borderRadius: 10,
        padding: 12,
        marginBottom: 16,
        textAlignVertical: 'top',
    },
    result: {
        marginTop: 20,
        fontSize: 18,
        color: '#444',
    },
});