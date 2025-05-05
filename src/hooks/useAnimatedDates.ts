import { useRef, useState, useEffect } from "react";
import gsap from "gsap";
import { slidesData } from "../mock";

export function useAnimatedDates(activeItem: number) {
	const slides = slidesData[activeItem - 1]?.content || [];
	const parseDate = (slide?: { title: string }) => Number(slide?.title) || 0;

	const [dateFrom, setDateFrom] = useState<number>(() =>
		parseDate(slides[0])
	);
	const [dateTo, setDateTo] = useState<number>(() =>
		parseDate(slides[slides.length - 1])
	);

	const dateFromRef = useRef<HTMLDivElement>(null);
	const dateToRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		if (!slides.length) return;
		const dates = [
			{
				ref: dateFromRef.current,
				current: dateFrom,
				newValue: parseDate(slides[0]),
				setter: setDateFrom,
			},
			{
				ref: dateToRef.current,
				current: dateTo,
				newValue: parseDate(slides[slides.length - 1]),
				setter: setDateTo,
			},
		];
		dates.forEach(({ ref, current, newValue, setter }) => {
			if (ref && newValue !== current) {
				gsap.to(ref, {
					duration: .6,
					innerText: newValue,
					snap: { innerText: 1 },
					ease: "power1.out",
					onComplete: () => setter(newValue),
				});
			}
		});
	}, [activeItem]);

	return { dateFrom, dateTo, dateFromRef, dateToRef };
}
