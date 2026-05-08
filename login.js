 // Configuración de Supabase
    const SUPABASE_URL = "https://hqwrnmnnsgbfbsadvgoc.supabase.co";
    const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imhxd3JubW5uc2diZmJzYWR2Z29jIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzczMTQzNDcsImV4cCI6MjA5Mjg5MDM0N30.oTg5A5BdFtfRl499TnwOK1c9rsi6GNz5faEfD2e5LMw";
    // Crea la conexión con Supabase usando URL y clave
    const supabaseClient = supabase.createClient(
      SUPABASE_URL,
      SUPABASE_ANON_KEY,
    );

    // Función para login
    // Declara una función asíncrona que recibe usuario y contraseña
    async function loginUser(email, password) {
      // Espera la respuesta de Supabase
      const { data, error } = await supabaseClient
        .from("users")
        .select("*")
        .eq("email", email)
        .eq("password", password)
        .single();

      if (error || !data) {
        throw new Error("Credenciales incorrectas");
      }

      // Guarda los datos del usuario en la sesión del navegador
      sessionStorage.setItem("user", JSON.stringify(data));
      return data;
    }

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
      

      
