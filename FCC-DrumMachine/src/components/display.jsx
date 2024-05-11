

const Display = ({ obj, pad }) => {
  console.log(pad)
  const activePad = obj[ pad ]
  return (
    <div id="controls">
      <div id="display">
        <div className='centre'>
          { pad ? activePad.src.name : '' }
        </div>
      </div>
    </div>
  )
}

export default Display;