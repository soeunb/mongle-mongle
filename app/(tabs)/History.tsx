import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

type DiaryEntry = {
    text: string;
    emotion: string;
    date: string;
};

export default function HistoryScreen() {
    const [diaryList, setDiaryList] = useState<DiaryEntry[]>([]);

    useEffect(() => {
        const loadDiaryList = async () => {
            try {
                const saved = await AsyncStorage.getItem('diaryList');
                const list: DiaryEntry[] = saved ? JSON.parse(saved) : [];
                setDiaryList(list);
            } catch (e) {
                console.error('불러오기 실패', e);
            }
        };

        loadDiaryList();
    }, []);

    const formatDate = (isoString: string) => {
        const date = new Date(isoString);
        return date.toLocaleDateString('ko-KR', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
        });
    };

    const renderItem = ({ item }: { item: DiaryEntry }) => (
        <View style={styles.card}>
        <Text style={styles.date}>{formatDate(item.date)}</Text>
    <Text style={styles.emotion}>{item.emotion}</Text>
        <Text style={styles.text} numberOfLines={2}>{item.text}</Text>
        </View>
);

    return (
        <View style={styles.container}>
        <Text style={styles.title}>📖 내 감정 히스토리</Text>
    <FlatList
    data={diaryList}
    keyExtractor={(item, index) => index.toString()}
    renderItem={renderItem}
    />
    </View>
);
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fffafc',
        padding: 20,
    },
    title: {
        fontSize: 22,
        marginBottom: 16,
        color: '#ff9eb5',
        fontWeight: 'bold',
    },
    card: {
        backgroundColor: '#fff',
        borderRadius: 12,
        padding: 16,
        marginBottom: 12,
        borderWidth: 1,
        borderColor: '#ffd9e1',
    },
    date: {
        fontSize: 14,
        color: '#888',
        marginBottom: 4,
    },
    emotion: {
        fontSize: 18,
        marginBottom: 6,
    },
    text: {
        fontSize: 16,
        color: '#444',
    },
});