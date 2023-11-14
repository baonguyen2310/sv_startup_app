import { useState, useEffect } from 'react'
import {Modal, StyleSheet, Text, Pressable, View} from 'react-native'
import { AntDesign } from '@expo/vector-icons'
import StarRating from 'react-native-star-rating'

export default function CompleteModal({ modalVisible, setModalVisible, message, star, navigation }) {
  const [showLevelSelection, setShowLevelSelection] = useState(false)

  useEffect(() => {
    let timeOutId

    if (modalVisible) {
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
    backgroundColor: '#2196F3',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
  starList: {
    flexDirection: 'row',
    justifyContent: 'space-around'
  }
})