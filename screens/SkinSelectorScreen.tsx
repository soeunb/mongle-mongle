import React from 'react';
import { View, Text, FlatList, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { SKINS, Skin } from '@/constants/skins';
import AsyncStorage from "@react-native-async-storage/async-storage"; // 너가 만든 skins.ts

export default function SkinSelectorScreen() {
    const handleSelectSkin = async (skin: Skin) => {
        try {
            const saved = await AsyncStorage.getItem('userState');
            let user = saved ? JSON.parse(saved) : {
                currentSkinId: 'default',
                ownedSkins: ['default'],
                points: 0,
            };

            user.currentSkinId = skin.id;

            await AsyncStorage.setItem('userState', JSON.stringify(user));
            console.log('🧸 선택한 스킨 저장 완료!');
        } catch (e) {
            console.error('스킨 저장 실패:', e);
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>스킨 선택하기</Text>
            <FlatList
                data={SKINS}
                keyExtractor={(item) => item.id}
                horizontal
                renderItem={({ item }) => (
                    <TouchableOpacity style={styles.item} onPress={() => handleSelectSkin(item)}>
                        <Image source={item.image} style={styles.image} />
                        <Text>{item.name}</Text>
                        <Text>{item.cost} 💰</Text>
                    </TouchableOpacity>
                )}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 20,
        alignItems: 'center',
        backgroundColor: '#fffafc',
        flex: 1,
    },
    title: {
        fontSize: 20,
        marginBottom: 20,
        color: '#ff9eb5',
    },
    item: {
        alignItems: 'center',
        marginRight: 20,
    },
    image: {
        width: 80,
        height: 80,
        resizeMode: 'contain',
        marginBottom: 8,
    },
});