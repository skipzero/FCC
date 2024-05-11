import { useState, useEffect } from 'react'
import Display from './components/display'
import padObj from './components/assets'
import './App.css'

function App() {
  const [activeKey, setActiveKey] = useState('')
  const padKeys = Object.keys(padObj)

  useEffect(() => {
    document.addEventListener('keydown', (e) => {
      playClip(e.key.toUpperCase())
    })
  }, []);

  const playClip = (trigger) => {
    console.log('trigger', trigger)
    const audio = document.getElementById(trigger)
    audio.play()
    setActiveKey(trigger)
  }

  return (
    <>
      <div id="drum-machine">
        <div id="pad-wrapper" >
          { padKeys.map(pad => { 
            pad = padObj[ pad ]
            console.log(pad, padKeys)
            return <div key={ ` ${pad.id}-${pad.src.name}` } className="drum-pad" onClick={ () => playClip(pad.id) } id={ pad.src.name }>
              { pad.id }

              <audio src={ `https://s3.amazonaws.com/freecodecamp/drums/${pad.src.file}` } className="clip" id={ pad.id }></audio>
            </div>
          }) }
        </div>
        <Display pad={ activeKey } obj={ padObj } />
      </div >
    </>
  )
}

export default App 
