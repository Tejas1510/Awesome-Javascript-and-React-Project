import React , { useState ,useEffect } from 'react'
import axios from 'axios'
import Name from './components/Name'
import randomColor from 'randomcolor'
import ColorPicker from './components/ColorPicker'
import Canvas from './components/Canvas'

function App() {

    const [colors,setColors] = useState([])
    const [activeColor, setActiveColor] = useState(null)

    const fetchColor = async () => {
        try {
            const randomcolor = randomColor().slice(1)
            const response = await axios.get(`https://www.thecolorapi.com/scheme?hex=${randomcolor}&mode=monochrome`)
            const cd = response.data
            setColors(cd.colors.map(color => color.hex.value))
            setActiveColor(cd.colors[0].hex.value)
            return response

        } catch (error) {
            throw error
        }
    }

    useEffect(()=>{
        fetchColor()
    },[])

    return (
        <div>
            <Name />
            <ColorPicker
                colors={colors}
                activeColor={activeColor}
                setActiveColor={setActiveColor}
            />
            <Canvas className="canvas" color={activeColor}/>
        </div>
    )
}

export default App
