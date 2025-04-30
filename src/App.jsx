// Импортируем необходимые хуки и библиотеки
import { useEffect } from "react";
// Импортируем основную библиотеку GSAP для анимации
import { gsap } from "gsap";
// Импортируем плагин для работы с путями движения
import { MotionPathPlugin } from "gsap/MotionPathPlugin";
// Импортируем стили
import "./App.css";

// Регистрируем плагин MotionPath для использования в GSAP
gsap.registerPlugin(MotionPathPlugin);

function App() {
	// Используем хук useEffect для выполнения кода после монтирования компонента
	useEffect(() => {
		// Повторно регистрируем плагин внутри эффекта
		gsap.registerPlugin(MotionPathPlugin);

		// Конвертируем элемент #holder в SVG-путь
		const circlePath = MotionPathPlugin.convertToPath(
			"#holder",
			false
		)[0];
		// Устанавливаем ID для созданного пути
		circlePath.id = "circlePath";
		// Добавляем путь в начало SVG элемента
		document.querySelector("svg").prepend(circlePath);

		// Получаем все элементы карусели и создаем необходимые переменные
		let items = gsap.utils.toArray(".item"),
			// Получаем общее количество элементов
			numItems = items.length,
			// Вычисляем шаг для каждого элемента
			itemStep = 1 / numItems,
			// Функция для циклического перемещения по прогрессу
			wrapProgress = gsap.utils.wrap(0, 1),
			// Функция для привязки к ближайшему шагу
			snap = gsap.utils.snap(itemStep),
			// Функция для циклического перебора элементов
			wrapTracker = gsap.utils.wrap(0, numItems),
			// Создаем объект для отслеживания текущего активного элемента
			tracker = { item: 0 };

		// Устанавливаем начальные позиции и свойства для всех элементов карусели

		gsap.set(items, {
			motionPath: {
				path: circlePath,
				align: circlePath,
				autoRotate: false,
				alignOrigin: [0.5, 0.5],
				end: (i) =>
					gsap.utils.wrap(
						0,
						1,
						i / items.length - 100 / items.length / 100
					),
			},
			rotation: 0,
		});

		// Создаем временную шкалу анимации
		const tl = gsap.timeline({ paused: true, reversed: true });

		// Добавляем анимацию вращения для обертки
		tl.to(".wrapper", {
			rotation: 360,
			transformOrigin: "center center",
			duration: 1,
			ease: "none",
		});

		// Добавляем анимацию выравнивания контента
		tl.to(items, { duration: 1, ease: "none" }, 0);

		// Анимация для отслеживания активного элемента
		tl.to(
			tracker,
			{
				item: numItems,
				duration: 1,
				ease: "none",
				modifiers: {
					item: (value) =>
						wrapTracker(numItems - Math.round(value)),
				},
			},
			0
		);

		// Функция для перемещения карусели
		function moveWheel(amount, i, index) {
			let progress = tl.progress();
			tl.progress(wrapProgress(snap(tl.progress() + amount)));
			let next = tracker.item;
			tl.progress(progress);

			// Обновляем активный элемент
			document
				.querySelector(".item.active")
				.classList.remove("active");
			items[next].classList.add("active");

			// Анимируем перемещение
			gsap.to(tl, {
				progress: snap(tl.progress() + amount),
				modifiers: {
					progress: wrapProgress,
				},
			});
		}

		// Добавляем обработчики клика для каждого элемента
		items.forEach(function (el, i) {
			el.addEventListener("click", function () {
				var current = tracker.item,
					activeItem = i;

				if (i === current) {
					return;
				}

				// Обновляем классы активного элемента
				document
					.querySelector(".item.active")
					.classList.remove("active");
				items[activeItem].classList.add("active");

				// Вычисляем кратчайший путь для поворота
				var diff = current - i;

				if (Math.abs(diff) < numItems / 2) {
					moveWheel(diff * itemStep);
				} else {
					var amt = numItems - Math.abs(diff);

					if (current > i) {
						moveWheel(amt * -itemStep);
					} else {
						moveWheel(amt * itemStep);
					}
				}
			});
		});

		// Добавляем обработчики для кнопок навигации
		document
			.getElementById("next")
			.addEventListener("click", function () {
				return moveWheel(-itemStep);
			});

		document
			.getElementById("prev")
			.addEventListener("click", function () {
				return moveWheel(itemStep);
			});

		// Функция очистки при размонтировании компонента
		return () => {
			// Удаляем все слушатели событий
			items.forEach((el, i) => {
				el.replaceWith(el.cloneNode(true));
			});
			document
				.getElementById("next")
				?.replaceWith(
					document.getElementById("next")?.cloneNode(true)
				);
			document
				.getElementById("prev")
				?.replaceWith(
					document.getElementById("prev")?.cloneNode(true)
				);
		};
	}, []);

	// Возвращаем JSX разметку компонента
	return (
		<>
			{/* Контейнер для карусели */}
			<div className="container">
				{/* Обертка для вращающихся элементов */}
				<div className="wrapper">
					{/* Элементы карусели */}
					<div className="item 1 active">
						<div className="content">1</div>
					</div>
					<div className="item 2">
						<div className="content">2</div>
					</div>
					<div className="item 3">
						<div className="content">3</div>
					</div>
					<div className="item 4">
						<div className="content">4</div>
					</div>
					<div className="item 5">
						<div className="content">5</div>
					</div>
					<div className="item 6">
						<div className="content">6</div>
					</div>
					{/* SVG элемент с путем для движения */}
					<svg viewBox="0 0 400 400">
						<circle
							id="holder"
							className="st0"
							cx="200"
							cy="200"
							r="199"
						/>
					</svg>
				</div>
			</div>
			{/* Контейнер с кнопками навигации */}
			<div className="container" style={{ textAlign: "center" }}>
				<button id="prev">Prev</button>
				<button id="next">Next</button>
			</div>
		</>
	);
}

// Экспортируем компонент
export default App;
