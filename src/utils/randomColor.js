// Hàm để tạo một mảng ngẫu nhiên các màu
function generateRandomColors(numColors) {
  const colors = [];
  for (let i = 0; i < numColors; i++) {
    const randomColor = getRandomBrightHexColor();
    colors.push(randomColor);
  }
  return colors;
}

// Hàm để tạo một màu ngẫu nhiên
function getRandomColor() {
  const letters = "0123456789ABCDEF";
  let color = "#";
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

// Hàm để tạo màu HEX ngẫu nhiên sáng
function getRandomBrightHexColor() {
  // Tạo một số ngẫu nhiên từ 128 đến 255 (0x80 - 0xFF) cho phần màu đỏ của mã HEX
  const red = Math.floor(Math.random() * 128) + 128;

  // Tạo một số ngẫu nhiên từ 128 đến 255 (0x80 - 0xFF) cho phần màu xanh của mã HEX
  const green = Math.floor(Math.random() * 128) + 128;

  // Tạo một số ngẫu nhiên từ 128 đến 255 (0x80 - 0xFF) cho phần màu xanh lam của mã HEX
  const blue = Math.floor(Math.random() * 128) + 128;

  // Tạo mã HEX từ các giá trị màu
  const randomHexColor = `#${red.toString(16)}${green.toString(16)}${blue.toString(16)}`;

  return randomHexColor;
}

export { generateRandomColors };
