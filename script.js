document.addEventListener('DOMContentLoaded', () => {
  // Campos personalización CBU
  const titular = document.getElementById('titularCuenta');
  const cbu = document.getElementById('cbuCuenta');
  const alias = document.getElementById('aliasCuenta');
  const botonEditarGuardar = document.getElementById('editarGuardarDatos');
  const iconoEditarGuardar = document.getElementById('iconoEditarGuardar');
  const toast = document.getElementById('toastMensaje');

  // Campos usuario nuevo
  const inputNombre = document.getElementById('nombreUsuario');
  const botonAgregar = document.getElementById('btnAgregarUsuario');
  const botonLimpiar = document.getElementById('btnLimpiar');
  const inputUsuarioGenerado = document.getElementById('usuarioGenerado');
  const inputContrasenaGenerada = document.getElementById('contrasenaGenerada');
  const textareaMensajeGenerado = document.getElementById('mensajeGenerado');
  const contadorUsuariosSpan = document.getElementById('contadorUsuarios');

  // Botones info y bienvenida
  const botonInfoUsuariosNuevos = document.getElementById('btnInfoUsuarioNuevo');
  const btnMensajeBienvenida = document.getElementById('btnMensajeBienvenida');

  // Mensajes
  const mensajesBienvenida = [
    "¡Hey! Bienvenido/a 🎰 Decime tu nombre completo asi te armo el usuario y clave para que arranques a jugar 🍀🔥",
    "¡Hola! Bienvenido/a 😊 ¿Me podés pasar tu nombre completo para crear tu usuario y contraseña?"
  ];

  const mensajes = [
    `Te recuerdo que la carga mínima es: $1500\nRetiro mínimo: $3000\n🌐 Sitio web: https://ganamos.biz/home\n\nCargamos y retiramos las 24hs  del día los 7 días de la semana al instante!`,
    `📢 Te cuento que el mínimo para cargar es de $1500 y para retirar $3000.\n🌐 Sitio web: https://ganamos.biz/home\n\n💸 Trabajamos 24/7 con cargas y retiros instantáneos 🎲🔥\n\n¿Podés acceder? Así te paso el CBU 📲`,
    `👉 El monto mínimo de carga es $1500 y el de retiro $3000\n\n🌐 Ingresá desde: https://ganamos.biz/home\n\n💳 Hacemos cargas y retiros todos los días, a toda hora 🚀\n\nAvisame si pudiste entrar así te paso los datos del CBU ✅`
  ];

  const mensajesInfoUsuariosNuevos = [
    `Hola como estas? Genial que quieras jugar! 🎰🤩
Primero te creamos tu usuario y contraseña para ingresar a https://ganamos.biz/home

👉 Una vez dentro, para cargar fichas solo necesitás hacer una transferencia bancaria, yo te paso el CBU.
Podés cargar el monto que quieras.

💵 Mínimo de carga: $1500
💵 Mínimo de retiro: $3000

📤 Los retiros de premios también se hacen por CBU.

📆 Estamos activos las 24hs todos los días para que juegues cuando quieras 😄
Cualquier duda que tengas podes  consultar sin problema 🙌`,

    `¡Hola! Te explico cómo podes jugar 🎉
✅ Primero creamos tu usuario y clave para entrar a https://ganamos.biz/home

💳 Para cargar fichas, hacés una transferencia al CBU que te paso, y acreditamos el saldo.

💲Mínimo para cargar: $1500
💲Mínimo para retirar: $3000

🏦 Los retiros también son por transferencia a tu CBU.

⏰ Atendemos 24/7 todos los días del año.
Cualquier duda que tengas, estoy para ayudarte 💬`,

    `🎉 ¡Bienvenido/a! Te explico

Primero te creo tu usuario y contraseña para que puedas ingresar a nuestra plataforma: https://ganamos.biz/home

💸 Para cargar fichas, hacés una transferencia y te paso el CBU. Una vez que confirmás, se acredita.

📌 Mínimo de carga: $1500
📌 Mínimo de retiro: $3000

✅ Los premios se retiran por transferencia también.

🕐 Estamos siempre disponibles, las 24hs los 7 días 🙌
¿Tenés alguna pregunta? Estoy acá para ayudarte 😃`
  ];

  // 🎯 Botón "Unirse al grupo"
const btnUnirseGrupo = Array.from(document.querySelectorAll('.btn-warning')).find(
  btn => btn.textContent.trim() === "Unirse al grupo"
);

const mensajesUnirseGrupo = [
  `¡Hola! 😊 A partir de ahora, todas las cargas y retiros se hacen desde un grupo privado.
Te paso el link para que te unas 🔒
En ese grupo está el equipo listo para ayudarte con lo que necesites.
Es exclusivo, solo para vos.
Una vez que entres, solo avisá si querés cargar o retirar. ¡Gracias! 🎰💖`,

  `¿Qué tal? 👋 Desde ahora, los retiros y cargas se gestionan en un grupo privado.
Te paso el link para entrar 👉
Ahí vas a encontrar al equipo que te asiste las 24hs.
⚠️ El grupo es solo para vos, nadie más lo ve.
Cuando entres, escribime si querés retirar o cargar, ¡así te ayudamos rápido!`,

  `¡Ey! 🎲 Para todo lo que sea cargas o retiros, ahora lo manejamos por un grupo privado.
Te paso el link para sumarte 🔗
Ahí está el equipo que te va a dar una mano siempre que necesites.
Es un grupo exclusivo para vos, tranqui que no hay nadie más.
Una vez que estés adentro, mandá si querés retirar o cargar 💸🙌`
];

let ultimoMensajeUnirse = null;

if (btnUnirseGrupo) {
  btnUnirseGrupo.addEventListener('click', () => {
    let mensajeNuevo;
    do {
      mensajeNuevo = mensajesUnirseGrupo[Math.floor(Math.random() * mensajesUnirseGrupo.length)];
    } while (mensajeNuevo === ultimoMensajeUnirse && mensajesUnirseGrupo.length > 1);

    ultimoMensajeUnirse = mensajeNuevo;

    navigator.clipboard.writeText(mensajeNuevo).then(() => {
      mostrarToast('✅ Mensaje para unirse al grupo copiado.');
    }).catch(() => {
      mostrarToast('❌ Error al copiar el mensaje.', false);
    });
  });
}

  // ➕ Guardar usuario en la nube al generarlo
  async function guardarUsuarioEnNube(usuario) {
    try {
      const response = await fetch('https://script.google.com/macros/s/AKfycbxOe71akD9J_wacRP7Yxkf3i9i456ydUq9Ctn93vv_Pv4oQHIb-vTYAK_4sBTFMZ6gO/exec', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ usuario })
      });

      const resultado = await response.json();
      return resultado.guardado === true;
    } catch (error) {
      console.error('Error al guardar usuario en la nube:', error);
      return false;
    }
  }

  // Modificamos el evento de botón agregar usuario para incluir la lógica de guardado
  botonAgregar.addEventListener('click', async () => {
    const nombre = inputNombre.value;
    if (!validarNombre(nombre)) {
      mostrarToast('❌ Nombre inválido. Solo letras y mínimo 3 caracteres.', false);
      return;
    }

    const usuario = generarUsuario(nombre);
    const contrasena = 'hola1234';
    const mensajeExtra = mensajes[Math.floor(Math.random() * mensajes.length)];
    const textoACopiar = `Usuario: ${usuario}\nClave: ${contrasena}\n\n${mensajeExtra}`;

    const guardadoExitoso = await guardarUsuarioEnNube(usuario);
    if (!guardadoExitoso) {
      mostrarToast('⚠️ Ese usuario ya existe o no se pudo guardar.', false);
      return;
    }

    navigator.clipboard.writeText(textoACopiar).then(() => {
      mostrarToast('✅ Mensaje copiado al portapapeles.');
      inputUsuarioGenerado.value = usuario;
      inputContrasenaGenerada.value = contrasena;
      textareaMensajeGenerado.value = textoACopiar;

      usuariosGenerados++;
      contadorUsuariosSpan.textContent = usuariosGenerados;

      inputNombre.value = '';
      botonAgregar.setAttribute('disabled', true);
    }).catch(() => {
      mostrarToast('❌ Error al copiar al portapapeles.', false);
    });
  });



// 📞 Botón "Contactanos por el grupo"
const btnContactanosGrupo = Array.from(document.querySelectorAll('.btn-warning')).find(
  btn => btn.textContent.trim() === "Contactanos por el grupo"
);

const mensajesContactanosGrupo = [
  `¡Hola! 😊 ¿Cómo estás?
Te pido por favor que escribas en tu grupo asignado, ya que atendemos únicamente por ahí 🙌🏻`,

  `¡Hola! Recordá que solo respondemos por tu grupo privado.
Por favor escribinos por ahí así te asistimos 🙌🏻`,

  `¡Hey! 👋 ¿Todo bien?
Te pido que nos hables por tu grupo asignado, es el único canal de atención 🛎️🙌🏻`
];

let ultimoMensajeContacto = null;

if (btnContactanosGrupo) {
  btnContactanosGrupo.addEventListener('click', () => {
    let mensajeNuevo;
    do {
      mensajeNuevo = mensajesContactanosGrupo[Math.floor(Math.random() * mensajesContactanosGrupo.length)];
    } while (mensajeNuevo === ultimoMensajeContacto && mensajesContactanosGrupo.length > 1);

    ultimoMensajeContacto = mensajeNuevo;

    navigator.clipboard.writeText(mensajeNuevo).then(() => {
      mostrarToast('✅ Mensaje de contacto copiado.');
    }).catch(() => {
      mostrarToast('❌ Error al copiar el mensaje.', false);
    });
  });
}

// 💳 Botón "CBU"
const btnCBU = Array.from(document.querySelectorAll('.btn-warning')).find(
  btn => btn.textContent.trim() === "CBU"
);

let ultimoIndiceCBU = -1;

if (btnCBU) {
  btnCBU.addEventListener('click', () => {
    const nombreTitular = titular.value.trim();
    const numeroCBU = cbu.value.trim();
    const aliasCBU = alias.value.trim();

    if (!nombreTitular || !numeroCBU || !aliasCBU) {
      mostrarToast('⚠️ Faltan datos del titular, CBU o alias.');
      return;
    }

    const variantesCBU = [
      `¡Hola! ¿Todo bien?
💳 Te paso los datos para transferir:
CBU: ${numeroCBU}
Alias: ${aliasCBU}
🧾 A nombre de: ${nombreTitular}

Mandame el comprobante y te acredito las fichas 🎰
⚠️ Siempre consultá el alias antes de transferir.`,

      `¡Ey! Te dejo los datos para que puedas transferir 🎰💸
🧾 Titular: ${nombreTitular}
🏦 Alias: ${aliasCBU}
🔢 CBU: ${numeroCBU}

Pasame el comprobante y te lo acredito al toque.
Siempre chequeá que el alias/cbu sea correcto ✅`,

      `¡Holis! Acá tenés todo lo que necesitás para cargar:
🏦 Alias: ${aliasCBU}
🔢 CBU: ${numeroCBU}
🧾 Titular: ${nombreTitular}

Cuando transfieras, mandame el comprobante 🎰
⚠️ No te olvides de verificar el alias.`,

      `¡Genial! Para cargar fichas, usá estos datos:
🧾 A nombre de: ${nombreTitular}
🔢 CBU: ${numeroCBU}
🏦 Alias: ${aliasCBU}

Pasame el comprobante después y te lo acredito 🔥
Recordá confirmar el alias antes de enviar 😉`,

      `¡Perfecto! Te paso los datos para hacer la carga:
🏦 Alias: ${aliasCBU}
🧾 A nombre de: ${nombreTitular}
🔢 CBU: ${numeroCBU}

📤 Enviame el comprobante cuando lo hagas y lo activo 🎰

🔔 Antes de transferir, asegurate de revisar bien el CBU/Alias para evitar problemas.`
    ];

    let nuevoIndice;
    do {
      nuevoIndice = Math.floor(Math.random() * variantesCBU.length);
    } while (nuevoIndice === ultimoIndiceCBU && variantesCBU.length > 1);
    ultimoIndiceCBU = nuevoIndice;

    const mensajeCBU = variantesCBU[nuevoIndice];

    navigator.clipboard.writeText(mensajeCBU).then(() => {
      mostrarToast('✅ Datos de transferencia copiados al portapapeles.');
    }).catch(() => {
      mostrarToast('❌ Error al copiar los datos.');
    });
  });
}

// 👩‍🦰 Botón "Saludos mujer con CBU"
const btnSaludoMujerCBU = Array.from(document.querySelectorAll('.btn-warning')).find(
  btn => btn.textContent.trim() === "Saludos mujer con CBU"
);

let ultimoIndiceMujerCBU = -1;

if (btnSaludoMujerCBU) {
  btnSaludoMujerCBU.addEventListener('click', () => {
    const nombreTitular = titular.value.trim();
    const numeroCBU = cbu.value.trim();
    const aliasCBU = alias.value.trim();

    if (!nombreTitular || !numeroCBU || !aliasCBU) {
      mostrarToast('⚠️ Faltan datos del titular, CBU o alias.');
      return;
    }

    const mensajesMujer = [
      `¡Holis amigaa 🌸 ¿Cómo estás?
💳 Te dejo los datos para que puedas cargar tus fichas:
🧾 A nombre de: ${nombreTitular}
🏦 Alias: ${aliasCBU}
🔢 CBU: ${numeroCBU}

Cuando lo hagas, mandame el comprobante y te las acredito 🎰✨

📌 No te olvides de consultar el CBU o Alias antes de enviar cualquier pago.

`,

      `Hola bellaa 😊
Para cargar saldo en tu cuenta, estos son los datos:
🏦 Alias: ${aliasCBU}
🧾 Titular: ${nombreTitular}
🔢 CBU: ${numeroCBU}

Mandame el comprobante así te activo todo en el momento 💖
🔔 Antes de transferir, asegurate de revisar bien el CBU/Alias para evitar problemas.

`,

      `¡Ey genia! 💃 Te paso todo lo necesario para que hagas la carga:
🔢 CBU: ${numeroCBU}
🏦 Alias: ${aliasCBU}
🧾 A nombre de: ${nombreTitular}

Cuando termines, pasame el comprobante y lo cargo 🎲🔥

⚠️ Recordá siempre consultar el CBU/Alias antes de enviar la transferencia.`,

      `Hola reina 👑
💰 Estos son los datos para que transfieras:
🧾 Titular: ${nombreTitular}
🔢 CBU: ${numeroCBU}
🏦 Alias: ${aliasCBU}

📌 No te olvides de consultar el CBU o Alias antes de enviar cualquier pago

Mandá el comprobante y te cargo al instante 🎰✨`,

      `¡Buenaas! 💕
Acá están los datos para cargar:
🏦 Alias: ${aliasCBU}
🔢 CBU: ${numeroCBU}
🧾 A nombre de: ${nombreTitular}

Enviame el comprobante así cargamos las fichas 🎲💸

🔍 Antes de enviar, recordá verificar el CBU o Alias para evitar errores.`
    ];

    let nuevoIndice;
    do {
      nuevoIndice = Math.floor(Math.random() * mensajesMujer.length);
    } while (nuevoIndice === ultimoIndiceMujerCBU && mensajesMujer.length > 1);
    ultimoIndiceMujerCBU = nuevoIndice;

    const mensaje = mensajesMujer[nuevoIndice];

    navigator.clipboard.writeText(mensaje).then(() => {
      mostrarToast('✅ Mensaje para mujer copiado al portapapeles.');
    }).catch(() => {
      mostrarToast('❌ Error al copiar el mensaje.');
    });
  });
}

// Botón Info para retirar
const btnInfoParaRetirar = Array.from(document.querySelectorAll('.btn-warning')).find(
  btn => btn.textContent.trim() === "Info para retirar"
);

const mensajesInfoRetiro = [
  "🎉 ¡Bien ahí, felicitaciones! Para poder hacer tu retiro, necesitás pasarnos tu CBU, nombre del titular y el monto. ¡A disfrutar ese premio! 🙌💸",
  "¡Qué buena noticia! 🎊 Solo faltan algunos datos para el retiro: CBU, nombre del titular y monto a retirar. Cuando nos los pases, te lo procesamos rápido. 🎰✨",
  "🎉 Felicitaciones por tu premio! Ahora, para retirar, enviános tu CBU, el nombre del titular y el monto que querés retirar. ¡Vamos que se puede! 💰🙌"
];

let ultimoIndiceInfoRetiro = -1;

if (btnInfoParaRetirar) {
  btnInfoParaRetirar.addEventListener('click', () => {
    let nuevoIndice;
    do {
      nuevoIndice = Math.floor(Math.random() * mensajesInfoRetiro.length);
    } while (nuevoIndice === ultimoIndiceInfoRetiro && mensajesInfoRetiro.length > 1);
    ultimoIndiceInfoRetiro = nuevoIndice;

    const mensaje = mensajesInfoRetiro[nuevoIndice];

    navigator.clipboard.writeText(mensaje).then(() => {
      mostrarToast('✅ Mensaje para info de retiro copiado al portapapeles.');
    }).catch(() => {
      mostrarToast('❌ Error al copiar el mensaje de retiro.');
    });
  });
}

// Botón Felicitaciones
const btnFelicitaciones = Array.from(document.querySelectorAll('.btn-warning')).find(
  btn => btn.textContent.trim() === "Felicitaciones"
);

const mensajesFelicitaciones = [
  "🎉 ¡Felicitaciones! Para que sigas jugando a full, por cada amigo que refieras y haga su carga, te regalo $3000 para tu próxima recarga. 🍀🎰 ¡Aprovechá y compartí la buena!",
  "¡Qué alegría! 🎊 Cada vez que un amigo que vos invites cargue, te doy $3000 extra para tu próxima carga. 🎰🍀 ¡Dale, que esto se pone mejor!",
  "🎉 ¡Felicidades! Por cada amigo que traigas y que cargue, te regalo $3000 para usar en tu próxima carga. 🍀🔥 ¡No te lo pierdas y seguí ganando!"
];

let ultimoIndiceFelicitaciones = -1;

if (btnFelicitaciones) {
  btnFelicitaciones.addEventListener('click', () => {
    let nuevoIndice;
    do {
      nuevoIndice = Math.floor(Math.random() * mensajesFelicitaciones.length);
    } while (nuevoIndice === ultimoIndiceFelicitaciones && mensajesFelicitaciones.length > 1);
    ultimoIndiceFelicitaciones = nuevoIndice;

    const mensaje = mensajesFelicitaciones[nuevoIndice];

    navigator.clipboard.writeText(mensaje).then(() => {
      mostrarToast('✅ Mensaje de felicitaciones copiado al portapapeles.');
    }).catch(() => {
      mostrarToast('❌ Error al copiar el mensaje de felicitaciones.');
    });
  });
}

// Botón Info de REFERIDO
const btnInfoReferido = Array.from(document.querySelectorAll('.btn-warning')).find(
  btn => btn.textContent.trim() === "Info de REFERIDO"
);

const mensajesInfoReferido = [
  `🎰 Tenemos un plan de referidos para que ganes fichas gratis!

Por cada usuario que traigas, te regalamos 3000 fichas para que juegues sin gastar un peso 🎁

Solo pasales mi contacto y que digan que vienen de tu parte mencionando tu usuario, así te damos la bonificación ☘️

La bonificación se activa cuando el referido hace su primera carga.
Los 3000$ se suman en tu próxima carga.
Recordanos a quién referiste cuando cargues para acreditarte.
Las bonificaciones no se pueden retirar.`,

  `🎉 ¡Sumate al plan de referidos y gana fichas gratis!

Te cuento que por cada amigo que invites y cargue, recibís 3000 fichas para usar en tu próxima carga 🎰🎁

Solo pediles que digan que vienen de tu parte con tu nombre de usuario para acreditar la bonificación ☘️

La bonificación se otorga después de la primera carga del referido.
Se suma en tu próxima recarga.
Recordanos tus referidos cuando cargues para sumarte el bono.
Las bonificaciones no se pueden retirar.`,

  `🍀 ¡Referí y ganá fichas gratis!

Por cada jugador que me traigas, te regalamos 3000 fichas para que juegues gratis 🎰🎉

Solo tenés que pasarles mi contacto y que digan tu nombre de usuario para saber que vienen de tu parte ☘️

El bono se activa con la primera carga del referido.
Se suma en tu próxima carga.
Avisanos quiénes referiste para acreditarte.`
];

let ultimoIndiceInfoReferido = -1;

if (btnInfoReferido) {
  btnInfoReferido.addEventListener('click', () => {
    let nuevoIndice;
    do {
      nuevoIndice = Math.floor(Math.random() * mensajesInfoReferido.length);
    } while (nuevoIndice === ultimoIndiceInfoReferido && mensajesInfoReferido.length > 1);
    ultimoIndiceInfoReferido = nuevoIndice;

    const mensaje = mensajesInfoReferido[nuevoIndice];

    navigator.clipboard.writeText(mensaje).then(() => {
      mostrarToast('✅ Mensaje de info de referido copiado al portapapeles.');
    }).catch(() => {
      mostrarToast('❌ Error al copiar el mensaje de info de referido.');
    });
  });
}

// Botón AGENDAME
const btnAgendame = Array.from(document.querySelectorAll('.btn-warning')).find(
  btn => btn.textContent.trim() === "AGENDAME"
);

const mensajesAgendame = [
  `¡Hola soy Azul🫶🏼 📲 Agendame y vas a recibir todas las promos y novedades. 🎁
Además, por cada amigo que refieras, te damos $3000 en fichas para tu próxima carga. 🎰💥
Solo pediles que mencionen tu usuario y te acreditamos el bono. ¡A aprovechar! 🚀🔥`,

  `¡Azul aqui🙋‍♀️! 📲 Agendame y no te perdés ninguna promo. 🎉
¿Sabías que por cada referido te regalamos $3000 para tu próxima carga? 🎰💰
Solo que mencionen tu usuario y listo, las fichas son tuyas. ¡Dale que se viene lo bueno! 🚀🔥`,

  `¡Qué tal! Soy Azul🫶🏼 📲 Guardame en tus contactos para recibir todas las promos. 🎁
Traé amigos y ganá $3000 en fichas para tu próxima carga. 🎰🔥
Solo pediles que digan tu usuario al registrarse y te acreditamos el bono. ¡A jugar! 🚀✨`
];

let ultimoIndiceAgendame = -1;

if (btnAgendame) {
  btnAgendame.addEventListener('click', () => {
    let nuevoIndice;
    do {
      nuevoIndice = Math.floor(Math.random() * mensajesAgendame.length);
    } while (nuevoIndice === ultimoIndiceAgendame && mensajesAgendame.length > 1);
    ultimoIndiceAgendame = nuevoIndice;

    const mensaje = mensajesAgendame[nuevoIndice];

    navigator.clipboard.writeText(mensaje).then(() => {
      mostrarToast('✅ Mensaje de AGENDAME copiado al portapapeles.');
    }).catch(() => {
      mostrarToast('❌ Error al copiar el mensaje de AGENDAME.');
    });
  });
}





  // Cargar datos guardados
  if (localStorage.getItem('titularCuenta')) titular.value = localStorage.getItem('titularCuenta');
  if (localStorage.getItem('cbuCuenta')) cbu.value = localStorage.getItem('cbuCuenta');
  if (localStorage.getItem('aliasCuenta')) alias.value = localStorage.getItem('aliasCuenta');

  let editando = false;
  let usuariosGenerados = 0;

  // Función para validar nombre: solo letras y espacios, min 3 chars
  function validarNombre(nombre) {
    const regex = /^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]{3,}$/;
    return regex.test(nombre.trim());
  }

  // Habilitar/deshabilitar botón agregar según validez del input
  inputNombre.addEventListener('input', () => {
    if (validarNombre(inputNombre.value)) {
      botonAgregar.removeAttribute('disabled');
    } else {
      botonAgregar.setAttribute('disabled', true);
    }
  });

  // Función para mostrar toast con animación y color
  function mostrarToast(mensaje, exito = true) {
    if (!toast) return;
    toast.textContent = mensaje;
    toast.classList.remove('toast-error', 'toast-success');
    toast.classList.add('visible');
    toast.classList.add(exito ? 'toast-success' : 'toast-error');

    setTimeout(() => {
      toast.classList.remove('visible', 'toast-error', 'toast-success');
    }, 4000);
  }

  // Función para generar usuario
  function generarUsuario(nombre) {
    const prefijo = 'A1';
    const maxLen = 16;
    nombre = nombre.trim();
    if (!nombre) return null;

    const numeroRandom = Math.floor(Math.random() * 90) + 10; // 10 a 99
    const maxNombreLen = maxLen - prefijo.length - numeroRandom.toString().length;

    let nombreSimplificado;
    if (nombre.length > maxNombreLen) {
      const primeros = nombre.slice(0, 7);
      const ultimos = nombre.slice(nombre.length - 5);
      nombreSimplificado = primeros + ultimos;
    } else {
      nombreSimplificado = nombre;
    }

    // Remover espacios para usuario
    return prefijo + nombreSimplificado.replace(/\s+/g, '') + numeroRandom;
  }

  // Evento botón editar/guardar datos CBU
  botonEditarGuardar.addEventListener('click', () => {
    if (!editando) {
      titular.removeAttribute('readonly');
      cbu.removeAttribute('readonly');
      alias.removeAttribute('readonly');
      iconoEditarGuardar.classList.replace('bi-pencil', 'bi-save');
      botonEditarGuardar.innerHTML = '';
      botonEditarGuardar.appendChild(iconoEditarGuardar);
      botonEditarGuardar.appendChild(document.createTextNode(' Guardar datos'));
      titular.focus();
      editando = true;
    } else {
      titular.setAttribute('readonly', true);
      cbu.setAttribute('readonly', true);
      alias.setAttribute('readonly', true);

      localStorage.setItem('titularCuenta', titular.value.trim());
      localStorage.setItem('cbuCuenta', cbu.value.trim());
      localStorage.setItem('aliasCuenta', alias.value.trim());

      iconoEditarGuardar.classList.replace('bi-save', 'bi-pencil');
      botonEditarGuardar.innerHTML = '';
      botonEditarGuardar.appendChild(iconoEditarGuardar);
      botonEditarGuardar.appendChild(document.createTextNode(' Editar datos del CBU'));

      mostrarToast('✅ Datos guardados correctamente.');

      editando = false;
    }
  });

  // Evento botón agregar nuevo usuario
  botonAgregar.addEventListener('click', () => {
    const nombre = inputNombre.value;
    if (!validarNombre(nombre)) {
      mostrarToast('❌ Nombre inválido. Solo letras y mínimo 3 caracteres.', false);
      return;
    }

    const usuario = generarUsuario(nombre);
    const contrasena = 'hola1234'; // Puedes generar una contraseña aleatoria si quieres

    // Seleccionamos un mensaje aleatorio
    const mensajeExtra = mensajes[Math.floor(Math.random() * mensajes.length)];

    const textoACopiar = `Usuario: ${usuario}\nClave: ${contrasena}\n\n${mensajeExtra}`;

    navigator.clipboard.writeText(textoACopiar).then(() => {
      mostrarToast('✅ Mensaje copiado al portapapeles.');
      inputUsuarioGenerado.value = usuario;
      inputContrasenaGenerada.value = contrasena;
      textareaMensajeGenerado.value = textoACopiar;

      usuariosGenerados++;
      contadorUsuariosSpan.textContent = usuariosGenerados;

      // Opcional: limpiar el inputNombre después de crear usuario
      inputNombre.value = '';
      botonAgregar.setAttribute('disabled', true);
    }).catch(() => {
      mostrarToast('❌ Error al copiar al portapapeles.', false);
    });
  });

  // Evento botón limpiar campos
  botonLimpiar.addEventListener('click', () => {
    inputNombre.value = '';
    inputUsuarioGenerado.value = '';
    inputContrasenaGenerada.value = '';
    textareaMensajeGenerado.value = '';
    botonAgregar.setAttribute('disabled', true);
  });

  // Evento botón Info para usuarios nuevos con lógica para no repetir mensaje seguido
  let ultimoIndiceInfo = -1;
  if (botonInfoUsuariosNuevos) {
    botonInfoUsuariosNuevos.addEventListener('click', () => {
      let nuevoIndice;
      do {
        nuevoIndice = Math.floor(Math.random() * mensajesInfoUsuariosNuevos.length);
      } while (nuevoIndice === ultimoIndiceInfo && mensajesInfoUsuariosNuevos.length > 1);
      ultimoIndiceInfo = nuevoIndice;

      const mensajeInfo = mensajesInfoUsuariosNuevos[nuevoIndice];
      navigator.clipboard.writeText(mensajeInfo).then(() => {
        mostrarToast('✅ Mensaje de info copiado al portapapeles.');
      }).catch(() => {
        mostrarToast('❌ Error al copiar el mensaje de info.', false);
      });
    });
  }

  // Datos de topes de retiro según carga diaria
const topesRetiros = [
  { rango: 'De $1500 a $14000', tope: '$50000' },
  { rango: 'De $15000 a $29000', tope: '$75000' },
  { rango: 'De $30000 a $50000', tope: '$100000' },
  { rango: '$75000 o más', tope: 'El doble / Consultar monto' }
];

const btnTopeRetiros = document.getElementById('btnTopeRetiros');
const listaTopesRetiros = document.getElementById('listaTopesRetiros');

// Crear items en la lista del modal
function cargarTopes() {
  listaTopesRetiros.innerHTML = ''; // limpiar lista

  topesRetiros.forEach(({ rango, tope }) => {
    const li = document.createElement('li');
    li.classList.add('list-group-item', 'bg-secondary', 'text-light');
    li.textContent = `Con carga ${rango}, tope de retiro diario: ${tope}`;
    listaTopesRetiros.appendChild(li);
  });
}

// Mostrar modal
const modalElement = document.getElementById('modalTopeRetiros');
const modalBootstrap = new bootstrap.Modal(modalElement);

btnTopeRetiros.addEventListener('click', () => {
  cargarTopes();
  modalBootstrap.show();
});



  // Evento botón Mensaje Bienvenida con lógica para no repetir mensaje seguido
  let ultimoIndiceBienvenida = -1;
  if (btnMensajeBienvenida) {
    btnMensajeBienvenida.addEventListener('click', () => {
      let nuevoIndice;
      do {
        nuevoIndice = Math.floor(Math.random() * mensajesBienvenida.length);
      } while (nuevoIndice === ultimoIndiceBienvenida && mensajesBienvenida.length > 1);
      ultimoIndiceBienvenida = nuevoIndice;

      const mensajeBienvenida = mensajesBienvenida[nuevoIndice];
      navigator.clipboard.writeText(mensajeBienvenida).then(() => {
        mostrarToast('✅ Mensaje de bienvenida copiado al portapapeles.');
      }).catch(() => {
        mostrarToast('❌ Error al copiar el mensaje de bienvenida.', false);
      });
    });
  }

});














