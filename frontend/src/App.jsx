import './App.css'

function App() {
  return (
    <main className="eats">
      <h1>c_mai_eats</h1>
      <a className="see-eats" href="#">see my eats</a>
      <p>been to 85 restaurants</p>
      <p>want to try 197 restaurants</p>
      <iframe
        className="short"
        width="315"
        height="560"
        src="https://www.youtube.com/embed/wep3wnAzqXg"
        title="YouTube Short"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        referrerPolicy="strict-origin-when-cross-origin"
        allowFullScreen
      />
    </main>
  )
}

export default App
