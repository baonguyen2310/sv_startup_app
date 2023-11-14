import * as Speech from 'expo-speech'

const optionsInitial = {
    voice: "vi-VN-language",
    rate: 1,
    pitch: 1
}

// Change Speech.speak to Promise
function speakAsync(text, options) {
    return new Promise((resolve) => {
        Speech.speak(
            text,
            {
                ...options,
                onDone: resolve
            }
        )
    })
}

async function playSoundOrAltAsync({ content, playSound, options = optionsInitial }) {
    if (content.audioUrl != "") {
        await playSound(content.audioUrl)
    } else {
        await speakAsync(content.alt, options)
    }
}

async function playMainAsync({ level, playSound, options }) {
    await playSoundOrAltAsync({ content: level.levelContent.main, playSound, options })
}

async function playGuideAsync({ level, index, playSound, options }) {
    await playSoundOrAltAsync({ content: level.levelContent.guides[index], playSound, options })
}

async function playQuestionAsync({ level, index, playSound, options }) {
    await playSoundOrAltAsync({ content: level.levelContent.questions[index], playSound, options })
}

async function playAnswerAsync({ level, index, playSound, options }) {
    await playSoundOrAltAsync({ content: level.levelContent.answers[index], playSound, options })
}

async function playReviewAnswerAsync({ level, status, playSound, options }) {
    await playSoundOrAltAsync({ content: level.levelContent.reviews_answer[status], playSound, options })
}

async function playReviewSpeechAsync({ level, status, playSound, options }) {
    await playSoundOrAltAsync({ content: level.levelContent.reviews_speech[status], playSound, options })
}

async function playTipAsync({ level, index, playSound, options = { voice: "vi-vn-x-vif-local" } }) {
    await playSoundOrAltAsync({ content: level.levelContent.tips[index], playSound, options })
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

function playReviewAnswer({ level, status, playSound, options }) {
    playSoundOrAlt({ content: level.levelContent.reviews_answer[status], playSound, options })
}

function playReviewSpeech({ level, status, playSound, options }) {
    playSoundOrAlt({ content: level.levelContent.reviews_speech[status], playSound, options })
}

function playTip({ level, index, playSound, options = { voice: "vi-vn-x-vif-local" } }) {
    playSoundOrAlt({ content: level.levelContent.tips[index], playSound, options })
}

export {
    playSoundOrAlt,
    playMain,
    playQuestion,
    playAnswer,
    playGuide,
    playReviewAnswer,
    playReviewSpeech,
    playTip,

    playSoundOrAltAsync,
    playMainAsync,
    playQuestionAsync,
    playAnswerAsync,
    playGuideAsync,
    playReviewAnswerAsync,
    playReviewSpeechAsync,
    playTipAsync
}