import { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Image } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage'; // ✅ AsyncStorage 불러오기

export default function HomeScreen() {
    const [text, setText] = useState<string>('');
    const [emotion, setEmotion] = useState<string>('');
    const [image, setImage] = useState<any>(null);
    const [backgroundColor, setBackgroundColor] = useState<string>('#fffafc');

    useEffect(() => {
        const loadDiary = async () => {
            try {
                const savedEntry = await AsyncStorage.getItem('latestDiary');
                if (savedEntry !== null) {
                    const diary = JSON.parse(savedEntry);
                    setText(diary.text);          // 저장했던 텍스트 불러오기
                    setEmotion(diary.emotion);     // 저장했던 감정 불러오기

                    // 감정에 맞춰 이미지와 배경색도 같이 적용
                    if (diary.emotion === '😊 기쁨') {
                        setImage(require('../../assets/characters/happy.png'));
                        setBackgroundColor('#ffe6ec');
                    } else if (diary.emotion === '😢 슬픔') {
                        setImage(require('../../assets/characters/sad.png'));
                        setBackgroundColor('#d0e7ff');
                    } else {
                        setImage(require('../../assets/characters/neutral.png'));
                        setBackgroundColor('#e0e0e0');
                    }

                    console.log('📖 저장된 감정일기 불러오기 완료!');
                }
            } catch (error) {
                console.error('❌ 감정일기 불러오기 실패:', error);
            }
        };

        loadDiary(); // 앱이 켜질 때 함수 실행
    }, []); // []는 "앱 처음 켰을 때 한 번만" 실행한다는 의미

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
        } catch (error) {
            console.error('❌ 저장 실패:', error);
        }
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