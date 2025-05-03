import React from "react";
import "./TimelineDates.scss";

interface TimelineDatesProps {
	dateFrom: number;
	dateTo: number;
	dateFromRef: React.RefObject<HTMLDivElement | null>;
	dateToRef: React.RefObject<HTMLDivElement | null>;
}

const TimelineDates: React.FC<TimelineDatesProps> = ({
	dateFrom,
	dateTo,
	dateFromRef,
	dateToRef,
}) => (
	<div className="timeline__dates">
		<div
			className="timeline__date timeline__date--from"
			ref={dateFromRef}
		>
			{dateFrom}
		</div>
		<div className="timeline__date timeline__date--to" ref={dateToRef}>
			{dateTo}
		</div>
	</div>
);

export default TimelineDates;
