import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { MotionPathPlugin } from "gsap/MotionPathPlugin";
import { ANIMATE_TO_INDEX_DURATION } from "../constants/constants";
gsap.registerPlugin(MotionPathPlugin);

interface UseTimelineWheelProps {
	itemsRef: React.RefObject<(HTMLDivElement | null)[]>;
	wrapperRef: React.RefObject<HTMLDivElement | null>;
	svgRef: React.RefObject<SVGSVGElement | null>;
}

export function useTimelineWheel({
	itemsRef,
	wrapperRef,
	svgRef,
}: UseTimelineWheelProps) {
	useEffect(() => {
		const svg = svgRef.current;
		const wrapper = wrapperRef.current;
		const items = (itemsRef.current || []).filter(
			Boolean
		) as HTMLDivElement[];
		if (!svg || !wrapper || !items.length) return;

		const abortController = new AbortController();
		const { signal } = abortController;

		const circlePath = MotionPathPlugin.convertToPath(
			"#holder",
			false
		)[0];
		circlePath.id = "circlePath";
		svg.prepend(circlePath);

		const numItems = items.length;
		const itemStep = 1 / numItems;
		const wrapProgress = gsap.utils.wrap(0, 1);
		const snap = gsap.utils.snap(itemStep);
		const wrapTracker = gsap.utils.wrap(0, numItems);
		const tracker = { item: 0 };

		gsap.set(items, {
			motionPath: {
				path: circlePath,
				align: circlePath,
				alignOrigin: [0.5, 0.5],
				end: (i: number) => i / numItems - 1 / numItems,
			},
		});

		const tl = gsap.timeline({ paused: true, reversed: true });
		tl.to(wrapper, {
			rotation: 360,
			transformOrigin: "center",
			duration: 1,
			ease: "none",
		});
		tl.to(
			items,
			{
				rotation: "-=360",
				transformOrigin: "center",
				duration: 1,
				ease: "none",
			},
			0
		);
		tl.to(
			tracker,
			{
				item: numItems,
				duration: 1,
				ease: "none",
				modifiers: {
					item(value: number) {
						return wrapTracker(numItems - Math.round(value));
					},
				},
			},
			0
		);

		let debounceTimer: ReturnType<typeof setTimeout> | null = null;
		let selectedIndex = 0;

		function animateToIndex(targetIdx: number) {
			const currentIdx = tracker.item;
			if (targetIdx === currentIdx) return;
			const activeItem = document.querySelector(".item.active");
			if (activeItem) activeItem.classList.remove("active");
			items[targetIdx].classList.add("active");
			let diff = currentIdx - targetIdx;
			if (Math.abs(diff) < numItems / 2) {
				gsap.to(tl, {
					progress: snap(tl.progress() + diff * itemStep),
					duration: ANIMATE_TO_INDEX_DURATION,
					modifiers: { progress: wrapProgress },
				});
			} else {
				let shortestPath = numItems - Math.abs(diff);
				if (currentIdx > targetIdx) {
					gsap.to(tl, {
						progress: snap(tl.progress() + shortestPath * -itemStep),
						duration: ANIMATE_TO_INDEX_DURATION,
						modifiers: { progress: wrapProgress },
					});
				} else {
					gsap.to(tl, {
						progress: snap(tl.progress() + shortestPath * itemStep),
						duration: ANIMATE_TO_INDEX_DURATION,
						modifiers: { progress: wrapProgress },
					});
				}
			}
		}

		function setActiveIndex(newIdx: number) {
			selectedIndex = newIdx;
			if (debounceTimer) clearTimeout(debounceTimer);
			debounceTimer = setTimeout(() => {
				animateToIndex(selectedIndex);
			}, 250);
		}

		function onWrapperClick(e: MouseEvent) {
			const targetElement = e.target as HTMLElement;
			const clickedIndex = items.findIndex(
				(item) => item === targetElement || item.contains(targetElement)
			);
			if (clickedIndex !== -1) {
				setActiveIndex(clickedIndex);
			}
		}
		wrapper.addEventListener("click", onWrapperClick, { signal });

		const nextButton = document.getElementById("next");
		const prevButton = document.getElementById("prev");
		if (nextButton)
			nextButton.addEventListener(
				"click",
				() => {
					let nextIdx = (selectedIndex + 1) % numItems;
					setActiveIndex(nextIdx);
				},
				{
					signal,
				}
			);
		if (prevButton)
			prevButton.addEventListener(
				"click",
				() => {
					let prevIdx = (selectedIndex - 1 + numItems) % numItems;
					setActiveIndex(prevIdx);
				},
				{
					signal,
				}
			);

		return () => {
			if (debounceTimer) clearTimeout(debounceTimer);
			abortController.abort();
			circlePath.remove();
		};
	}, [itemsRef, wrapperRef, svgRef]);
}
