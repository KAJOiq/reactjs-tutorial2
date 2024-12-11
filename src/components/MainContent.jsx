import { useState, useEffect } from "react"

export default function MainContent() {
    const [meme, setMeme] = useState({
        topText: "One does not simply",
        bottomText: "Walk into Mordor",
        imageUrl: "http://i.imgflip.com/1bij.jpg"
    })
    
    /**
     * Challenge:
     * Get an array of memes from the imgflip API as soon as
     * this component renders for the first time.
     * Check the imgflip documentation for the correct URL.
     * Save the array of memes (not the whole response
     * data) to state. (For this app, we'll randomly choose
     * one of the memes from this array when the user clicks
     * the "Get a new meme image" button, but we'll do that in
     * a separate challenge.)
     * 
     * Hint: for now, don't try to use an async/await function.
     * Instead, use `.then()` to resolve the promises
     * from using `fetch`. We'll learn why after this challenge.
     * https://imgflip.com/api 
     */
    const [allMeme, setAllMeme] = useState([])

    useEffect(() => {
        const fetchMemes = async () => {
            const res = await fetch("https://api.imgflip.com/get_memes");
            const data = await res.json();
            setAllMeme(data.data.memes); 
        };

        fetchMemes();
    });

    function getNewMeme() {
        const randomMeme = allMeme[Math.floor(Math.random() * allMeme.length)];
        setMeme({
            ...meme,
            imageUrl: randomMeme.url,
        });
    }

    function handleChange(event) {
        const {value, name} = event.currentTarget
        setMeme(prevMeme => ({
            ...prevMeme,
            [name]: value
        }))
    }
/* 
    function handleChange2(event) {
        const {value} = event.currentTarget
        setMeme(prevMeme => ({
            ...prevMeme,
            bottomText: value
        }))
     */
    return (
        <main>
            <div className="form">
                <label>Top Text
                    <input
                        type="text"
                        placeholder="One does not simply"
                        name="topText"
                        onChange={handleChange}
                        value={meme.topText}
                    />
                </label>

                <label>Bottom Text
                    <input
                        type="text"
                        placeholder="Walk into Mordor"
                        name="bottomText"
                        onChange={handleChange}
                        value={meme.bottomTextText}


                    />
                </label>
                <button onClick={getNewMeme}>Get a new meme image 🖼</button>
            </div>
            <div className="meme">
                <img src={meme.imageUrl} />
                <span className="top">{meme.topText}</span>
                <span className="bottom">{meme.bottomText}</span>
            </div>
        </main>
    )
}