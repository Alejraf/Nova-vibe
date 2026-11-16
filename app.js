// =========================================================================
// VIBRA APP - LÓGICA COMPLETA (YouTube Oficial API, Cursos, Notas, i18n)
// =========================================================================

// Opcional: Pega aquí tu API Key de YouTube Data API v3 si deseas habilitar el buscador inferior.
const YOUTUBE_DATA_API_KEY = "";

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
    ad_space: "Espaço reservado para Banner Monetag (320x50)",
    ad_space_bottom: "Espaço reservado para Banner Monetag Inferior",
    routes_title: "Rotas para começar",
    routes_subtitle: "Escolha um tema e comece sem procurar nada.",
    watched: "assistidos",
    btn_continue: "Continuar",
    btn_start: "Começar",
    paste_placeholder: "Cole um link do YouTube aqui...",
    play_btn: "Abrir",
    player_empty: "Escolha uma rota acima ou cole um link do YouTube e toque no vídeo para reproduzi-lo.",
    mark_done: "Concluir aula",
    marked_done: "Aula concluída ✓",
    course_modules: "Módulos do Curso",
    my_notes: "Minhas anotações",
    saved: "Salvo!",
    notes_placeholder: "Escreva pontos importantes desta aula...",
    search_yt_title: "Buscar aulas no YouTube",
    search_placeholder: "Ex: Curso de eletrônica básica...",
    search_btn: "Buscar",
    invalid_link: "Por favor, cole um link válido do YouTube.",
    goal_prompt: "Defina sua meta diária em minutos (ex: 10, 15, 30):",
    terms_link: "Termos de Uso & Política de Privacidade"
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
    ad_space: "Espacio reservado para Banner Monetag (320x50)",
    ad_space_bottom: "Espacio reservado para Banner Monetag Inferior",
    routes_title: "Rutas para empezar",
    routes_subtitle: "Elige un tema y empieza sin buscar nada.",
    watched: "vistos",
    btn_continue: "Continuar",
    btn_start: "Empezar",
    paste_placeholder: "Pega un enlace de YouTube aquí...",
    play_btn: "Abrir",
    player_empty: "Elige una ruta arriba o pega un enlace de YouTube y toca el video para reproducirlo.",
    mark_done: "Completar clase",
    marked_done: "Clase completada ✓",
    course_modules: "Módulos del Curso",
    my_notes: "Mis anotaciones",
    saved: "¡Guardado!",
    notes_placeholder: "Escribe puntos importantes de esta clase...",
    search_yt_title: "Buscar clases en YouTube",
    search_placeholder: "Ej: Curso de electrónica básica...",
    search_btn: "Buscar",
    invalid_link: "Por favor, pega un enlace válido de YouTube.",
    goal_prompt: "Define tu meta diaria en minutos (ej: 10, 15, 30):",
    terms_link: "Términos de Uso y Política de Privacidad"
  }
};

// Estado persistente en LocalStorage
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
  updateProgressUI();
});

function loadState() {
  const saved = localStorage.getItem('vibra_app_state_v2');
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
  localStorage.setItem('vibra_app_state_v2', JSON.stringify(appState));
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
  updateProgressUI();
  if (currentCourseId) {
    renderCourseLessons(currentCourseId);
  }
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
      playerVars: {
        playsinline: 1,
        rel: 0,
        modestbranding: 1
      },
      events: {
        onStateChange: onPlayerStateChange
      }
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

function loadCustomYouTubeLink() {
  const input = document.getElementById('youtube-url-input');
  const videoId = extractYouTubeId(input.value);
  if (!videoId) {
    alert(I18N[appState.lang].invalid_link);
    return;
  }

  const customTitle = `YouTube Video (${videoId})`;
  appState.lastPlayed = {
    courseId: null,
    lessonId: null,
    videoId: videoId,
    titlePt: customTitle,
    titleEs: customTitle
  };
  saveState();
  updateProgressUI();
  loadYouTubeVideo(videoId, customTitle, false);
  input.value = '';
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

async function searchYouTubeVideos() {
  const query = document.getElementById('yt-search-query').value.trim();
  if (!query) return;

  const resultsBox = document.getElementById('search-results-list');

  if (!YOUTUBE_DATA_API_KEY) {
    const ytSearchUrl = `https://www.youtube.com/results?search_query=${encodeURIComponent(query)}`;
    window.open(ytSearchUrl, '_blank', 'noopener');
    return;
  }

  resultsBox.innerHTML = '<p style="font-size:0.8rem;color:#a59ec2;">Buscando...</p>';
  try {
    const endpoint = `https://www.googleapis.com/youtube/v3/search?part=snippet&type=video&videoEmbeddable=true&maxResults=5&q=${encodeURIComponent(query)}&key=${YOUTUBE_DATA_API_KEY}`;
    const res = await fetch(endpoint);
    const data = await res.json();

    resultsBox.innerHTML = '';
    (data.items || []).forEach(item => {
      const vidId = item.id.videoId;
      const title = item.snippet.title;
      const thumb = item.snippet.thumbnails.medium.url;

      const div = document.createElement('div');
      div.className = 'search-item';
      div.onclick = () => loadYouTubeVideo(vidId, title, false);
      div.innerHTML = `
        <img src="${thumb}" alt="thumb" loading="lazy" />
        <div class="search-item-title">${title}</div>
      `;
      resultsBox.appendChild(div);
    });
  } catch (err) {
    resultsBox.innerHTML = '<p style="font-size:0.8rem;color:#f43f8e;">Error al consultar YouTube API.</p>';
  }
}
