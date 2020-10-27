import React, { useState} from 'react'

const App = () => {

    const [name,setName] = useState('')

    return (
        <div>
            <input
                className="paint-name" 
                value={name}
                onChange={ e => setName(e.target.value)}
                placeholder="Untitled"
            />
        </div>
    )
}

export default App