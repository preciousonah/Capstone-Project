import "./Banner.css";

export default function Banner({ text, imgSrc, cursorStyle, fontSize }) {
	return (
		<article
			className="backdrop-container"
			style={{
				cursor: cursorStyle ? cursorStyle : "default",
				fontSize: fontSize ? fontSize : "80px",
			}}
		>
			<img src={imgSrc} />
			<h1>{text}</h1>
		</article>
	);
}
