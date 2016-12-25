import React from 'react'
import ReactDOM from 'react-dom'

class Pixels2Text extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      source: 'example/image.png',
      width: 58,
      height: 85,
      imageString: 'Loading...',
      imageStringColor: [['rgba(0,0,0,1)']]
    }
  }

  componentDidMount () {
    let shades = [' ', '░', '▒', '▓', '█']
    let range = 255 / shades.length

    let img = document.getElementById('source')
    img.onload = () => {
      let canvas = document.getElementById('target')
      canvas.width = img.width
      canvas.height = img.height

      let ctx = canvas.getContext('2d')
      ctx.drawImage(img, 0, 0)

      let pixels = []
      let pixelsColor = []
      for (let y = 0; y < canvas.height; y++) {
        let line = []
        let lineColor = []
        for (let x = 0; x < canvas.width; x++) {
          let point = ctx.getImageData(x, y, 1, 1)
          let pixel = Math.ceil((point.data[0] + point.data[1] + point.data[2]) / 3)

          let shade
          if (pixel >= (range * 4)) {
            shade = shades[0]
          } else if (pixel >= (range * 3)) {
            shade = shades[1]
          } else if (pixel >= (range * 2)) {
            shade = shades[2]
          } else if (pixel >= (range * 1)) {
            shade = shades[3]
          } else {
            shade = shades[4]
          }
          let shadeColor = 'rgba(' + point.data[0] + ', ' + point.data[1] + ', ' + point.data[2] + ', ' + point.data[3] + ')'

          line.push(shade)
          lineColor.push(shadeColor)
        }
        pixels.push(line.join('') + '\n')
        pixelsColor.push(lineColor)
      }

      let result = document.getElementById('result')
      result.style.width = img.width + 'px'
      result.style.height = img.height + 'px'

      let resultColor = document.getElementById('resultColor')
      resultColor.style.width = img.width + 'px'
      resultColor.style.height = img.height + 'px'

      this.setState({
        imageString: pixels.join(''),
        imageStringColor: pixelsColor
      })
    }
  }

  render () {
    return (
      <div>
        <div className='float'>
          <h5>Original Image:</h5>
          <img
            id='source'
            src={this.state.source}
            style={{
              width: this.state.width,
              height: this.state.height}} />
          <canvas id='target' />
        </div>
        <div className='float'>
          <h5>Shaded Blocks:</h5>
          <div id='result'>{this.state.imageString}</div>
        </div>
        <div className='float'>
          <h5>Color Blocks:</h5>
          <div id='resultColor'>
            {this.state.imageStringColor.map((linePrint, linePrintIndex) => {
              return (
                <div key={linePrintIndex}>
                  {linePrint.map((block, blockIndex) => {
                    return (
                      <span
                        key={blockIndex}
                        style={{color: block}}>
                        █
                      </span>
                    )
                  })}
                </div>
              )
            })}
          </div>
        </div>
      </div>
    )
  }
}

ReactDOM.render(<Pixels2Text />, document.getElementById('pixels2text'))
