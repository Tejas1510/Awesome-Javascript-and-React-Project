import React from 'react'

export default class Canvas extends React.Component {
  constructor(props) {
    super(props)
    this.canvasRef = React.createRef()
    this.handleMouseMove = this.handleMouseMove.bind(this)
    this.handleResize = this.handleResize.bind(this)
    this.startDrawing = this.startDrawing.bind(this)
    this.stopDrawing = this.stopDrawing.bind(this)
    this.state = {
      drawing: false,
      width: window.innerWidth -40,
      height: window.innerHeight -140   
    }
  }
  componentDidMount() {
    this.ctx = this.canvasRef.current.getContext('2d')
    window.addEventListener('resize', this.handleResize);
  }
  componentWillUnmount() {
    window.removeEventListener('resize', this.handleResize)
  }
  handleMouseMove(e) {
    // actual coordinates
    const coords = [
      e.clientX - this.canvasRef.current.offsetLeft,
      e.clientY - this.canvasRef.current.offsetTop
    ]
    if (this.state.drawing) { 
      this.ctx.lineTo(...coords)
      this.ctx.stroke()
    }
    if (this.props.handleMouseMove) {
        this.props.handleMouseMove(...coords)
    }
  }
  handleResize() {
    this.setState({ width: window.innerWidth, height: window.innerHeight })
  }
  startDrawing(e) {
    this.ctx.lineJoin = 'round'
    this.ctx.lineCap = 'round'
    this.ctx.lineWidth = 10
    this.ctx.strokeStyle = this.props.color
    this.ctx.beginPath();
    // actual coordinates
    this.ctx.moveTo(
      e.clientX - this.canvasRef.current.offsetLeft,
      e.clientY - this.canvasRef.current.offsetTop
    )
    this.setState({ drawing: true })
  }
  stopDrawing() {
    this.ctx.closePath()
    this.setState({ drawing: false })
  }
  render() {
    return (
      <React.Fragment>
        <canvas
          ref={this.canvasRef}
          width={this.state.width}
          height={this.state.height}
          onMouseDown={this.startDrawing}
          onMouseUp={this.stopDrawing}
          onMouseOut={this.stopDrawing}
          onMouseMove={this.handleMouseMove}
        />
      </React.Fragment>
    )
  }
}