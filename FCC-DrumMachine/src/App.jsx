import { useState, useEffect } from 'react'
import Display from './components/display'
import padObj from './components/assets'
import './App.css'

function App() {
  const [ padVal, setPadVal ] = useState('')
  const padKeys = Object.keys(padObj)

  const handleClick = (e) => {
    e.preventDefault()
    console.log(e.target)
    const activeId = e.target.innerHTML[ 0 ]
    setPadVal(activeId)
    const activePad = document.getElementById(activeId)
    activePad.play()
  }

  const keyPress = (key) => {
    console.log(key)
  }

  useEffect(() => {
    document.addEventListener('keydown', (e) => {
      keyPress(e.key)
    })
  }, []);

  return (
    <>
      <div id="drum-machine">
        <div id="pad-wrapper" >
          { padKeys.map(pad => { 
            pad = padObj[ pad ]
            console.log(pad, padKeys)
            return <div key={ ` ${pad.id}-${pad.src.name}` } className="drum-pad" onClick={ handleClick } id={ pad.src.name }>
              { pad.id }

              <audio src={ `https://s3.amazonaws.com/freecodecamp/drums/${pad.src.file}` } className="clip" id={ pad.id }></audio>
            </div>
          }) }
        </div>
        <Display pad={ padVal } obj={ padObj } />
      </div >
    </>
  )
}

export default App 
