import React from 'react'

function ColorPicker(props) {

    const {colors = [], activeColor, setActiveColor} = props

    if(!colors) return <div>Loading...</div>

    return (
        <div>
            <fieldset className="color-picker">
            {
                colors.map((color,index)=>{
                    // eslint-disable-next-line no-unused-expressions
                    return(
                        <label key={index}>
                            <input 
                                name="color"
                                type="radio"
                                value={color}
                                checked={activeColor === color}
                                onChange = {() => setActiveColor(color)}
                            />
                            <span style={{background:color}} />
                        </label>
                    )
                })
            }
            </fieldset>
        </div>
    )
}

export default ColorPicker
