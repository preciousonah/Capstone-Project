import "./Banner.css"

export default function Banner({ text, imgSrc }) {
  return (
    <article className="backdrop-container">
      <img src={imgSrc}/>
      <h1>{text}</h1>
    </article>
  )
}
