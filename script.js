/*Inicio*/

const loginForm = document.getElementById("loginForm");

if (loginForm) {
  loginForm.addEventListener("submit", function (e) {
    e.preventDefault();

    const email = document.querySelector("input[type='email']").value;
    const password = document.querySelector("input[type='password']").value;

    if (email === "admin@TomNet.com" && password === "1234") {
      localStorage.setItem("auth", "true");
      window.location.href = "/Primer_Modulo/home.html";
    } else {
      alert("Correo o contraseña incorrectos");
    }
  });
}

/*Home*/
const avatarUrl = `https://api.dicebear.com/9.x/pixel-art/svg?seed=${Math.random()}`;

const btnPublicar = document.getElementById("btnPublicar");

if (btnPublicar) {
  const textarea = document.getElementById("postContent");
  const postsContainer = document.getElementById("postsContainer");

  btnPublicar.addEventListener("click", function () {
    const contenido = textarea.value.trim();

    if (contenido === "") {
      alert("Escribe algo primero");
      return;
    }
    //Logica del container
    const post = document.createElement("div");
    post.className = "post p-3 mb-3 rounded-4 shadow bg-white";

    post.innerHTML = `
      <div class="d-flex align-items-center mb-3">
        <img src="${avatarUrl}" class="rounded-circle me-2" width="40" height="40"/>
      </div>
      <!-- Aqui se aguarda loq ue se publica -->
      <p class="mb-3">${contenido}</p>

      <div class="d-flex justify-content-around border-top pt-2">

      <!-- Botones despues de publicar -->
        <button class="btn icon-btn like-btn">
          <i class="bi bi-balloon-heart-fill like-icon fs-5"></i>
        </button>

        <button class="btn comment-btn">
          <i class="bi bi-chat-heart-fill fs-5" style="color:grey"></i>
        </button>

        <button class="btn">
          <i class="bi bi-share fs-5" style="color:grey"></i>
        </button>

      </div>

      <div class="comment-section mt-3 d-none">
        <input type="text" class="form-control comment-input" placeholder="Escribe un comentario...">
        <div class="comments-list mt-2"></div>
      </div>
    `;

    postsContainer.prepend(post);
    textarea.value = "";
  });
}

//Botones
document.addEventListener("click", function (e) {
  // boton de me gusta
  if (e.target.closest(".like-btn")) {
    const btn = e.target.closest(".like-btn");
    btn.classList.toggle("active");
  }

  // comentarios
  if (e.target.closest(".comment-btn")) {
    const post = e.target.closest(".post");
    const section = post.querySelector(".comment-section");

    section.classList.toggle("d-none");
  }
});

document.addEventListener("keypress", function (e) {
  if (e.target.classList.contains("comment-input") && e.key === "Enter") {
    const input = e.target;
    const texto = input.value.trim();
    if (texto === "") return;

    const avatarUrl = `https://api.dicebear.com/9.x/pixel-art/svg?seed=${Math.random()}`;

    const lista = input.nextElementSibling;

    const comentario = document.createElement("div");
    comentario.className = "d-flex align-items-start mb-2";

    comentario.innerHTML = `
      <img src="${avatarUrl}" class="rounded-circle me-2" width="30" height="30">

      <div class="bg-light p-2 rounded-4">
        ${texto}
      </div>
    `;

    lista.appendChild(comentario);
    input.value = "";
  }
});
