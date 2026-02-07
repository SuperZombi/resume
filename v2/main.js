async function getTotalGitHubStars(username) {
	return fetch(
		`https://api.github.com/users/${username}/repos?per_page=100`
	).then(res=>res.json()).then(repos=>{
		return repos.reduce((sum, repo) => sum + repo.stargazers_count, 0)
	})
}
getTotalGitHubStars('SuperZombi').then(stars=>{
	document.querySelector("#stars-amount").textContent = stars
})
