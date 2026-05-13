  function logout(){

  sessionStorage.removeItem("user");

  window.location.href = "login.html";

}
  // ================= CONFIG =================
      const SUPABASE_URL = "https://hqwrnmnnsgbfbsadvgoc.supabase.co";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imhxd3JubW5uc2diZmJzYWR2Z29jIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzczMTQzNDcsImV4cCI6MjA5Mjg5MDM0N30.oTg5A5BdFtfRl499TnwOK1c9rsi6GNz5faEfD2e5LMw";



const supabaseClient = supabase.createClient(
  SUPABASE_URL,
  SUPABASE_ANON_KEY
);

const lector = new Html5Qrcode("lector");

// ================= MOSTRAR MENSAJES =================
function mostrar(msg, ok) {
  const estado = document.getElementById("estado");
  estado.textContent = msg;
  estado.className = ok ? "ok" : "fail";
}


// ================= BUSCAR =================
async function obtenerEstudiante(cedula) {
  const { data } = await supabaseClient
    .from("estudiantes_qr")
    .select("*")
    .eq("documento", documento)
    .single();

  return data;
}

// ================= GUARDAR =================
async function guardarAsistencia(est) {
  await supabaseClient.from("registros_qr").insert([{
    nombre: est.nombre,
    grado: est.grado,
    documento: est.documento,
    foto_url: est.foto_url,
    fecha_hora: new Date().toISOString(),
    estado: "Registro correcto"
  }]);
}

// ================= PROCESAR =================
// ================= PROCESAR =================
async function procesarQR(qr) {

  await lector.stop();
  console.log(qr);

  // Convertir QR a objeto
  const datos = JSON.parse(qr);
  alert(datos)

  // Obtener cedula
  const documento = datos.cedula;
  alert(documento)

  // Buscar estudiante
  const estudiante = await obtenerEstudiante(documento);

  // Si no existe
  if (!estudiante) {

    mostrar("❌ No encontrado", false);

    return;
  }

  // Mostrar datos
  document.getElementById("nombre").textContent =
    estudiante.nombre;

  document.getElementById("grado").textContent =
    estudiante.grado;

  document.getElementById("doc").textContent =
    estudiante.documento;

  document.getElementById("hora").textContent =
    new Date().toLocaleString();

  // Foto
  if (estudiante.foto_url) {

    document.getElementById("foto").src =
      estudiante.foto_url;

    document.getElementById("foto").style.display =
      "block";
  }

  // Guardar asistencia
  await guardarAsistencia(estudiante);

  // Mostrar mensaje
  mostrar("✅ Asistencia registrada", true);

  // Mostrar botón
  document.getElementById("btnReiniciar")
    .style.display = "block";
}
// ================= CÁMARA =================
async function iniciarCamara() {
  await lector.start(
    { facingMode: "environment" },
    { fps: 10, qrbox: 250 },
    procesarQR
  );

  mostrar("📷 Cámara lista", true);
}

// ================= REINICIAR =================
function reiniciarLectura() {
  location.reload();
}

// ================= START =================
iniciarCamara();
