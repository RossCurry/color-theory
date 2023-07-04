const colorTheories = ['monochromatic', 'analogous', 'complementary', 'triadic', 'splitComplementary', 'tetradic', 'square']
const colorMatrixEl = document.getElementById("colorMatrix")
const colorTheoryEl = document.getElementById("colorTheory")

class Color {
  constructor() {
    this.hue = 0
    this.sat = 0
    this.value = 0
    this.color = `hsl(${this.hue}, ${this.sat}%, ${this.light}%)`
  }
}

class ColorTheory {
  constructor(hue) {
    this.hue = hue
    this.saturation = 50
    this.light = 50
    this.monochromatic = this.hue
    this.analogous = this.getAnalogous()
    this.complementary = this.getComplementary()
    this.triadic = this.getTriadic()
    this.splitComplementary = this.getSplitComplementary()
    this.tetradic = this.getTetradic()
    this.square = this.getSquare()
    this.htmlElement = document.createElement("div");
    this.htmlElement.classList.add("color")
    this.htmlElement.addEventListener("mouseover", () => modifyColorStrips(this))
    this.htmlElement.addEventListener("touchstart", () => modifyColorStrips(this))
    this.color = `hsl(${this.hue}, ${this.saturation}%, ${this.light}%)`
   }
    setPrimary(primary){
    }
    getAnalogous(){
      const analogousLeft = this.hue - 30 < 360 ? this.hue - 30 + 360 : this.hue - 30
      const analogousRight = this.hue + 30 > 360 ? this.hue + 30 - 360 : this.hue + 30
      const analogous = [analogousLeft, this.hue, analogousRight]
      this.analogous = analogous
      return analogous
      // this.color = `hsl(${this.analogous}, ${this.saturation}%, ${this.light}%)`
      // this.htmlElement.style.backgroundColor = this.color
    }
    getComplementary(){
      return [this.hue + 180 > 360 ? this.hue + 180 - 360 : this.hue + 180]
    }
    getTriadic(){
      const triadicLeft = this.hue - 120 < 360 ? this.hue - 120 + 360 : this.hue - 120
      const triadicRight = this.hue + 120 > 360 ? this.hue + 120 - 360 : this.hue + 120
      const triadic = [triadicLeft, this.hue, triadicRight]
      this.triadic = triadic
      return triadic
    }
    getSplitComplementary(){
      const splitComplementaryLeft = this.hue + 130 > 360 ? this.hue + 130 + 360 : this.hue + 130
      const splitComplementaryRight = this.hue - 210 < 360 ? this.hue - 210 - 360 : this.hue - 210
      const splitComplementary = [splitComplementaryLeft, this.hue, splitComplementaryRight]
      this.splitComplementary = splitComplementary
      return splitComplementary
    }
    getTetradic(){
      const tetradic1 = this.hue
      const tetradic1Complementary = tetradic1 + 180 > 360 ? tetradic1 + 180 - 360 : tetradic1 + 180
      const tetradic2 = this.hue + 30 > 360 ? this.hue + 30 - 360 : this.hue + 30
      const tetradic2Complementary = tetradic2 + 180 > 360 ? tetradic2 + 180 - 360 : tetradic2 + 180
      const tetradic = [tetradic1, tetradic1Complementary, tetradic2, tetradic2Complementary]
      this.tetradic = tetradic
      return tetradic
    }
    getSquare(){
      const square1 = this.hue
      const square2 = square1 + 90 > 360 ? square1 + 90 - 360 : square1 + 90
      const square3 = square2 + 90 > 360 ? square2 + 90 - 360 : square2 + 90
      const square4 = square3 + 90 > 360 ? square3 + 90 - 360 : square3 + 90
      const square = [square1, square2, square3, square4]
      this.square = square
      return square
    }
}

// make colors
const colors = Array.from({ length: 360 }, (_, i) => {
  return new ColorTheory(i)
})

// draw colors
for (const color of colors) {
  const { hue, saturation, light } = color
  color.htmlElement.style.backgroundColor = `hsl(${hue}, ${saturation}%, ${light}%)`
  colorMatrixEl.appendChild(color.htmlElement)
}

// model: colors[], name
// function addColorStrip(htmlElement, model) {
//   const colorStrip = document.createElement('div')
//   colorStrip.classList.add('colorStrip')
//   colorStrip.textContent = 'colorStrip'
//   /**
//    * each strip will have to be divided according to the theory model
//    */
//   const colorDivs = model.colors.map(color => {
//     const colorDiv = document.createElement('div')
//     colorDivs.classList.add('colorDiv')
//     colorDiv.style.width = `${100/model.colors.length}%`
//     colorDiv.style.backgroundColor = getHslFromHue(color)
//     return colorDiv
//   })
//   for (const div of colorDivs){
//     colorStrip.appendChild(div)
//   }
//   htmlElement.appendChild(colorStrip)
// }

function getHslFromHue(hue) {
  return `hsl(${hue}, 50%, 50%)`
}

function makeColorModel(colors, name){
  return { name, colors }
}

function initColorStrips() {
  for (const [i, theory] of colorTheories.entries()){
    const colorStrip = document.createElement('div')
    colorStrip.id = theory
    colorStrip.classList.add('colorStrip')
    colorStrip.textContent = 'colorStrip' + i
    colorTheoryEl.appendChild(colorStrip)
  }
}
initColorStrips()

/**
 * 
 * @param {ColorTheory} colorClass 
 */
function modifyColorStrips(colorClass) {
  console.log('colorClass', colorClass)
  const colorTheoryEl = document.getElementById('colorTheory')
  if (!colorTheoryEl) throw new Error("No colorTheoryEl")
  const strips = colorTheoryEl.getElementsByClassName('colorStrip')
  for (const strip of strips){
    // remove previous divs
    const elsToRemove = strip.getElementsByClassName('colorDiv')
    Array.from(elsToRemove).forEach(el => el.remove())
    // add new divs
    strip.textContent = strip.id
    const theoryName = strip.id
    console.log('theoryName', theoryName)
    const theoryColors =  colorClass[theoryName]
    console.log('theoryColors', theoryColors)
    /**
      * each strip will have to be divided according to the theory model
     */
    const asArray = castArray(theoryColors)
    const colorDivs = asArray.map(theoryColor => {
      const colorDiv = document.createElement('div')
      colorDiv.classList.add('colorDiv')
      colorDiv.style.width = `${100/asArray.length}%`
      colorDiv.style.backgroundColor = getHslFromHue(theoryColor)
      return colorDiv
    })
    for (const colorDiv of colorDivs){
      strip.appendChild(colorDiv)
    }
  }
}

function castArray(possibleArray) {
  return Array.isArray(possibleArray) ? possibleArray : [possibleArray]
}