import "./App.css";
import { useState } from "react";

function App() {
  const [flippedindice, setflippedindice] = useState([]);
  const [element, setelement] = useState([
    { content: "😀", id: 1, flipped: false, matched: false },
    { content: "😆", id: 3, flipped: false, matched: false },
    { content: "🙃", id: 4, flipped: false, matched: false },
    { content: "🤐", id: 5, flipped: false, matched: false },
    { content: "🤠", id: 6, flipped: false, matched: false },
    { content: "😀", id: 1, flipped: false, matched: false },
    { content: "😅", id: 2, flipped: false, matched: false },
    { content: "😆", id: 3, flipped: false, matched: false },
    { content: "😅", id: 2, flipped: false, matched: false },
    { content: "🙃", id: 4, flipped: false, matched: false },
    { content: "🤐", id: 5, flipped: false, matched: false },
    { content: "🤠", id: 6, flipped: false, matched: false },
  ]);

  const handleflipped = (index) => {
    if (flippedindice.length === 2) return;
    const newelement = element.map((item, i) =>
      i === index ? { ...item, flipped: !item.flipped } : item
    );
    setelement(newelement);
    setflippedindice((prev) => [...prev, index]);
  };

  const handllemached = () => {
    setTimeout(() => {
      setelement((prev) => {
        const [firstindex, secondindex] = flippedindice;
        const firstcard = prev[firstindex];
        const secondcard = prev[secondindex];
        let updatedelement = [...prev];

        if (firstcard.content === secondcard.content) {
          updatedelement = updatedelement.map((item, i) =>
            i === firstindex || i === secondindex
              ? { ...item, matched: true, flipped: true }
              : item
          );
        } else {
          updatedelement = updatedelement.map((item, i) =>
            i === firstindex || i === secondindex
              ? { ...item, flipped: false }
              : item
          );
        }
        return updatedelement;
      });
      setflippedindice([]);
    }, 2000);
  };

  if (flippedindice.length === 2) {
    handllemached();
  }
  const playbutton = () => {
    const newelemnt = element
      .map((item) =>
        item.flipped || item.matched
          ? { ...item, flipped: false, matched: false }
          : item
      )
      .sort(() => Math.random() - 0.5);
    setelement(newelemnt);
    setflippedindice([]);
  };
  const allmatched = element.every((item) => item.matched);

  return (
    <>
   
      <body>
      <button id="playagain" onClick={playbutton}>Play Again</button>
        <section>
          {element.map((item, index) => {
            return (
              <div
                key={index}
                onClick={() => handleflipped(index)}
                id={item.matched ? "matched" : ""}
                className="cards"
              >
                {item.flipped || item.matched ? item.content : "?"}
              </div>
            );
          })}
        </section>
      </body>

      <h1 id="you-win">{allmatched ? "you win" : "Waiting..."}</h1>
      
    </>
  );
}

export default App;
