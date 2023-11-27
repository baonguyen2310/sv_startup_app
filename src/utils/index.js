function shuffleArray(array) {
    const newArray = [...array]
    for (let i = newArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
    }
    return newArray;
}

function arraysAreEqual(arr1, arr2) {
  if (arr1.length !== arr2.length) {
    return false;
  }

  for (let i = 0; i < arr1.length; i++) {
    if (arr1[i] !== arr2[i]) {
      return false;
    }
  }

  return true;
}

function normalizeText(text) {
  // Loại bỏ dấu câu và đổi thành chữ thường
  return text.replace(/[.,?!]/g, '').toLowerCase();
}  

function checkSpeechAnswer(speechResult, answer) {
  //if (speechResult.trim() == answer) {
    // console.log(normalizeText(speechResult))
    // console.log(normalizeText(answer))
  if (normalizeText(speechResult).includes(normalizeText(answer))) {
      return true
  } else {
      return false
  }
}

function tinhTuoi(ngaySinhDate) {
  var ngayHienTai = new Date();

  var tuoi = ngayHienTai.getFullYear() - ngaySinhDate.getFullYear();

  // Kiểm tra nếu chưa đến sinh nhật trong năm nay
  if (
      ngayHienTai.getMonth() < ngaySinhDate.getMonth() ||
      (ngayHienTai.getMonth() === ngaySinhDate.getMonth() && ngayHienTai.getDate() < ngaySinhDate.getDate())
  ) {
      tuoi--;
  }

  return tuoi;
}

export {
    shuffleArray,
    arraysAreEqual,
    normalizeText,
    checkSpeechAnswer,
    tinhTuoi
}