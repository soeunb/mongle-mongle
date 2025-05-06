import React from 'react';
import { View, Text, FlatList, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { SKINS, Skin } from '@/constants/skins'; // 너가 만든 skins.ts

export default function SkinSelectorScreen() {
    const handleSelectSkin = (skin: Skin) => {
        // TODO: 선택한 스킨 저장 로직
        console.log('선택한 스킨:', skin.name);
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