import { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Image } from 'react-native';

export default function HomeScreen() {
    const [text, setText] = useState<string>('');

    const [emotion, setEmotion] = useState<string>('');

    const [emoji, setEmoji] = useState<string>('🌥️'); // 초기: 흐림 구름

    const handleAnalyze = (): void => {
        if (text.includes('좋아') || text.includes('행복')) {
            setEmotion('😊 기쁨');
            setEmoji('🌞'); // 기쁨 → 해맑은 구름
        } else if (text.includes('슬퍼') || text.includes('힘들')) {
            setEmotion('😢 슬픔');
            setEmoji('🌧️'); // 슬픔 → 비 오는 구름
        } else {
            setEmotion('😐 중립');
            setEmoji('⛅️'); // 중립 → 흐림과 맑음 사이
        }
    };

    return (
        <View style={styles.container}>
            {/* 감정 캐릭터 (이모지로 표현) */}
            <Text style={styles.emoji}>{emoji}</Text>

            {/* 제목 */}
            <Text style={styles.title}>🌸 오늘 하루 어땠나요?</Text>

            {/* 입력창 */}
            <TextInput
                style={styles.input}
                placeholder="마음속 이야기를 적어보세요..."
                value={text}
                onChangeText={setText}
                multiline
            />

            {/* 감정 분석 버튼 */}
            <Button title="감정 분석하기" onPress={handleAnalyze} />

            {/* 감정 결과 텍스트 */}
            {emotion !== '' && (
                <Text style={styles.result}>결과: {emotion}</Text>
            )}
        </View>
    );
}

// 스타일 설정 (디자인 느낌)
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fffafc',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20,
    },
    emoji: {
        fontSize: 64, // 캐릭터 이모지 크기
        marginBottom: 12,
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