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
	if (window.location.search == "?true"){
		let link = document.querySelector("a.corner")
		link.href = link.href + "?true"
		initFooter()
	}
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

function initFooter(){
	document.querySelector(".footer .close").onclick = _=>{
		document.querySelector(".footer").classList.add("hide")
	}
	const scrollHandlerForFooter = () => {
		if (
			(window.innerHeight + window.scrollY) >= (document.body.scrollHeight - 100)
		){
			document.querySelector(".footer").classList.remove("hide")
			document.removeEventListener("scroll", scrollHandlerForFooter);
		}
	}

	let currentTime = Math.floor(Date.now() / 1000);
	let expiresTime = localStorage.getItem('expiresTime');
	if (!expiresTime) {
		expiresTime = currentTime + (60 * 60 * 24)
		localStorage.setItem('expiresTime', expiresTime);
	}

	if (expiresTime > currentTime){
		startTimer(expiresTime, document.querySelector(".footer .timer"))
		document.addEventListener("scroll", scrollHandlerForFooter);
	}

	function startTimer(expirationTime, display) {
		function timeToStr(totalSeconds){
			let hours = Math.floor(totalSeconds / 3600).toString().padStart(2, '0')
			let minutes = Math.floor((totalSeconds % 3600) / 60).toString().padStart(2, '0')
			let seconds = (totalSeconds % 60).toString().padStart(2, '0')
			return `${hours}:${minutes}:${seconds}`
		}

		let interval = setInterval(_=>{
			let currentTime = Math.floor(Date.now() / 1000);
			let remaining = expirationTime - currentTime;
			display.innerHTML = timeToStr(remaining);
			if (remaining <= 0){
				clearInterval(interval)
			}
		}, 1000)
	}
}
