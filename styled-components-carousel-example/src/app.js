import React from 'react';
import ReactDOM from 'react-dom';
import styled, { injectGlobal } from 'styled-components';
import Carousel from './carousel';

// These are some global styles
// the make the page pretty.
injectGlobal`
  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
    font-family: sans-serif;
  }
  html, body {
    padding: 0;
    margin: 0;
    background: lightpink;
    height: 100%;
    width: 100%;
  }
  a {
    text-decoration: none;
    font-weight: bold;
    color: deeppink;
  }
`;

const Page = styled.div`
  width: 80%;
  margin-left: auto;
  margin-right: auto;
  display: flex;
  flex-direction: column;
`;

const Title = styled.h1`
  text-align: center;
  margin-top: 1em;
`;

function App() {
  return (
    <Page>
      <Title>React Carousel</Title>
      <Carousel initialHeight={400} initialWidth={600}>
        <img src="https://unsplash.it/600/400/?image=110" />
        <img src="https://unsplash.it/600/400/?image=220" />
        <img src="https://unsplash.it/600/400/?image=330" />
        <img src="https://unsplash.it/600/400/?image=440" />
        <img src="https://unsplash.it/600/400/?image=550" />
      </Carousel>
    </Page>
  );
}

ReactDOM.render(<App />, document.getElementById('app'));
