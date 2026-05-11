// Configuración de Supabase
const SUPABASE_URL = "https://hqwrnmnnsgbfbsadvgoc.supabase.co";

const SUPABASE_ANON_KEY =
  "TU_KEY";

const supabaseClient = supabase.createClient(
  SUPABASE_URL,
  SUPABASE_ANON_KEY
);

// ================= LOGIN USER =================
async function loginUser(email, password) {

  const { data, error } = await supabaseClient
    .from("users")
    .select("*")
    .eq("email", email)
    .eq("password", password)
    .single();

  if (error || !data) {
    throw new Error("Credenciales incorrectas");
  }

  sessionStorage.setItem("user", JSON.stringify(data));

  return data;
}

// ================= LOGIN =================
async function login() {

  const email = document.getElementById("email").value;

  const password = document.getElementById("password").value;

  try {

    const user = await loginUser(email, password);

    if (user.role === "docente") {

      window.location.href = "index.html";

    } else if (user.role === "estudiante") {

      window.location.href = "opcion est.html";

    }

  } catch (error) {

    alert("Error: " + error.message);

  }

}
