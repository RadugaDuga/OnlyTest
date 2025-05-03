import React, { forwardRef } from "react";

const TimelineCircle = forwardRef<SVGSVGElement, React.SVGProps<SVGSVGElement>>(
	(props, ref) => (
		<svg
			viewBox="0 0 400 400"
			ref={ref}
			className="timeline__circle-svg"
			{...props}
		>
			<circle
				id="holder"
				className="timeline__circle-path"
				cx="200"
				cy="200"
				r="199"
			/>
		</svg>
	)
);

export default TimelineCircle;
