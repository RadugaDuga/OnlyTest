import React from "react";
import { ChevronLeft, ChevronRight } from "../../assets/icons";
import "./TimelineControls.scss";

interface TimelineControlsProps {
	activeItem: number;
	totalItems: number;
	setActiveItem: (item: number) => void;
}

const TimelineControls: React.FC<TimelineControlsProps> = ({
	activeItem,
	totalItems,
	setActiveItem,
}) => {
	const handlePrev = () => {
		setActiveItem(activeItem === 1 ? totalItems : activeItem - 1);
	};
	const handleNext = () => {
		setActiveItem(activeItem === totalItems ? 1 : activeItem + 1);
	};

	return (
		<div className="timeline__controls">
			{String(activeItem).padStart(2, "0")}/
			{String(totalItems).padStart(2, "0")}
			<div className="timeline__controls-buttons">
				<button
					onClick={handlePrev}
					className="timeline__controls-btn timeline__controls-btn--prev"
					id="prev"
				>
					<ChevronLeft />
				</button>
				<button
					className="timeline__controls-btn timeline__controls-btn--next"
					onClick={handleNext}
					id="next"
				>
					<ChevronRight />
				</button>
			</div>
		</div>
	);
};

export default TimelineControls;
