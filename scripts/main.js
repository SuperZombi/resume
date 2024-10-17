initTheme()
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


function initTheme(){
	function changeTheme(theme){
		document.documentElement.setAttribute("theme", theme);
	}
	if (['#dark', '#light'].includes(window.location.hash)){
		if (window.location.hash == "#dark"){
			changeTheme("dark")
		}
		else if (window.location.hash == "#light") {
			changeTheme("light")
		}
	}
	else {
		if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
			changeTheme("dark")
		}
		window.matchMedia("(prefers-color-scheme: dark)").onchange = event=>{
			event.matches ? changeTheme("dark") : changeTheme("light")
		}
	}
	window.addEventListener('hashchange', event=>{
		initTheme()
	});
}


function smoothScroll(targetPosition){
	return new Promise((resolve, _) => {
		const scrollHandler = () => {
			if (Math.round(window.scrollY) == targetPosition) {
				document.removeEventListener("scroll", scrollHandler);
				resolve();
			}
		};
		if (window.scrollY == targetPosition) {
			resolve();
		} else {
			document.addEventListener("scroll", scrollHandler);
			window.scrollTo(0, targetPosition)
		}
	});
}
async function animatedScroll(){
	if (window.scrollY > 0){}
	else{
		document.documentElement.classList.add("scroll-disabled")
		await smoothScroll(50)
		await smoothScroll(0)
		document.documentElement.classList.remove("scroll-disabled")
	}
}
