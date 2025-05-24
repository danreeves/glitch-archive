store Counter {
  state count: Number = 0
  
  fun incr : Promise(Never, Void) {
    next { count = count + 1 }
  }
  
  fun decr : Promise(Never, Void) {
    next { count = count - 1 }
  }
}

component CountInterface {
  connect Counter exposing { count, incr, decr }

  style wrapper {
    display: flex;
    justify-content: center;
    align-items: center;
    & button {
      background: none;
      border: 5px solid MediumSeaGreen;
      color: inherit;
      font: inherit;
      margin: 10px;
    }
  }

  fun render : Html {
    <div::wrapper>
      <button onClick={decr}><{ "Downn" }></button>
      <span><{ Number.toString(count) }></span>
      <button onClick={incr}><{ "Up" }></button>
    </div>
  }
}

component Main {
  style base {
    font-family: sans;
    font-weight: bold;
    font-size: 50px;

    justify-content: center;
    align-items: center;
    display: flex;
    height: 100vh;
    width: 100vw;
    background: MintCream;
    color: MediumSeaGreen;
    flex-direction: column;
  }

  fun render : Html {
    <div::base>
      <div><{ "Hello Mint!" }></div>
      <CountInterface />
    </div>
  }
}