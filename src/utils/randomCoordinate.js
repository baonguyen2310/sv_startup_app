function getBoxes(width, height, numBox, boxWidth = 100, boxHeight = 100, margin = 5) {
    const minX = 0
    const maxX = width
    const minY = 0
    const maxY = height * 0.55

    const maxNumBoxesPerRow = Math.floor((maxX-minX)/boxWidth)
    const numRows = Math.ceil(numBox/maxNumBoxesPerRow)

    //SAI: VÌ FILL {} SẼ THAM CHIẾU ĐẾN CÙNG 1 OBJECT
    //const boxes = new Array(numRows).fill(new Array(numBoxesPerRow).fill({}))

    const boxes = new Array(numRows)
    for (let i = 0; i < numRows; i++) {
        boxes[i] = []
        if (i == numRows - 1) { // dòng cuối
            for (let j = 0; j < (numBox % maxNumBoxesPerRow); j++) {
                boxes[i].push({
                    x: margin * (j + 1) + boxWidth * (2 * j + 1) / 2,
                    y: margin * (i + 1) + boxHeight * (2 * i + 1) / 2
                })
            }
        } else {
            for (let j = 0; j < maxNumBoxesPerRow; j++) {
                boxes[i].push({
                    x: margin * (j + 1) + boxWidth * (2 * j + 1) / 2,
                    y: margin * (i + 1) + boxHeight * (2 * i + 1) / 2
                })
            }
        }
    }

    return boxes.flat()
}

function calculateDistance(x1, y1, x2, y2) {
    const deltaX = x2 - x1;
    const deltaY = y2 - y1;
    const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
    return distance;
  }

export {
    getBoxes,
    calculateDistance
}