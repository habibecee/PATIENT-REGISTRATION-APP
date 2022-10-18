import React from "react";
import LoadingGif from "../ASSETS/IMAGES/Loading.gif";

const Loading = (props) => {
	return (
		<div>
			<img
				alt=""
				src={LoadingGif}
				style={{
					width: "400px",
					height: "400px",
					display: "flex",
					flexDirection: "column",
					alignItems: "center",
					justifyContent: "center",
					marginLeft: "35%",
				}}
			/>
		</div>
	);
};

export default Loading;
