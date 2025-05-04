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

		let debounceTimeout: ReturnType<typeof setTimeout> | null = null;
		let targetIndex = 0;

		function animateToIndex(newIndex: number) {
			const current = tracker.item;
			if (newIndex === current) return;
			const active = document.querySelector(".item.active");
			if (active) active.classList.remove(".item.active");
			items[newIndex].classList.add("active");
			let diff = current - newIndex;
			if (Math.abs(diff) < numItems / 2) {
				gsap.to(tl, {
					progress: snap(tl.progress() + diff * itemStep),
					duration: ANIMATE_TO_INDEX_DURATION,
					modifiers: { progress: wrapProgress },
				});
			} else {
				let amt = numItems - Math.abs(diff);
				if (current > newIndex) {
					gsap.to(tl, {
						progress: snap(tl.progress() + amt * -itemStep),
						duration: ANIMATE_TO_INDEX_DURATION,
						modifiers: { progress: wrapProgress },
					});
				} else {
					gsap.to(tl, {
						progress: snap(tl.progress() + amt * itemStep),
						duration: ANIMATE_TO_INDEX_DURATION,
						modifiers: { progress: wrapProgress },
					});
				}
			}
		}

		function setActiveIndex(newIndex: number) {
			targetIndex = newIndex;
			if (debounceTimeout) clearTimeout(debounceTimeout);
			debounceTimeout = setTimeout(() => {
				animateToIndex(targetIndex);
			}, 250);
		}

		function onWrapperClick(e: MouseEvent) {
			const target = e.target as HTMLElement;
			const itemIndex = items.findIndex(
				(item) => item === target || item.contains(target)
			);
			if (itemIndex !== -1) {
				setActiveIndex(itemIndex);
			}
		}
		wrapper.addEventListener("click", onWrapperClick, { signal });

		const nextBtn = document.getElementById("next");
		const prevBtn = document.getElementById("prev");
		if (nextBtn)
			nextBtn.addEventListener(
				"click",
				() => {
					let next = (targetIndex + 1) % numItems;
					setActiveIndex(next);
				},
				{
					signal,
				}
			);
		if (prevBtn)
			prevBtn.addEventListener(
				"click",
				() => {
					let prev = (targetIndex - 1 + numItems) % numItems;
					setActiveIndex(prev);
				},
				{
					signal,
				}
			);

		return () => {
			if (debounceTimeout) clearTimeout(debounceTimeout);
			abortController.abort();
			circlePath.remove();
		};
	}, [itemsRef, wrapperRef, svgRef]);
}
