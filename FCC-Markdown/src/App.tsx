import { useState } from 'react'
// import TextInput from './components/TextInput';
import viteLogo from '/vite.svg'
import Markdown from 'react-markdown'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { dark } from 'react-syntax-highlighter/dist/esm/styles/prism';
import './App.css'

function App() {
  const [ text, setText ] = useState<string>(`
# Welcome to my React Markdown Previewer!

## This is a sub-heading...
### And here's some other cool stuff:

Heres some code, \`<div></div>\`, between 2 backticks.

\`\`\`
// this is multi-line code:

function anotherExample(firstLine, lastLine) {
  if (firstLine == '\`\`\`' && lastLine == '\`\`\`') {
    return multiLineCode;
  }
}
\`\`\`

You can also make text **bold**... whoa!
Or _italic_.
Or... wait for it... **_both!_**
And feel free to go crazy ~~crossing stuff out~~.

There's also [links](https://www.freecodecamp.org), and
> Block Quotes!

And if you want to get really crazy, even tables:

Wild Header | Crazy Header | Another Header?
------------ | ------------- | -------------
Your content can | be here, and it | can be here....
And here. | Okay. | I think we get it.

- And of course there are lists.
  - Some are bulleted.
     - With different indentation levels.
        - That look like this.


1. And there are numbered lists too.
1. Use just 1s if you want!
1. And last but not least, let's not forget embedded images:

![vite Logo](viteLogo)`)
  const codeString = '(num) => num + 1';

  return (
    <>
      <div id="wrapper">
        <h3>
          Markdown Previewer
        </h3>
        <div className='row'>
          <textarea name='textInput' id='textInput' value={text} onChange={(e) => setText(e.target.value)}> </textarea>

          <SyntaxHighlighter language="javascript" style={dark}>
            {codeString}
          </SyntaxHighlighter>

          {/* <TextInput updateText={setText} /> */}
          <Markdown >{text}</Markdown>
        </div>
        {viteLogo}
      </div>
    </>
  )
}

export default App
