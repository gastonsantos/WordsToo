import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
	faAward,
	faGraduationCap,
	faRibbon,
	faTrophy,
} from "@fortawesome/free-solid-svg-icons";
import {
	faFacebookF,
	faLinkedinIn,
	faPinterestP,
	faTwitter,
} from "@fortawesome/free-brands-svg-icons";
import PropTypes from "prop-types";

const stories = [
	{
		icon: faAward,
		title: "Top Rank On Fiverr",
	},
	{
		icon: faGraduationCap,
		title: "200+ 5 star Review",
	},
	{
		icon: faTrophy,
		title: "Top Rank on Dribbble",
	},
	{
		icon: faRibbon,
		title: "Top Seller on Upwork",
	},
];

const social = [
	{
		icon: faFacebookF,
		link: "#",
	},
	{
		icon: faTwitter,
		link: "#",
	},
	{
		icon: faPinterestP,
		link: "#",
	},
	{
		icon: faLinkedinIn,
		link: "#",
	},
];

const StoryItem = ({ item }) => {
	const { title, icon } = item;
	return (
		<div className="flex items-center justify-center md:justify-start">
			<FontAwesomeIcon icon={icon} className="text-5xl text-blue-600 mr-4" />
			<h6 className="font-bold">{title}</h6>
		</div>
	);
};

StoryItem.propTypes = {
	item: PropTypes.object.isRequired,
};

const Social = ({ item }) => {
	const { link, icon } = item;
	return (
		<li className="inline-block m-2">
			<a
				href={link}
				className="border flex justify-center items-center rounded-full w-9 h-9 transition hover:bg-blue-600 hover:border-blue-600 hover:text-white"
			>
				<FontAwesomeIcon icon={icon} />
			</a>
		</li>
	);
};

Social.propTypes = {
	item: PropTypes.object.isRequired,
};

const ShapeOne = () => (
	<>
		<svg
			className="absolute -top-[10%] -left-[10%] -z-[1] text-gray-50 dark:text-[#1E2735]"
			width="499"
			height="499"
			viewBox="0 0 600 600"
			fill="currentColor"
			xmlns="http://www.w3.org/2000/svg"
		>
			<circle
				cx="249.5"
				cy="249.5"
				r="249.5"
				fill="currentColor"
				fillOpacity="1"
			/>
		</svg>
		<img
			src="https://cdn.easyfrontend.com/pictures/quiz_1.png"
			alt=""
			className="max-w-full h-auto"
		/>
	</>
);

const ShapeTwo = () => (
	<svg
		className="absolute top-[75%] right-[0 -z-[1] text-gray-50 dark:text-[#1E2735]"
		width="134"
		height="133"
		viewBox="0 0 134 133"
		fill="currentColor"
		xmlns="http://www.w3.org/2000/svg"
	>
		<path
			d="M66.9999 133C104.003 133 134 103.227 134 66.5C134 29.773 104.003 0 66.9999 0C29.9968 0 0 29.773 0 66.5C0 103.227 29.9968 133 66.9999 133Z"
			fill="currentColor"
			fillOpacity="1"
		/>
	</svg>
);

const ShapeThree = () => (
	<svg
		className="absolute top-[15%] right-[10%] -z-[1] text-gray-50 dark:text-[#1E2735]"
		width="223"
		height="262"
		viewBox="0 0 223 262"
		fill="currentColor"
		xmlns="http://www.w3.org/2000/svg"
	>
		<path
			d="M212.555 100.254C224.477 169.763 239.522 246.47 170.132 258.373C100.741 270.275 36.3657 251.51 24.443 182C12.5203 112.491 -30.8157 14.839 38.5748 2.93669C107.965 -8.96565 200.632 30.7447 212.555 100.254Z"
			fill="currentColor"
			fillOpacity="0.8"
		/>
	</svg>
);

const ShapeFour = () => (
	<svg
		className="absolute bottom-[22%] right-[15%] -z-[1] text-gray-50 dark:text-[#1E2735]"
		width="155"
		height="166"
		viewBox="0 0 155 166"
		fill="currentColor"
		xmlns="http://www.w3.org/2000/svg"
	>
		<path
			d="M141.003 54.264C153.758 98.3055 169.054 146.771 125.088 159.504C81.1214 172.237 38.1659 164.793 25.4108 120.751C12.6556 76.7097 -22.4405 16.769 21.5258 4.03561C65.4921 -8.69781 128.248 10.2226 141.003 54.264Z"
			fill="currentColor"
			fillOpacity="0.8"
		/>
	</svg>
);

const AboutUs17 = () => {
	return (
		<section className="ezy__about17 light pt-14 md:pt-24 pb-14 lg:pb-0 bg-white dark:bg-[#0b1727] text-zinc-900 dark:text-white relative overflow-hidden z-[1]">
			<ShapeThree />
			<ShapeFour />

			<div className="container px-4">
				<div className="grid grid-cols-12 justify-between">
					<div className="col-span-12 md:col-span-5">
						<div className="relative">
							<ShapeOne />
							<ShapeTwo />
						</div>
					</div>
					<div className="col-span-12 md:col-span-6 md:mr-4">
						<div>
							<h2 className="text-2xl leading-tight font-bold md:text-5xl mt-4">
								Noman Ali Khan's Story
							</h2>
							<p className="text-base sm:text-lg leading-relaxed opacity-80 my-6 lg:pr-12">
								Assumenda non repellendus distinctio nihil dicta sapiente,
								quibusdam maiores, illum at, aliquid blanditiis eligendi
								qui.Assumenda non repellendus distinctio nihil dicta sapiente.
							</p>
							<div className="grid grid-cols-12 gap-8">
								{stories.map((item, i) => (
									<div className="col-span-12 sm:col-span-6" key={i}>
										<StoryItem item={item} />
									</div>
								))}
							</div>
						</div>
						<div className="flex flex-col sm:flex-row mt-12">
							<a
								href="#!"
								className="px-10 py-3 border-2 border-[#0b1727] dark:border-white hover:bg-blue-600 hover:border-blue-600 text-center hover:text-white rounded transition"
							>
								About Me
							</a>
							<div className="flex justify-center md:ml-12 mt-4 sm:mt-0">
								<ul className="flex items-center justify-center sm:justify-end">
									{social.map((item, i) => (
										<Social item={item} key={i} />
									))}
								</ul>
							</div>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
};
