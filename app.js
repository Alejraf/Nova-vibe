const I18N = {
  pt: {
    subtitle: "Aprenda com vídeos: rotas, notas e progresso",
    continue_default: "Continuar: Violão do zero - Aula 1",
    continue_prefix: "Continuar",
    today: "Hoje",
    streak: "Sequência",
    day_unit: "dia",
    days_unit: "dias",
    goal: "Meta",
    routes_title: "Rotas para começar",
    routes_subtitle: "Escolha um tema e comece sem procurar nada.",
    watched: "assistidos",
    btn_continue: "Continuar",
    btn_start: "Começar",
    search_label: "🔍 Pesquisar vídeo ou colar link do YouTube",
    search_placeholder: "Pesquise um tema ou cole o link...",
    search_btn: "Buscar",
    search_results_title: "Resultados da Pesquisa",
    player_empty: "Escolha uma rota acima, pesquise um vídeo ou cole um link para reproduzi-lo aqui dentro.",
    mark_done: "Concluir aula",
    marked_done: "Aula concluída ✓",
    course_modules: "Módulos do Curso",
    my_notes: "Minhas anotações",
    saved: "Salvo offline!",
    notes_placeholder: "Escreva pontos importantes desta aula (salvo no celular)...",
    export_notes: "📥 Baixar TXT",
    goal_prompt: "Defina sua meta diária em minutos (ex: 10, 15, 30):",
    terms_link: "Termos de Uso & Política de Privacidade",
    achievements_title: "🏆 Conquistas & Metas",
    achievements_desc: "Desbloqueie insígnias ao manter sua consistência de estudo."
  },
  es: {
    subtitle: "Aprende con videos: rutas, notas y progreso",
    continue_default: "Continuar: Guitarra desde cero - Clase 1",
    continue_prefix: "Continuar",
    today: "Hoy",
    streak: "Racha",
    day_unit: "día",
    days_unit: "días",
    goal: "Meta",
    routes_title: "Rutas para empezar",
    routes_subtitle: "Elige un tema y empieza sin buscar nada.",
    watched: "vistos",
    btn_continue: "Continuar",
    btn_start: "Empezar",
    search_label: "🔍 Buscar video o pegar enlace de YouTube",
    search_placeholder: "Busca un tema o pega el enlace...",
    search_btn: "Buscar",
    search_results_title: "Resultados de la Búsqueda",
    player_empty: "Elige una ruta arriba, busca un video o pega un enlace para reproducirlo aquí dentro.",
    mark_done: "Completar clase",
    marked_done: "Clase completada ✓",
    course_modules: "Módulos del Curso",
    my_notes: "Mis anotaciones",
    saved: "¡Guardado offline!",
    notes_placeholder: "Escribe puntos importantes de esta clase (guardado en el cel)...",
    export_notes: "📥 Descargar TXT",
    goal_prompt: "Define tu meta diaria en minutos (ej: 10, 15, 30):",
    terms_link: "Términos de Uso y Política de Privacidad",
    achievements_title: "🏆 Logros y Metas",
    achievements_desc: "Desbloquea insignias al mantener tu constancia de estudio."
  }
};

// Si deseas usar la API oficial de YouTube, coloca tu clave aquí (opcional)
const YOUTUBE_API_KEY = '';

const BADGES_DEF = [
  { id: 'first_step', icon: '🎯', titlePt: 'Primeiro Passo', titleEs: 'Primer Paso' },
  { id: 'streak_3', icon: '🔥', titlePt: 'Foco Total', titleEs: 'Enfoque Total' },
  { id: 'scholar', icon: '🎓', titlePt: 'Estudioso', titleEs: 'Estudioso' }
];

let appState = {
  lang: 'pt',
  selectedCategory: 'all',
  dailyGoalMinutes: 10,
  todayMinutes: 0,
  lastActiveDate: new Date().toISOString().slice(0, 10),
  streakDays: 1,
  completedLessons: [],
  notes: {},
  lastPlayed: {
    courseId: 'violao-zero',
    lessonId: 'v1',
    videoId: 'ZI2h7A1NM4A',
    titlePt: 'Violão do zero - Aula 1',
    titleEs: 'Guitarra desde cero - Clase 1'
  }
};

let ytPlayer = null;
let ytApiReady = false;
let currentCourseId = null;
let currentLessonId = null;
let currentVideoId = null;
let watchTimerInterval = null;

document.addEventListener('DOMContentLoaded', () => {
  loadState();
  checkDailyReset();
  applyLanguage(appState.lang);
  renderCategories();
  renderCourses();
  renderBadges();
  updateProgressUI();
});

function loadState() {
  const saved = localStorage.getItem('vibra_apk_state_v4');
  if (saved) {
    try {
      const parsed = JSON.parse(saved);
      appState = { ...appState, ...parsed };
    } catch (e) {
      console.error('Error cargando estado:', e);
    }
  }
}

function saveState() {
  localStorage.setItem('vibra_apk_state_v4', JSON.stringify(appState));
}

function checkDailyReset() {
  const todayStr = new Date().toISOString().slice(0, 10);
  if (appState.lastActiveDate !== todayStr) {
    const yesterday = new Date(Date.now() - 86400000).toISOString().slice(0, 10);
    if (appState.lastActiveDate === yesterday && appState.todayMinutes > 0) {
      appState.streakDays += 1;
    } else if (appState.lastActiveDate !== yesterday) {
      appState.streakDays = 1;
    }
    appState.todayMinutes = 0;
    appState.lastActiveDate = todayStr;
    saveState();
  }
}

function setLanguage(lang) {
  appState.lang = lang;
  saveState();
  applyLanguage(lang);
  renderCategories();
  renderCourses();
  renderBadges();
  updateProgressUI();
  if (currentCourseId) renderCourseLessons(currentCourseId);
}

function applyLanguage(lang) {
  document.documentElement.lang = lang;
  document.getElementById('btn-es').classList.toggle('active', lang === 'es');
  document.getElementById('btn-pt').classList.toggle('active', lang === 'pt');

  const dict = I18N[lang];
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    if (dict[key]) el.textContent = dict[key];
  });

  document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
    const key = el.getAttribute('data-i18n-placeholder');
    if (dict[key]) el.placeholder = dict[key];
  });
}

function renderCategories() {
  const container = document.getElementById('category-tabs');
  container.innerHTML = '';
  CATEGORIES.forEach(cat => {
    const btn = document.createElement('button');
    btn.className = `cat-pill ${appState.selectedCategory === cat.id ? 'active' : ''}`;
    btn.textContent = cat[appState.lang];
    btn.onclick = () => {
      appState.selectedCategory = cat.id;
      renderCategories();
      renderCourses();
    };
    container.appendChild(btn);
  });
}

function renderCourses() {
  const grid = document.getElementById('courses-grid');
  grid.innerHTML = '';
  const dict = I18N[appState.lang];

  const filtered = appState.selectedCategory === 'all'
    ? COURSES_DB
    : COURSES_DB.filter(c => c.category === appState.selectedCategory);

  filtered.forEach(course => {
    const total = course.lessons.length;
    const completedCount = course.lessons.filter(l => appState.completedLessons.includes(l.id)).length;
    const btnLabel = completedCount > 0 ? dict.btn_continue : dict.btn_start;

    const card = document.createElement('div');
    card.className = 'course-card';
    card.innerHTML = `
      <div>
        <div class="course-icon">${course.icon}</div>
        <div class="course-title">${course.title[appState.lang]}</div>
        <div class="course-desc">${course.desc[appState.lang]}</div>
      </div>
      <div class="course-footer">
        <div class="course-progress-label">${completedCount}/${total} ${dict.watched}</div>
        <button class="btn-card-action" onclick="openCourse('${course.id}')">${btnLabel}</button>
      </div>
    `;
    grid.appendChild(card);
  });
}

function renderBadges() {
  const grid = document.getElementById('badges-grid');
  grid.innerHTML = '';
  const isUnlocked1 = appState.completedLessons.length >= 1;
  const isUnlocked2 = appState.streakDays >= 3;
  const isUnlocked3 = appState.completedLessons.length >= 5;

  const statusList = [isUnlocked1, isUnlocked2, isUnlocked3];

  BADGES_DEF.forEach((badge, idx) => {
    const unlocked = statusList[idx];
    const div = document.createElement('div');
    div.className = `badge-item ${unlocked ? 'unlocked' : ''}`;
    div.innerHTML = `
      <div class="badge-icon">${badge.icon}</div>
      <div class="badge-name">${badge.titlePt}</div>
    `;
    grid.appendChild(div);
  });
}

function openCourse(courseId) {
  const course = COURSES_DB.find(c => c.id === courseId);
  if (!course) return;
  const nextLesson = course.lessons.find(l => !appState.completedLessons.includes(l.id)) || course.lessons[0];
  playLesson(course.id, nextLesson.id);
}

function playLesson(courseId, lessonId) {
  const course = COURSES_DB.find(c => c.id === courseId);
  if (!course) return;
  const lesson = course.lessons.find(l => l.id === lessonId);
  if (!lesson) return;

  currentCourseId = course.id;
  currentLessonId = lesson.id;
  currentVideoId = lesson.videoId;

  appState.lastPlayed = {
    courseId: course.id,
    lessonId: lesson.id,
    videoId: lesson.videoId,
    titlePt: `${course.title.pt} - ${lesson.title.pt}`,
    titleEs: `${course.title.es} - ${lesson.title.es}`
  };
  saveState();
  updateProgressUI();

  const displayTitle = appState.lang === 'pt' ? appState.lastPlayed.titlePt : appState.lastPlayed.titleEs;
  loadYouTubeVideo(lesson.videoId, displayTitle, true);
  renderCourseLessons(course.id);
}

function continueLastVideo() {
  if (appState.lastPlayed.courseId && appState.lastPlayed.lessonId) {
    playLesson(appState.lastPlayed.courseId, appState.lastPlayed.lessonId);
  } else if (appState.lastPlayed.videoId) {
    const title = appState.lang === 'pt' ? appState.lastPlayed.titlePt : appState.lastPlayed.titleEs;
    loadYouTubeVideo(appState.lastPlayed.videoId, title, false);
  }
}

function renderCourseLessons(courseId) {
  const course = COURSES_DB.find(c => c.id === courseId);
  const box = document.getElementById('course-lessons-box');
  const list = document.getElementById('lessons-list');

  if (!course) {
    box.classList.add('hidden');
    return;
  }

  box.classList.remove('hidden');
  list.innerHTML = '';

  course.lessons.forEach((lesson, idx) => {
    const isDone = appState.completedLessons.includes(lesson.id);
    const isActive = lesson.id === currentLessonId;
    const li = document.createElement('li');
    li.className = `lesson-item ${isActive ? 'active' : ''}`;
    li.onclick = () => playLesson(course.id, lesson.id);
    li.innerHTML = `
      <span>${idx + 1}. ${lesson.title[appState.lang]} (${lesson.duration}m)</span>
      <span class="lesson-status">${isDone ? '✓' : '▶'}</span>
    `;
    list.appendChild(li);
  });
}

function onYouTubeIframeAPIReady() {
  ytApiReady = true;
}

function loadYouTubeVideo(videoId, title, isCourseLesson) {
  currentVideoId = videoId;
  if (!isCourseLesson) {
    currentCourseId = null;
    currentLessonId = null;
    document.getElementById('course-lessons-box').classList.add('hidden');
  }

  document.getElementById('empty-player-msg').classList.add('hidden');
  document.getElementById('active-workspace').classList.remove('hidden');
  document.getElementById('active-video-title').textContent = title;

  document.getElementById('video-notes-area').value = appState.notes[videoId] || '';
  updateCompleteButtonUI();

  document.getElementById('player-section').scrollIntoView({ behavior: 'smooth', block: 'nearest' });

  if (ytPlayer && typeof ytPlayer.loadVideoById === 'function') {
    ytPlayer.loadVideoById(videoId);
  } else if (ytApiReady) {
    ytPlayer = new YT.Player('youtube-player', {
      videoId: videoId,
      playerVars: { playsinline: 1, rel: 0, modestbranding: 1 },
      events: { onStateChange: onPlayerStateChange }
    });
  } else {
    const wrapper = document.getElementById('video-wrapper');
    wrapper.innerHTML = `<iframe src="https://www.youtube.com/embed/${videoId}?autoplay=1&playsinline=1&rel=0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`;
  }
}

function onPlayerStateChange(event) {
  if (event.data === 1) {
    startWatchTimer();
  } else {
    stopWatchTimer();
  }
}

function startWatchTimer() {
  if (watchTimerInterval) return;
  watchTimerInterval = setInterval(() => {
    appState.todayMinutes += 1;
    saveState();
    updateProgressUI();
  }, 60000);
}

function stopWatchTimer() {
  if (watchTimerInterval) {
    clearInterval(watchTimerInterval);
    watchTimerInterval = null;
  }
}

function extractYouTubeId(url) {
  const regExp = /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?|shorts)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/;
  const match = url.trim().match(regExp);
  return match ? match[1] : null;
}

function handleSearchKeyPress(e) {
  if (e.key === 'Enter') {
    executeYouTubeSearch();
  }
}

async function executeYouTubeSearch() {
  const input = document.getElementById('youtube-url-input');
  const query = input.value.trim();
  if (!query) return;

  const directId = extractYouTubeId(query);
  if (directId) {
    document.getElementById('search-results-box').classList.add('hidden');
    loadYouTubeVideo(directId, `YouTube Video (${directId})`, false);
    input.value = '';
    return;
  }

  const resultsBox = document.getElementById('search-results-box');
  const resultsList = document.getElementById('search-results-list');
  resultsList.innerHTML = '<div style="padding: 8px; font-size: 0.8rem; color: var(--text-secondary);">Buscando...</div>';
  resultsBox.classList.remove('hidden');

  // Si el usuario configuró su clave de API oficial de YouTube
  if (YOUTUBE_API_KEY && YOUTUBE_API_KEY.length > 5) {
    try {
      const response = await fetch(`https://www.googleapis.com/youtube/v3/search?part=snippet&type=video&maxResults=6&q=${encodeURIComponent(query)}&key=${YOUTUBE_API_KEY}`);
      const data = await response.json();
      resultsList.innerHTML = '';
      if (data && data.items) {
        data.items.forEach(item => {
          const videoId = item.id.videoId;
          const title = item.snippet.title;
          const div = document.createElement('div');
          div.className = 'search-result-item';
          div.innerHTML = `
            <img src="https://img.youtube.com/vi/${videoId}/hqdefault.jpg" alt="thumb" />
            <div>
              <div style="font-weight: 600; font-size: 0.82rem; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden;">${title}</div>
              <div style="font-size: 0.72rem; color: var(--text-secondary);">YouTube</div>
            </div>
          `;
          div.onclick = () => {
            resultsBox.classList.add('hidden');
            loadYouTubeVideo(videoId, title, false);
            input.value = '';
          };
          resultsList.appendChild(div);
        });
        return;
      }
    } catch (e) {
      console.log('Error con API oficial, usando respaldo');
    }
  }

  // Respaldo interno filtrando cursos y catálogo de lecciones
  resultsList.innerHTML = '';
  let matches = [];
  COURSES_DB.forEach(course => {
    course.lessons.forEach(lesson => {
      const titlePt = lesson.title.pt.toLowerCase();
      const titleEs = lesson.title.es.toLowerCase();
      const q = query.toLowerCase();
      if (titlePt.includes(q) || titleEs.includes(q) || course.title.pt.toLowerCase().includes(q)) {
        matches.push({
          videoId: lesson.videoId,
          title: appState.lang === 'pt' ? lesson.title.pt : lesson.title.es,
          courseName: course.title[appState.lang]
        });
      }
    });
  });

  if (matches.length === 0) {
    matches.push({
      videoId: 'ZI2h7A1NM4A',
      title: query,
      courseName: 'Vibra Search'
    });
  }

  matches.forEach(item => {
    const div = document.createElement('div');
    div.className = 'search-result-item';
    div.innerHTML = `
      <img src="https://img.youtube.com/vi/${item.videoId}/hqdefault.jpg" alt="thumb" />
      <div>
        <div style="font-weight: 600; font-size: 0.82rem;">${item.title}</div>
        <div style="font-size: 0.72rem; color: var(--text-secondary);">${item.courseName}</div>
      </div>
    `;
    div.onclick = () => {
      resultsBox.classList.add('hidden');
      loadYouTubeVideo(item.videoId, item.title, false);
      input.value = '';
    };
    resultsList.appendChild(div);
  });
}

function toggleCurrentLessonComplete() {
  const targetId = currentLessonId || currentVideoId;
  if (!targetId) return;

  const idx = appState.completedLessons.indexOf(targetId);
  if (idx === -1) {
    appState.completedLessons.push(targetId);
    if (appState.todayMinutes < appState.dailyGoalMinutes) {
      appState.todayMinutes += 3;
    }
  } else {
    appState.completedLessons.splice(idx, 1);
  }

  saveState();
  updateCompleteButtonUI();
  updateProgressUI();
  renderCourses();
  renderBadges();
  if (currentCourseId) renderCourseLessons(currentCourseId);
}

function updateCompleteButtonUI() {
  const targetId = currentLessonId || currentVideoId;
  const btn = document.getElementById('btn-mark-complete');
  const dict = I18N[appState.lang];
  const isDone = appState.completedLessons.includes(targetId);

  btn.classList.toggle('completed', isDone);
  btn.innerHTML = isDone ? `✓ <span>${dict.marked_done}</span>` : `✓ <span>${dict.mark_done}</span>`;
}

let noteTimeout = null;
function saveCurrentNote() {
  if (!currentVideoId) return;
  const text = document.getElementById('video-notes-area').value;
  appState.notes[currentVideoId] = text;
  saveState();

  const badge = document.getElementById('note-saved-badge');
  badge.classList.remove('hidden');
  clearTimeout(noteTimeout);
  noteTimeout = setTimeout(() => badge.classList.add('hidden'), 1500);
}

function exportNotesAsText() {
  if (!currentVideoId || !appState.notes[currentVideoId]) {
    alert(appState.lang === 'pt' ? 'Nenhuma anotação encontrada para baixar.' : 'No hay notas para descargar.');
    return;
  }
  const text = `Vibra App - Notes\nVideo ID: ${currentVideoId}\n-------------------\n` + appState.notes[currentVideoId];
  const blob = new Blob([text], { type: 'text/plain;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `Vibra-Anotacoes-${currentVideoId}.txt`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

function updateProgressUI() {
  const dict = I18N[appState.lang];
  document.getElementById('today-minutes').textContent = appState.todayMinutes;
  document.getElementById('goal-target').textContent = appState.dailyGoalMinutes;
  document.getElementById('goal-btn-val').textContent = appState.dailyGoalMinutes;
  document.getElementById('streak-days').textContent = appState.streakDays;

  const pct = Math.min(100, Math.round((appState.todayMinutes / appState.dailyGoalMinutes) * 100));
  document.getElementById('daily-progress-fill').style.width = `${pct}%`;

  const lastTitle = appState.lang === 'pt' ? appState.lastPlayed.titlePt : appState.lastPlayed.titleEs;
  document.getElementById('last-video-label').textContent = `${dict.continue_prefix}: ${lastTitle}`;
}

function changeDailyGoal() {
  const newGoal = prompt(I18N[appState.lang].goal_prompt, appState.dailyGoalMinutes);
  const parsed = parseInt(newGoal, 10);
  if (!isNaN(parsed) && parsed >= 5 && parsed <= 240) {
    appState.dailyGoalMinutes = parsed;
    saveState();
    updateProgressUI();
  }
}
