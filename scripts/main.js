window.onload = _=> {
	document.querySelectorAll("[anim]").forEach(el=>{
		new Animate(el)
	})
	document.querySelectorAll(".badge").forEach(el=>{
		asLink(el)
	})
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
