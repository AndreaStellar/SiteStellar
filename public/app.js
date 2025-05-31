window.onload = () => {
  const hash = window.location.hash.substr(1);
  const params = new URLSearchParams(hash);
  const accessToken = params.get("access_token");

  if (!accessToken) {
    document.getElementById("welcome").innerText = "Accesso non riuscito.";
    return;
  }

  // Ottieni profilo da Auth0
  fetch("https://dev-lf6oyxufeabnx4v0.us.auth0.com/userinfo", {
    headers: {
      Authorization: `Bearer ${accessToken}`
    }
  })
    .then(res => res.json())
    .then(user => {
      const nome = user.name || user.email;
	if nome=""{
		document.getElementById("welcome").innerText = "";
    		document.getElementById("btn-login").style.display = "inline-block";
    		document.getElementById("btn-logout").style.display = "none";
	}else{
      		document.getElementById("welcome").innerText = `Benvenuto/a ${nome}!`;
		document.getElementById("btn-login").style.display = "none";
    		document.getElementById("btn-logout").style.display = "inline-block";
      		mostraVideo();
    	}
     })
    .catch(err => {
      console.error(err);
      document.getElementById("welcome").innerText = "Errore durante il login.";
    });
};

async function logout() {
  auth0.logout({
    returnTo: window.location.origin,
  });
}

function mostraVideo() {
  const videosDiv = document.getElementById("videos");
  videosDiv.style.display = "block";

  // Inserisci qui i tuoi iframe Vimeo
  const video1 = `<iframe src="https://vimeo.com/1088019389/1036aa696c" allow="autoplay; fullscreen" allowfullscreen></iframe>`;
const btnlogout = `<button id="btn-logout">Logout</button>`;
  
  videosDiv.innerHTML = video1 + btnlogout;
}
