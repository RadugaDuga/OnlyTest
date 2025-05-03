import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import { ChevronLeft, ChevronRight } from "../../assets/icons";
import "./TimelineSwiper.scss";

interface Slide {
	title: string;
	content?: string;
}

interface TimelineSwiperProps {
	slides: Slide[];
	keyNum: number;
}

const TimelineSwiper: React.FC<TimelineSwiperProps> = ({ slides, keyNum }) => {
	return (
		<>
			<div className="timeline__swiper-separator"></div>
			<div className="timeline__swiper">
				<button className="timeline__swiper-btn timeline__swiper-btn--prev">
					<ChevronLeft />
				</button>
				<button className="timeline__swiper-btn timeline__swiper-btn--next">
					<ChevronRight />
				</button>

				<Swiper
					modules={[Navigation]}
					key={keyNum}
					navigation={{
						prevEl: ".timeline__swiper-btn--prev",
						nextEl: ".timeline__swiper-btn--next",
					}}
					spaceBetween={"5%"}
					slidesPerView={4}
					breakpoints={{
						320: {
							slidesPerView: 1.5,
							spaceBetween: 30,
						},
						700: {
							slidesPerView: 3,
							spaceBetween: 50,
						},
						1025: {
							slidesPerView: 4,
							spaceBetween: 70,
						},
					}}
					pagination={{ clickable: true }}
					scrollbar={{ draggable: true }}
				>
					{slides.map((slide) => (
						<SwiperSlide key={slide.content}>
							<div className="timeline__swiper-slide-inner">
								<h1>{slide.title}</h1>
								<p>{slide.content}</p>
							</div>
						</SwiperSlide>
					))}
				</Swiper>
			</div>
		</>
	);
};

export default TimelineSwiper;
