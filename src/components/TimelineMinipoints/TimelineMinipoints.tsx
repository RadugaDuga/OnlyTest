import React from "react";
import "./TimelineMinipoints.scss";

interface TimelineMinipointsProps {
	activeItem: number;
	totalItems: number;
	setActiveItem: (item: number) => void;
}

const TimelineMinipoints: React.FC<TimelineMinipointsProps> = ({
	activeItem,
	totalItems,
	setActiveItem,
}) => (
	<div className="timeline__minipoints">
		{Array.from({ length: totalItems }).map((_, i) => {
			const index = i + 1;
			return (
				<span
					key={index}
					className={
						"timeline__minipoints-point" +
						(activeItem === index
							? " timeline__minipoints-point--active"
							: "")
					}
					onClick={() => setActiveItem(index)}
				></span>
			);
		})}
	</div>
);

export default TimelineMinipoints;
