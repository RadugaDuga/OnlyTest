import React, { forwardRef } from "react";
import "./TimelinePoint.scss";

interface TimelinePointProps {
    title: string;
    number: number | string;
    isActive: boolean;
    onClick: () => void;
}

const TimelinePoint = forwardRef<HTMLDivElement, TimelinePointProps>(({ title, number, isActive, onClick }, ref) => {
    return (
        <div
            className={`timeline__point${isActive ? " timeline__point--active" : ""}`}
            onClick={onClick}
            ref={ref}
        >
            <div className="timeline__point-content">{number}</div>
            <div className="timeline__point-title">{title}</div>
        </div>
    );
});

export default TimelinePoint;
