import Head from 'next/head';
import {useState} from "react";

const Home = () => {


    const [userInput,setUserInput] = useState()

    const [apiOutput, setApiOutput] = useState('')
    const [isGenerating, setIsGenerating] = useState(false)

    const callGenerateEndpoint = async () => {
        setIsGenerating(true);

        console.log("Calling OpenAI...")
        const response = await fetch('/api/generate', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ userInput }),
        });

        const data = await response.json();
        const { output } = data;
        console.log("OpenAI replied...", output.text)

        setApiOutput(`${output.text}`);
        setIsGenerating(false);
    }

    const userHandler = (event) =>{
        setUserInput(event.currentTarget.value)
    }

  return (
    <div className="root">
      <Head>
        <title>GPT-3 Writer</title>
      </Head>
      <div className="container">
        <div className="header">
          <div className="header-title">
            <h1>Generate a tweet thread about crypto</h1>
          </div>
          <div className="header-subtitle">
            <h2>Write a quick sentence about what you want the tweet thread to be about (ex. Ethereum and it’s price, Solana and it’s transaction speed, Bitcoin and it’s longevity).</h2>
          </div>
        </div>
          <div className="prompt-container">
              <textarea placeholder="start typing here"
                        className="prompt-box"
                        value={userInput}
                        onChange={userHandler}
              />
              <div className="prompt-buttons">
                  <a className="generate-button" onClick={callGenerateEndpoint}>
                      <div className="generate">
                          {isGenerating ? <span className="loader"></span> : <p>Generate</p>}
                      </div>
                  </a>
              </div>
              {apiOutput && (
                  <div className="output">
                      <div className="output-header-container">
                          <div className="output-header">
                              <h3>Output</h3>
                          </div>
                      </div>
                      <div className="output-content">
                          <p>{apiOutput}</p>
                      </div>
                  </div>
              )}
          </div>
      </div>
    </div>
  );
};

export default Home;
