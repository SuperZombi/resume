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
initTheme()
