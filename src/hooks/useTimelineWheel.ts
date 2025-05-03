import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { MotionPathPlugin } from "gsap/MotionPathPlugin";
import { RefObject } from "react";
gsap.registerPlugin(MotionPathPlugin);

interface UseTimelineWheelProps {
	itemsRef: RefObject<(HTMLDivElement | null)[]>;
	wrapperRef: RefObject<HTMLDivElement | null>;
	svgRef: RefObject<SVGSVGElement | null>;
	activeItem: number;
}

export function useTimelineWheel({
	itemsRef,
	wrapperRef,
	svgRef,
	activeItem,
}: UseTimelineWheelProps) {
	const circlePathRef = useRef<SVGPathElement | null>(null);
	const tlRef = useRef<gsap.core.Timeline | null>(null);
	const trackerRef = useRef<{ item: number }>({ item: 0 });

	useEffect(() => {
		const svg = svgRef.current;
		const wrapper = wrapperRef.current;
		const items = itemsRef.current.filter(Boolean) as HTMLDivElement[];
		if (!svg || !wrapper || !items.length) return;

		const [circlePath] = MotionPathPlugin.convertToPath("#holder", false);
		circlePath.id = "circlePath";
		circlePath.style.display = "none"; // скрываем путь
		circlePathRef.current = circlePath;
		svg.prepend(circlePath);

		const numItems = items.length;
		const itemStep = 1 / numItems;
		const wrapProg = gsap.utils.wrap(0, 1);
		const snapProg = gsap.utils.snap(itemStep);
		const wrapIdx = gsap.utils.wrap(0, numItems);

		gsap.set(items, {
			motionPath: {
				path: circlePath,
				align: circlePath,
				autoRotate: false,
				alignOrigin: [0.5, 0.5],
				end: (i) => wrapProg(i / numItems - 1 / numItems),
			},
			rotation: 0,
		});

		const tl = gsap.timeline({ paused: true });
		tl.to(
			wrapper,
			{
				rotation: 360,
				transformOrigin: "center center",
				duration: 1,
				ease: "none",
			},
			0
		)
			.to(items, { rotation: -360, duration: 1, ease: "none" }, 0)
			.to(
				trackerRef.current,
				{
					item: numItems,
					duration: 1,
					ease: "none",
					modifiers: {
						item: (v) => wrapIdx(numItems - Math.round(v)),
					},
				},
				0
			);
		tlRef.current = tl;

		const updateActive = (index: number) => {
			items.forEach((el) =>
				el.classList.remove("timeline__point--active")
			);
			items[index]?.classList.add("timeline__point--active");
		};

		const rotateTo = (targetIndex: number) => {
			const tl = tlRef.current!;
			const items = itemsRef.current.filter(
				Boolean
			) as HTMLDivElement[];
			const numItems = items.length;
			const itemStep = 1 / numItems;

			const currentProg = tl.progress();
			const currentIdx =
				Math.round((1 - currentProg) / itemStep) % numItems;

			const rawDiff = targetIndex - currentIdx;
			const half = Math.floor(numItems / 2);
			let steps = rawDiff;

			// кратчайший путь по кругу
			if (Math.abs(rawDiff) > half) {
				if (rawDiff > 0) {
					steps = rawDiff - numItems;
				} else {
					steps = rawDiff + numItems;
				}
			}

			const nextProg = gsap.utils.wrap(
				0,
				1
			)(currentProg - steps * itemStep);

			gsap.to(tl, {
				progress: nextProg,
				duration: 0.5,
				ease: "power2.inOut",
				onStart: () => {
					trackerRef.current.item = targetIndex;
				},
				onUpdate: () => {
					tl.pause();
					tl.progress(
						gsap.getProperty(tl, "progress") as number
					);
				},
				onComplete: () => {
					updateActive(targetIndex);
				},
			});
		};

		const onClick = (e: MouseEvent) => {
			const itemEl = (e.target as HTMLElement).closest(
				".timeline__point"
			) as HTMLDivElement;
			if (!itemEl) return;
			const idx = itemsRef.current.indexOf(itemEl);
			if (idx >= 0) rotateTo(idx);
		};

		wrapper.addEventListener("click", onClick);
		return () => {
			wrapper.removeEventListener("click", onClick);
			tl.kill();
			circlePath.remove();
		};
	}, []);

	useEffect(() => {
		const items = itemsRef.current.filter(Boolean) as HTMLDivElement[];
		const idx = activeItem - 1;
		if (items[idx]) items[idx].click();
	}, [activeItem]);
}
