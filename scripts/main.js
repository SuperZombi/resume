window.onload = _=> {
	document.querySelectorAll("[anim]").forEach(el=>{
		new Animate(el)
	})
	document.querySelectorAll(".badge").forEach(el=>{
		asLink(el)
	})
	setTimeout(()=>{
		animatedScroll()
	}, 3000)
}

class Animate {
	constructor(el){
		let anim_name = el.getAttribute("anim")
		const observer = new IntersectionObserver(entries => {
			entries.forEach(entry => {
				if (entry.isIntersecting) {
					el.style.animation = `0.5s ${anim_name}`
					return;
				}
				el.style.animation = "";
			});
		});
		observer.observe(el);
	}
}

function asLink(element){
	element.href = `https://www.google.com/search?q=${element.innerText}`
	element.target = "_blank"
}


function smoothScroll(element, targetPosition){
	return new Promise((resolve, _) => {
		const scrollHandler = () => {
			if (Math.round(element.scrollTop) == targetPosition) {
				element.removeEventListener("scroll", scrollHandler);
				resolve();
			}
		};
		if (element.scrollTop == targetPosition) {
			resolve();
		} else {
			element.addEventListener("scroll", scrollHandler);
			element.scrollTo(0, targetPosition)
		}
	});
}
async function animatedScroll(){
	let container = document.querySelector(".cards")
	if (container.scrollTop > 0){}
	else{
		container.classList.add("scroll-disabled")
		await smoothScroll(container, 50)
		await smoothScroll(container, 0)
		container.classList.remove("scroll-disabled")
	}
}
