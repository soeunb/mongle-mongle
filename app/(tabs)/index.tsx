import { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Image } from 'react-native';

export default function HomeScreen() {
    const [text, setText] = useState<string>('');      // 감정일기 입력
    const [emotion, setEmotion] = useState<string>(''); // 감정 결과 텍스트
    const [image, setImage] = useState<any>(null);     // 캐릭터 이미지 상태

    const handleAnalyze = (): void => {
        if (text.includes('좋아') || text.includes('행복')) {
            setEmotion('😊 기쁨');
            setImage(require('../../assets/characters/happy.png')); // 기쁨 이미지
        } else if (text.includes('슬퍼') || text.includes('힘들')) {
            setEmotion('😢 슬픔');
            setImage(require('../../assets/characters/sad.png')); // 슬픔 이미지
        } else {
            setEmotion('😐 중립');
            setImage(require('../../assets/characters/neutral.png')); // 중립 이미지
        }
    };

    return (
        <View style={styles.container}>
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

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fffafc',
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