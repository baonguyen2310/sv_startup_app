import { useState, useEffect } from 'react'
import {Modal, StyleSheet, Text, Pressable, View, Image, ImageBackground} from 'react-native'
import { AntDesign } from '@expo/vector-icons'
import StarRating from 'react-native-star-rating'
import { Audio } from "expo-av"

export default function CompleteModal({ modalVisible, setModalVisible, message, star, navigation }) {
  // PLAYSOUND CLAP
  const [sound, setSound] = useState() // dùng 1 sound duy nhất để không bị chồng lên nhau

  async function playSound() {
      //const { sound } = await Audio.Sound.createAsync(require("./meoAudio.wav"))
      const { sound } = await Audio.Sound.createAsync(require("../assets/sounds/clap.mp3"))
      setSound(sound)
      await sound.playAsync()
  }

  useEffect(() => {
      return sound 
      ? () => {
          sound.unloadAsync()
      }
      : undefined
  }, [sound])

  const [showLevelSelection, setShowLevelSelection] = useState(false)

  useEffect(() => {
    let timeOutId

    if (modalVisible) {
      playSound()

      timeOutId = setTimeout(() => {
        setShowLevelSelection(true)
      }, 3000)
    }

    return (() => {
      if (timeOutId) {
        clearTimeout(timeOutId)
      }
    })
  }, [modalVisible])

  const starList = new Array(star).fill(0)
  
  return (
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <View style={{ zIndex: 1, height: "100%", position: "absolute", pointerEvents: "none", right: 0, top: 0 }}>
              <Image style={styles.imageSmall} source={ require('../assets/images/firework_4.gif') } />
              <Image style={styles.imageSmall} source={ require('../assets/images/start.gif') } />
            </View>
            <View style={{ zIndex: 1, height: "100%", position: "absolute", pointerEvents: "none", left: 0, top: 0 }}>
              <Image style={styles.imageSmall} source={ require('../assets/images/firework_3.gif') } />
              <Image style={styles.imageSmall} source={ require('../assets/images/start.gif') } />
            </View>
            <Text style={styles.modalText}>{message}</Text>
            <StarRating
              disabled={false}
              maxStars={5}
              rating={star}
              fullStarColor='#FDCC0D'
            />
            {/* <View style={styles.starList}>
              {
                starList.map((value, index) => {
                  return (
                    <AntDesign key={index} name="star" size={30} color="yellow" />
                  )
                })
              }
            </View> */}
            {
              showLevelSelection && (
                <Pressable
                  style={[styles.button, styles.buttonClose]}
                  onPress={() => navigation.goBack()}>
                  <Text style={styles.textStyle}>Chọn màn chơi</Text>
                </Pressable>
              )
            }

            {/* <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={() => setModalVisible(!modalVisible)}>
              <Text style={styles.textStyle}>Hide Modal</Text>
            </Pressable> */}
          </View>
        </View>
      </Modal>
  )
}

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    width: "90%",
    height: 250,
    justifyContent: "center"
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  buttonClose: {
    marginTop: 10,
    backgroundColor: 'pink',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
    color: '#FF3FA4',
    fontWeight: "bold",
  },
  starList: {
    flexDirection: 'row',
    justifyContent: 'space-around'
  },
  imageSmall: {
    width: 200,
    height: 200
  },
})