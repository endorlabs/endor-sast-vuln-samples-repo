import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';

// Simulating API responses or user inputs
const getHtmlContent = () => "<p>This is <strong>bold</strong> text</p>";
const getUserInput = () => "<script>alert('XSS');</script>";

const DangerousComponent = ({ html }) => {
    // ruleid: reactjs-dangerouslysetinnerhtml
  return <div dangerouslySetInnerHTML={{ __html: html }} />;
};

function createMarkup(html) {
  return { __html: html };
}

const AnotherDangerousComponent = ({ html }) => {
    // todoruleid: reactjs-dangerouslysetinnerhtml
  return <div dangerouslySetInnerHTML={createMarkup(html)} />;
};

const DynamicDangerousComponent = ({ getHtml }) => {
  const [html, setHtml] = useState('');

  useEffect(() => {
    setHtml(getHtml());
  }, [getHtml]);

  return <div dangerouslySetInnerHTML={{ __html: html }} />;
};

const ConditionalDangerousComponent = ({ condition, html }) => {
  return condition ? (
    // ruleid: reactjs-dangerouslysetinnerhtml
    <div dangerouslySetInnerHTML={{ __html: html }} />
  ) : (
    <div>{html}</div>
  );
};

class ClassBasedDangerousComponent extends React.Component {
  render() {
    return <div dangerouslySetInnerHTML={{ __html: this.props.html }} />;
  }
}

const NestedDangerousComponent = ({ outerHtml, innerHtml }) => {
  return (
    // ruleid: reactjs-dangerouslysetinnerhtml
    <div dangerouslySetInnerHTML={{ __html: outerHtml }}>
    // ruleid: reactjs-dangerouslysetinnerhtml
      <div dangerouslySetInnerHTML={{ __html: innerHtml }} />
    </div>
  );
};

const InlineDangerousComponent = () => {
  const dangerousHtml = "<p>Inline dangerous HTML</p>";
  return <div dangerouslySetInnerHTML={{ __html: dangerousHtml }} />;
};

const App = () => {
  const [userInput, setUserInput] = useState('');

  const handleInputChange = (e) => {
    setUserInput(e.target.value);
  };

  return (
    <div>
      <h1>Dangerous Inner HTML Examples</h1>
      <DangerousComponent html={getHtmlContent()} />
      <AnotherDangerousComponent html={getHtmlContent()} />
      <DynamicDangerousComponent getHtml={getHtmlContent} />
      <ConditionalDangerousComponent condition={true} html={getHtmlContent()} />
      <ClassBasedDangerousComponent html={getHtmlContent()} />
      <NestedDangerousComponent outerHtml="<div>Outer</div>" innerHtml="<p>Inner</p>" />
      <DangerousListComponent items={["<span>Item 1</span>", "<span>Item 2</span>"]} />
      <InlineDangerousComponent />
      
      <div>
        <input type="text" value={userInput} onChange={handleInputChange} />
        <div dangerouslySetInnerHTML={{ __html: userInput }} />
      </div>
      
      <div dangerouslySetInnerHTML={{ __html: getUserInput() }} />
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));