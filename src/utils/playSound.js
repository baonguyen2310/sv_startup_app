import * as Speech from 'expo-speech'

const optionsInitial = {
    voice: "vi-VN-language",
    rate: 1,
    pitch: 1
}

function playSoundOrAlt({ content, playSound, options = optionsInitial }) {
    if (content.audioUrl != "") {
        playSound(content.audioUrl)
    } else {
        Speech.speak(content.alt, options)
    }
}

function playMain({ level, playSound, options }) {
    playSoundOrAlt({ content: level.levelContent.main, playSound, options })
}

function playGuide({ level, index, playSound, options }) {
    playSoundOrAlt({ content: level.levelContent.guides[index], playSound, options })
}

function playQuestion({ level, index, playSound, options }) {
    playSoundOrAlt({ content: level.levelContent.questions[index], playSound, options })
}

function playAnswer({ level, index, playSound, options }) {
    playSoundOrAlt({ content: level.levelContent.answers[index], playSound, options })
}

function playReview({ level, status, playSound, options }) {
    playSoundOrAlt({ content: level.levelContent.reviews[status], playSound, options })
}

function playTip({ level, index, playSound, options }) {
    playSoundOrAlt({ content: level.levelContent.tips[index], playSound, options })
}

export {
    playMain,
    playQuestion,
    playAnswer,
    playGuide,
    playReview,
    playTip
}