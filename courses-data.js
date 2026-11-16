// Base de datos de cursos reales en Portugués / Español (100% activos y embeddables)

const CATEGORIES = [
  { id: 'all', pt: 'Tudo', es: 'Todo' },
  { id: 'musica', pt: 'Música', es: 'Música' },
  { id: 'idiomas', pt: 'Idiomas', es: 'Idiomas' },
  { id: 'fitness', pt: 'Fitness', es: 'Fitness' },
  { id: 'culinaria', pt: 'Culinária', es: 'Cocina' },
  { id: 'eletricidade', pt: 'Eletricidade', es: 'Electricidad' },
  { id: 'eletronica', pt: 'Eletrônica', es: 'Electrónica' },
  { id: 'bijuteria', pt: 'Bijuteria', es: 'Bisutería' },
  { id: 'mecanica', pt: 'Mecânica', es: 'Mecánica' },
  { id: 'barbearia', pt: 'Barbearia', es: 'Barbería' },
  { id: 'botanica', pt: 'Botânica', es: 'Botánica' },
  { id: 'informatica', pt: 'Informática', es: 'Informática' }
];

const COURSES_DB = [
  {
    id: 'violao-zero',
    category: 'musica',
    icon: '🎸',
    title: { pt: 'Violão do zero', es: 'Guitarra desde cero' },
    desc: {
      pt: 'Da primeira aula às primeiras cifras e batidas no violão.',
      es: 'Desde la primera clase hasta los primeros acordes y ritmos.'
    },
    lessons: [
      { id: 'v1', videoId: 'ZI2h7A1NM4A', title: { pt: 'Aula 1: Violão Iniciante Nível Zero', es: 'Clase 1: Guitarra Principiante Nivel Cero' }, duration: 12 },
      { id: 'v2', videoId: '7pXy-KsoX08', title: { pt: 'Aula 2: Como afinar o violão', es: 'Clase 2: Cómo afinar la guitarra' }, duration: 9 },
      { id: 'v3', videoId: '2q2DzggAv2Y', title: { pt: 'Aula 3: Como ler cifras no violão', es: 'Clase 3: Cómo leer cifrados en guitarra' }, duration: 11 },
      { id: 'v4', videoId: '2TD3u30oQtM', title: { pt: 'Aula 4: Primeiros acordes passo a passo', es: 'Clase 4: Primeros acordes paso a paso' }, duration: 14 }
    ]
  },
  {
    id: 'ingles-zero',
    category: 'idiomas',
    icon: '🗣️',
    title: { pt: 'Inglês do zero', es: 'Inglés desde cero' },
    desc: {
      pt: 'Suas primeiras aulas de inglês explicadas passo a passo.',
      es: 'Tus primeras clases de inglés explicadas paso a paso.'
    },
    lessons: [
      { id: 'i1', videoId: 'yaxRsYu1yUA', title: { pt: 'Aula 1: Inglês para iniciantes Nível 1', es: 'Clase 1: Inglés para principiantes Nivel 1' }, duration: 15 },
      { id: 'i2', videoId: 'fVZhgNAXMd0', title: { pt: 'Aula 2: Vocabulário e pronúncia básica', es: 'Clase 2: Vocabulario y pronunciación básica' }, duration: 14 },
      { id: 'i3', videoId: 'I3ZNPP5hE-M', title: { pt: 'Aula 3: Frases essenciais do dia a dia', es: 'Clase 3: Frases esenciales del día a día' }, duration: 16 },
      { id: 'i4', videoId: 'LdRwSzhyq6s', title: { pt: 'Aula 4: Conversação e compreensão', es: 'Clase 4: Conversación y comprensión' }, duration: 18 }
    ]
  },
  {
    id: 'treino-casa',
    category: 'fitness',
    icon: '💪',
    title: { pt: 'Treino Completo em Casa', es: 'Entrenamiento en Casa' },
    desc: {
      pt: 'Exercícios em casa para iniciantes sem precisar de equipamentos.',
      es: 'Ejercicios en casa para principiantes sin necesidad de equipo.'
    },
    lessons: [
      { id: 'f1', videoId: 'cSkf5WVGm1c', title: { pt: 'Aula 1: Treino completo para iniciantes', es: 'Clase 1: Entrenamiento completo principiantes' }, duration: 15 },
      { id: 'f2', videoId: 'kWcuMsv8TZg', title: { pt: 'Aula 2: Cardio e resistência em casa', es: 'Clase 2: Cardio y resistencia en casa' }, duration: 18 },
      { id: 'f3', videoId: 'd2UysV_BN5U', title: { pt: 'Aula 3: Alongamento e postura sem acessórios', es: 'Clase 3: Estiramiento y postura sin accesorios' }, duration: 12 }
    ]
  },
  {
    id: 'culinaria-pratica',
    category: 'culinaria',
    icon: '🍳',
    title: { pt: 'Culinária Básica & Técnicas', es: 'Cocina Básica y Técnicas' },
    desc: {
      pt: 'Cortes, utensílios, preparo de arroz soltinho e bases na cozinha.',
      es: 'Cortes, utensilios, preparación de arroz y bases en la cocina.'
    },
    lessons: [
      { id: 'c1', videoId: 'JBy8FVh6x7I', title: { pt: 'Aula 1: Tipos de cortes e utensílios', es: 'Clase 1: Tipos de cortes y utensilios' }, duration: 11 },
      { id: 'c2', videoId: 'SeDXen3LqrA', title: { pt: 'Aula 2: Como fazer arroz soltinho perfeito', es: 'Clase 2: Cómo hacer arroz suelto perfecto' }, duration: 10 },
      { id: 'c3', videoId: 'NW81R-rSjtE', title: { pt: 'Aula 3: Fundamentos de confeitaria e massas', es: 'Clase 3: Fundamentos de repostería y masas' }, duration: 14 }
    ]
  },
  {
    id: 'eletricidade-residencial',
    category: 'eletricidade',
    icon: '⚡',
    title: { pt: 'Eletricidade Residencial', es: 'Electricidad Residencial' },
    desc: {
      pt: 'Tensão, corrente, aterramento e instalações elétricas residenciais.',
      es: 'Voltaje, corriente, puesta a tierra e instalaciones residenciales.'
    },
    lessons: [
      { id: 'el1', videoId: 'kLUt4ZAJuPk', title: { pt: 'Aula 1: Tensão, corrente e resistência', es: 'Clase 1: Voltaje, corriente y resistencia' }, duration: 14 },
      { id: 'el2', videoId: 'tiCJVJ7Mb0U', title: { pt: 'Aula 2: O que é aterramento e normas NR10', es: 'Clase 2: Qué es puesta a tierra y seguridad' }, duration: 15 },
      { id: 'el3', videoId: 'Q6JvbT-oT4A', title: { pt: 'Aula 3: Instalações elétricas de baixa tensão', es: 'Clase 3: Instalaciones eléctricas de baja tensión' }, duration: 16 }
    ]
  },
  {
    id: 'eletronica-basica',
    category: 'eletronica',
    icon: '🔌',
    title: { pt: 'Eletrônica e Soldagem', es: 'Electrónica y Soldadura' },
    desc: {
      pt: 'Aprenda a soldar placas eletrônicas com estanho e fluxo do zero.',
      es: 'Aprende a soldar placas electrónicas con estaño y flux desde cero.'
    },
    lessons: [
      { id: 'et1', videoId: 'Ev27UDH7orM', title: { pt: 'Aula 1: Como soldar placas eletrônicas do zero', es: 'Clase 1: Cómo soldar placas electrónicas desde cero' }, duration: 13 },
      { id: 'et2', videoId: '8BpE065j_4k', title: { pt: 'Aula 2: Solda eletrônica perfeita com fluxo', es: 'Clase 2: Soldadura electrónica perfecta con flux' }, duration: 11 },
      { id: 'et3', videoId: 'fl5-JXiBzug', title: { pt: 'Aula 3: Prática de soldagem em componentes', es: 'Clase 3: Práctica de soldadura en componentes' }, duration: 18 }
    ]
  },
  {
    id: 'bijuteria-artesanal',
    category: 'bijuteria',
    icon: '📿',
    title: { pt: 'Bijuteria e Acessórios', es: 'Bisutería Artesanal' },
    desc: {
      pt: 'Ferramentas, montagem de colares, pulseiras e acabamentos profissionais.',
      es: 'Herramientas, armado de collares, pulseras y acabados profesionales.'
    },
    lessons: [
      { id: 'bj1', videoId: 'oAttYMp0bfE', title: { pt: 'Aula 1: Ferramentas e materiais básicos', es: 'Clase 1: Herramientas y materiales básicos' }, duration: 14 },
      { id: 'bj2', videoId: 's4ljLBbT1LQ', title: { pt: 'Aula 2: Pulseiras elásticas e de fecho', es: 'Clase 2: Pulseras elásticas y con broche' }, duration: 15 },
      { id: 'bj3', videoId: 'v1vIcVIHlf0', title: { pt: 'Aula 3: Acabamentos perfeitos em conjuntos', es: 'Clase 3: Acabados perfectos en conjuntos' }, duration: 12 }
    ]
  },
  {
    id: 'mecanica-motos',
    category: 'mecanica',
    icon: '🔧',
    title: { pt: 'Mecânica Básica de Motos', es: 'Mecánica Básica de Motos' },
    desc: {
      pt: 'Fundamentos do motor, elétrica básica e manutenção preventiva.',
      es: 'Fundamentos del motor, electricidad básica y mantenimiento.'
    },
    lessons: [
      { id: 'mc1', videoId: 'pZbeW2MXZsc', title: { pt: 'Aula 1: Introdução à mecânica de motos', es: 'Clase 1: Introducción a la mecánica de motos' }, duration: 20 },
      { id: 'mc2', videoId: 'BcymT9N6wKE', title: { pt: 'Aula 2: Mecânica, elétrica e injeção', es: 'Clase 2: Mecánica, electricidad e inyección' }, duration: 18 },
      { id: 'mc3', videoId: 'qTDA-Ffa99c', title: { pt: 'Aula 3: Componentes elétricos na prática', es: 'Clase 3: Componentes eléctricos en la práctica' }, duration: 15 }
    ]
  },
  {
    id: 'barbearia-profissional',
    category: 'barbearia',
    icon: '💈',
    title: { pt: 'Barbearia & Corte Degradê', es: 'Barbería y Corte Degradado' },
    desc: {
      pt: 'Técnicas de máquina, tesoura e passo a passo para corte degradê.',
      es: 'Técnicas de máquina, tijera y paso a paso para corte degradado.'
    },
    lessons: [
      { id: 'br1', videoId: 'SxLp6YxIzwc', title: { pt: 'Aula 1: Curso de barbeiro começando do zero', es: 'Clase 1: Curso de barbero desde cero' }, duration: 14 },
      { id: 'br2', videoId: 'hYF6NVAjlnI', title: { pt: 'Aula 2: Corte degradê passo a passo', es: 'Clase 2: Corte degradado paso a paso' }, duration: 16 },
      { id: 'br3', videoId: 'dJutW5FXmck', title: { pt: 'Aula 3: Técnicas profissionais de corte', es: 'Clase 3: Técnicas profesionales de corte' }, duration: 19 }
    ]
  },
  {
    id: 'botanica-cultivo',
    category: 'botanica',
    icon: '🌿',
    title: { pt: 'Botânica, Horta e Jardinagem', es: 'Botánica, Huerto y Jardinería' },
    desc: {
      pt: 'Cultivo orgânico, preparo do solo e cuidados essenciais com plantas.',
      es: 'Cultivo orgánico, preparación del suelo y cuidados de plantas.'
    },
    lessons: [
      { id: 'bt1', videoId: 'Y8a9CCSdZBY', title: { pt: 'Aula 1: Jardinagem sem mistérios', es: 'Clase 1: Jardinería sin misterios' }, duration: 12 },
      { id: 'bt2', videoId: '4viKW6y5Gl0', title: { pt: 'Aula 2: Começando o cultivo orgânico certo', es: 'Clase 2: Empezando el cultivo orgánico' }, duration: 15 }
    ]
  },
  {
    id: 'informatica-programacao',
    category: 'informatica',
    icon: '💻',
    title: { pt: 'Informática & Criação Web', es: 'Informática y Creación Web' },
    desc: {
      pt: 'Estrutura HTML, estilos CSS e responsividade na prática.',
      es: 'Estructura HTML, estilos CSS y diseño responsivo en la práctica.'
    },
    lessons: [
      { id: 'in1', videoId: '0Pm6ex5HDGY', title: { pt: 'Aula 1: Estrutura básica e comandos HTML', es: 'Clase 1: Estructura básica y comandos HTML' }, duration: 14 },
      { id: 'in2', videoId: 'ER2F3xJnWpg', title: { pt: 'Aula 2: Fundamentos de HTML e páginas web', es: 'Clase 2: Fundamentos de HTML y páginas web' }, duration: 16 },
      { id: 'in3', videoId: 'rAdHLNBTCgs', title: { pt: 'Aula 3: Responsividade na prática com CSS', es: 'Clase 3: Diseño responsivo en la práctica' }, duration: 18 }
    ]
  }
];
