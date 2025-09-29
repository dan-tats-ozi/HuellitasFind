document.addEventListener('DOMContentLoaded', () => {
  // Elementos principales
  const btnLogin = document.getElementById('btnLogin');
  const btnBuscar = document.getElementById('btnBuscar');
  const modal = document.getElementById('modal');
  const closeModalBtn = document.querySelector('.close-btn');
  const modalTitle = document.getElementById('modalTitle');
  const formLogin = document.getElementById('formLogin');
  const formRegistro = document.getElementById('formRegistro');
  const petNameInput = formRegistro.querySelector('input[placeholder="Nombre de tu mascota"]');
  const petTypeSelect = document.getElementById('tipoMascota');
  const petBreedInput = formRegistro.querySelector('input[placeholder="Raza de tu mascota"]');

  const heroDefault = document.querySelector('.hero-inicio');
  const heroPetInfo = document.getElementById('hero-pet-info');
  const petAvatarPrincipal = document.getElementById('pet-avatar-principal');
  const petNamePrincipal = document.getElementById('pet-name-principal');
  const petBreedPrincipal = document.getElementById('pet-breed-principal');
  const petAgePrincipal = document.getElementById('pet-age-principal');
  const petDescriptionPrincipal = document.getElementById('pet-description-principal');
  const btnLocalizarPrincipal = document.getElementById('btnLocalizarPrincipal');
  const petLocationPrincipal = document.getElementById('pet-location-principal');

  const calendar = document.getElementById('treatment-calendar');
  const calendarMonth = document.getElementById('calendarMonth');
  const prevMonthBtn = document.getElementById('prevMonth');
  const nextMonthBtn = document.getElementById('nextMonth');

  let userPetData = null;
  let currentYear = 2025;
  let currentMonth = 9; // Octubre (0-indexed)
  
  const avatars = {
    'perro': 'https://cdn.shopify.com/s/files/1/0650/9504/1173/files/Bobtail-todo-lo-que-necesitas-saber-sobre-el-viejo-pastor.jpg?v=1709651057',
    'gato': 'https://i.pinimg.com/736x/c1/17/88/c11788cf88fc2ddd284032f27f10a067.jpg'
  };

  const locations = {
    'perro': 'Calle de la Alegría, La Paz, Bolivia',
    'gato': 'Avenida de los Sueños, Santa Cruz, Bolivia'
  };

  // Modal
  btnLogin.addEventListener('click', () => {
    showModal();
    showLoginForm();
  });

  btnBuscar.addEventListener('click', () => {
    if(userPetData) updateMainScreenWithPetInfo(userPetData);
    else { showModal(); showLoginForm(); }
  });

  closeModalBtn.addEventListener('click', hideModal);
  window.addEventListener('click', (e) => { if(e.target === modal) hideModal(); });

  btnLocalizarPrincipal.addEventListener('click', () => {
    petLocationPrincipal.classList.remove('oculto');
  });

  document.addEventListener('click', (e) => {
    if(e.target.id === 'linkRegistro'){ e.preventDefault(); showRegistroForm(); }
    if(e.target.id === 'linkLogin'){ e.preventDefault(); showLoginForm(); }
  });

  function showModal(){ modal.style.display = 'block'; }
  function hideModal(){ modal.style.display = 'none'; petLocationPrincipal.classList.add('oculto'); }
  function showLoginForm(){ modalTitle.textContent='Iniciar Sesión'; formLogin.classList.remove('oculto'); formRegistro.classList.add('oculto'); }
  function showRegistroForm(){ modalTitle.textContent='Registro'; formLogin.classList.add('oculto'); formRegistro.classList.remove('oculto'); }

  // Formularios
  formLogin.addEventListener('submit', e=>{
    e.preventDefault();
    if(userPetData){
      hideModal();
      updateMainScreenWithPetInfo(userPetData);
    } else alert('Primero regístrate para ver los datos de tu mascota.');
  });

  formRegistro.addEventListener('submit', e=>{
    e.preventDefault();
    userPetData = {
      name: petNameInput.value,
      type: petTypeSelect.value,
      breed: petBreedInput.value,
      avatar: avatars[petTypeSelect.value],
      location: locations[petTypeSelect.value],
      age: "2 años",
      description: "El Pastor Inglés es un perro inteligente, leal y muy protector. Perfecto como mascota familiar.",
      treatments: [
        { date: "2025-10-05", text: "Vacuna antirrábica" },
        { date: "2025-10-10", text: "Desparasitación" }
      ]
    };
    hideModal();
    updateMainScreenWithPetInfo(userPetData);
  });

  // Actualizar pantalla principal
  function updateMainScreenWithPetInfo(petData){
    heroDefault.classList.add('oculto');
    heroPetInfo.classList.remove('oculto');
    petAvatarPrincipal.src = petData.avatar;
    petNamePrincipal.textContent = `¡Hola, ${petData.name}!`;
    petBreedPrincipal.textContent = petData.breed;
    petAgePrincipal.textContent = petData.age;
    petDescriptionPrincipal.textContent = petData.description;
    petLocationPrincipal.textContent = petData.location;

    renderCalendar(currentYear, currentMonth, petData);
  }

  // CALENDARIO
  function renderCalendar(year, month, petData){
    if(!calendar) return;
    calendar.innerHTML = "";
    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month+1, 0).getDate();

    calendarMonth.textContent = `${new Date(year, month).toLocaleString('es-ES', { month: 'long' })} ${year}`;

    for(let i=0;i<firstDay;i++){ calendar.appendChild(document.createElement("div")); }

    for(let d=1; d<=daysInMonth; d++){
      const cell = document.createElement("div");
      cell.classList.add("calendar-cell");
      const today = new Date();
      const thisDate = new Date(year, month, d);
      if(thisDate.getDate()===today.getDate() && thisDate.getMonth()===today.getMonth() && thisDate.getFullYear()===today.getFullYear()){
        cell.classList.add("today");
      }
      cell.innerHTML = `<strong>${d}</strong>`;

      const dayStr = `${year}-${String(month+1).padStart(2,"0")}-${String(d).padStart(2,"0")}`;
      if(petData.treatments){
        petData.treatments.forEach(t=>{
          if(t.date===dayStr){
            const ev = document.createElement("div");
            ev.className = "event";
            ev.textContent = t.text;
            cell.appendChild(ev);
          }
        });
      }

      calendar.appendChild(cell);
    }
  }

  // AGREGAR TRATAMIENTO
  document.getElementById("btnAddTreatment").addEventListener("click", ()=>{
    if(!userPetData) return;
    const text = prompt("Nombre del tratamiento/vacuna:");
    const dateStr = prompt("Fecha (YYYY-MM-DD):");
    if(text && dateStr){
      if(!userPetData.treatments) userPetData.treatments=[];
      userPetData.treatments.push({date: dateStr, text});
      const treatmentDate = new Date(dateStr);
      currentYear = treatmentDate.getFullYear();
      currentMonth = treatmentDate.getMonth();
      renderCalendar(currentYear, currentMonth, userPetData);
    }
  });

  // NAVEGACION DE MESES
  prevMonthBtn.addEventListener('click', ()=>{
    currentMonth--;
    if(currentMonth < 0){ currentMonth = 11; currentYear--; }
    if(userPetData) renderCalendar(currentYear, currentMonth, userPetData);
  });

  nextMonthBtn.addEventListener('click', ()=>{
    currentMonth++;
    if(currentMonth > 11){ currentMonth = 0; currentYear++; }
    if(userPetData) renderCalendar(currentYear, currentMonth, userPetData);
  });

});
