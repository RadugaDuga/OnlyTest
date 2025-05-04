import TimelinePoint from "./components/TimelinePoint";
import TimelineMinipoints from "./components/TimelineMinipoints";

import React, { useState, useRef } from "react";
import { useTimelineWheel } from "./hooks/useTimelineWheel";
import { useAnimatedDates } from "./hooks/useAnimatedDates";
import { TimelineCircle } from "./assets/icons";
import { menuItems, slidesData } from "./mock";

import TimelineSwiper from "./components/TimelineSwiper";
import TimelineControls from "./components/TimelineControls";
import TimelineGrid from "./components/TimelineGrid";
import TimelineDates from "./components/TimelineDates";

import "./styles/App.scss";

const App: React.FC = () => {
	const [activeItem, setActiveItem] = useState<number>(1);

	const theme = slidesData[activeItem - 1].theme;
	const { dateFrom, dateTo, dateFromRef, dateToRef } =
		useAnimatedDates(activeItem);

	const wrapperRef = useRef<HTMLDivElement>(null);
	const svgRef = useRef<SVGSVGElement>(null);
	const itemsRef = useRef<(HTMLDivElement | null)[]>([]);

	useTimelineWheel({
		itemsRef,
		wrapperRef,
		svgRef,
	});

	return (
		<div className="timeline__grid">
			<div className="timeline__wrapper" ref={wrapperRef}>
				{menuItems.map((item, index) => (
					<TimelinePoint
						key={item.id}
						number={item.id}
						title={item.title}
						isActive={activeItem === item.id}
						onClick={() => setActiveItem(item.id)}
						ref={(el) => {
							if (el) itemsRef.current[index] = el;
						}}
					/>
				))}
				<TimelineCircle ref={svgRef} />
			</div>

			<div className="timeline__theme">{theme}</div>

			<div className="timeline__title">
				Исторические <br />
				даты
			</div>

			<TimelineGrid />

			<TimelineMinipoints
				activeItem={activeItem}
				totalItems={menuItems.length}
				setActiveItem={setActiveItem}
			/>

			<TimelineDates
				dateFrom={dateFrom}
				dateTo={dateTo}
				dateFromRef={dateFromRef}
				dateToRef={dateToRef}
			/>

			<TimelineControls
				activeItem={activeItem}
				totalItems={menuItems.length}
				setActiveItem={setActiveItem}
			/>

			<TimelineSwiper
				keyNum={activeItem}
				slides={slidesData[activeItem - 1].content}
			/>
		</div>
	);
};

export default App;
