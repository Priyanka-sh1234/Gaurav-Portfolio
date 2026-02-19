import { Parallax, Sticky } from "@animation";
import {
	About,
	Footer,
	Hero,
	Process,
	Project,
	Testimonials,
	Services,
} from "@components";

export default function Home() {
	return (
		<>
			<div className="sm:hidden block mb-2">
				<Sticky />
			</div>
			<div className="px-[20px] md:px-[50px]">
				<Hero />
			</div>
			<div className=" pb-5"><Project/></div>
			<div className="max-w-7xl w-full mx-auto"><Process /></div>
			<Parallax />
			<Testimonials />
			<Services />
			<div className="px-[20px] md:px-[50px]">{<Footer />}</div>
		</>
	);
}
