export class Cell {
  constructor (index, width = 0, height = 30) {
    this.index = index
    this.width = width
    this.height = height
    this.lineHeight = height
    this.borderColor = '#000000'
    this.color = ''
    this.value = '文本内容'
    this.textAlign = ''
    this.textIndent = 0
    this.fontSize = 0
    this.fontWeight = ''
    this.tableName = ''
    this.className = ''
  }
}
