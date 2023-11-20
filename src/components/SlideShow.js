import { useState, useEffect } from 'react'
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native'
import { AntDesign } from '@expo/vector-icons';

export default function SlideShow({ dataSource }) {
    const [pictureIndex, setPictureIndex] = useState(0)

    function handleLeft() {
        if (pictureIndex > 0) {
            setPictureIndex(prev => prev - 1)
        }
    }
    function handleRight() {
        if (pictureIndex < dataSource.length - 1) {
            setPictureIndex(prev => prev + 1)
        }
    }

    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={handleLeft} style={styles.left} >
                <AntDesign name="left" size={60} color="white" />
            </TouchableOpacity>
            <Image style={styles.image} source={{ uri: dataSource[pictureIndex].imageUrl }} />
            <TouchableOpacity onPress={handleRight} style={styles.right} >
                <AntDesign name="right" size={60} color="white" />
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        width: "100%",
        height: 250
    },
    image: {
        width: "100%",
        height: "100%",
        borderWidth: 10,
        borderColor: 'pink',
        borderRadius: 20
    },
    left: {
        position: 'absolute',
        zIndex: 1,
        paddingTop: 100,
        left: 10,
        height: "100%"
    },
    right: {
        position: 'absolute',
        zIndex: 1,
        paddingTop: 100,
        right: 10,
        height: "100%"
    }
})