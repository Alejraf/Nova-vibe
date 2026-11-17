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
    desc: { pt: 'Da primeira aula às primeiras cifras e batidas.', es: 'Desde la primera clase hasta los primeros acordes.' },
    lessons: [
      { id: 'v1', videoId: 'ZI2h7A1NM4A', title: { pt: 'Aula 1: Violão Iniciante Nível Zero', es: 'Clase 1: Guitarra Principiante' }, duration: 12 },
      { id: 'v2', videoId: '7pXy-KsoX08', title: { pt: 'Aula 2: Como afinar o violão', es: 'Clase 2: Cómo afinar la guitarra' }, duration: 9 },
      { id: 'v3', videoId: '2q2DzggAv2Y', title: { pt: 'Aula 3: Como ler cifras', es: 'Clase 3: Cómo leer cifrados' }, duration: 11 },
      { id: 'v4', videoId: '2TD3u30oQtM', title: { pt: 'Aula 4: Primeiros acordes', es: 'Clase 4: Primeros acordes' }, duration: 14 }
    ]
  },
  {
    id: 'ingles-zero',
    category: 'idiomas',
    icon: '🗣️',
    title: { pt: 'Inglês do zero', es: 'Inglés desde cero' },
    desc: { pt: 'Suas primeiras aulas de inglês explicadas passo a passo.', es: 'Tus primeras clases de inglés explicadas paso a paso.' },
    lessons: [
      { id: 'i1', videoId: 'yaxRsYu1yUA', title: { pt: 'Aula 1: Iniciantes Nível 1', es: 'Clase 1: Principiantes Nivel 1' }, duration: 15 },
      { id: 'i2', videoId: 'fVZhgNAXMd0', title: { pt: 'Aula 2: Vocabulário e pronúncia', es: 'Clase 2: Vocabulario y pronunciación' }, duration: 14 },
      { id: 'i3', videoId: 'I3ZNPP5hE-M', title: { pt: 'Aula 3: Frases essenciais', es: 'Clase 3: Frases esenciales' }, duration: 16 }
    ]
  },
  {
    id: 'treino-casa',
    category: 'fitness',
    icon: '💪',
    title: { pt: 'Treino Completo em Casa', es: 'Entrenamiento en Casa' },
    desc: { pt: 'Exercícios em casa para força e resistência.', es: 'Ejercicios en casa para fuerza y resistencia.' },
    lessons: [
      { id: 'f1', videoId: 'cSkf5WVGm1c', title: { pt: 'Aula 1: Treino completo iniciantes', es: 'Clase 1: Entrenamiento completo' }, duration: 15 },
      { id: 'f2', videoId: 'kWcuMsv8TZg', title: { pt: 'Aula 2: Cardio em casa', es: 'Clase 2: Cardio en casa' }, duration: 18 }
    ]
  },
  {
    id: 'culinaria-pratica',
    category: 'culinaria',
    icon: '🍳',
    title: { pt: 'Culinária Básica', es: 'Cocina Básica' },
    desc: { pt: 'Técnicas de corte e pratos essenciais.', es: 'Técnicas de corte y platos esenciales.' },
    lessons: [
      { id: 'c1', videoId: 'JBy8FVh6x7I', title: { pt: 'Aula 1: Cortes e utensílios', es: 'Clase 1: Cortes y utensilios' }, duration: 11 },
      { id: 'c2', videoId: 'SeDXen3LqrA', title: { pt: 'Aula 2: Arroz soltinho perfeito', es: 'Clase 2: Arroz perfecto' }, duration: 10 }
    ]
  },
  {
    id: 'eletricidade-residencial',
    category: 'eletricidade',
    icon: '⚡',
    title: { pt: 'Eletricidade Residencial', es: 'Electricidad Residencial' },
    desc: { pt: 'Instalações e normas de segurança.', es: 'Instalaciones y normas de seguridad.' },
    lessons: [
      { id: 'el1', videoId: 'kLUt4ZAJuPk', title: { pt: 'Aula 1: Tensão e corrente', es: 'Clase 1: Voltaje y corriente' }, duration: 14 },
      { id: 'el2', videoId: 'tiCJVJ7Mb0U', title: { pt: 'Aula 2: Aterramento e segurança', es: 'Clase 2: Puesta a tierra' }, duration: 15 }
    ]
  },
  {
    id: 'eletronica-basica',
    category: 'eletronica',
    icon: '🔌',
    title: { pt: 'Eletrônica e Soldagem', es: 'Electrónica y Soldadura' },
    desc: { pt: 'Solda com estanho e componentes.', es: 'Soldadura con estaño y componentes.' },
    lessons: [
      { id: 'et1', videoId: 'Ev27UDH7orM', title: { pt: 'Aula 1: Como soldar placas', es: 'Clase 1: Cómo soldar placas' }, duration: 13 },
      { id: 'et2', videoId: '8BpE065j_4k', title: { pt: 'Aula 2: Solda com fluxo', es: 'Clase 2: Soldadura con flux' }, duration: 11 }
    ]
  },
  {
    id: 'bijuteria-artesanal',
    category: 'bijuteria',
    icon: '📿',
    title: { pt: 'Bijuteria e Acessórios', es: 'Bisutería Artesanal' },
    desc: { pt: 'Crie pulseiras e colares para vender.', es: 'Crea pulseras y collares para vender.' },
    lessons: [
      { id: 'bj1', videoId: 'oAttYMp0bfE', title: { pt: 'Aula 1: Materiais básicos', es: 'Clase 1: Materiales básicos' }, duration: 14 },
      { id: 'bj2', videoId: 's4ljLBbT1LQ', title: { pt: 'Aula 2: Pulseiras elásticas', es: 'Clase 2: Pulseras elásticas' }, duration: 15 }
    ]
  },
  {
    id: 'mecanica-motos',
    category: 'mecanica',
    icon: '🔧',
    title: { pt: 'Mecânica Básica de Motos', es: 'Mecánica Básica de Motos' },
    desc: { pt: 'Manutenção preventiva e motor.', es: 'Mantenimiento preventivo y motor.' },
    lessons: [
      { id: 'mc1', videoId: 'pZbeW2MXZsc', title: { pt: 'Aula 1: Introdução à mecânica', es: 'Clase 1: Introducción a la mecánica' }, duration: 20 },
      { id: 'mc2', videoId: 'BcymT9N6wKE', title: { pt: 'Aula 2: Motor e injeção', es: 'Clase 2: Motor e inyección' }, duration: 18 }
    ]
  },
  {
    id: 'barbearia-profissional',
    category: 'barbearia',
    icon: '💈',
    title: { pt: 'Barbearia & Degradê', es: 'Barbería y Degradado' },
    desc: { pt: 'Cortes modernos e máquina.', es: 'Cortes modernos y máquina.' },
    lessons: [
      { id: 'br1', videoId: 'SxLp6YxIzwc', title: { pt: 'Aula 1: Curso de barbeiro', es: 'Clase 1: Curso de barbero' }, duration: 14 },
      { id: 'br2', videoId: 'hYF6NVAjlnI', title: { pt: 'Aula 2: Corte degradê passo a passo', es: 'Clase 2: Degradado paso a paso' }, duration: 16 }
    ]
  },
  {
    id: 'botanica-cultivo',
    category: 'botanica',
    icon: '🌿',
    title: { pt: 'Botânica e Horta', es: 'Botánica y Huerto' },
    desc: { pt: 'Cultivo orgânico em casa.', es: 'Cultivo orgánico en casa.' },
    lessons: [
      { id: 'bt1', videoId: 'Y8a9CCSdZBY', title: { pt: 'Aula 1: Jardinagem básica', es: 'Clase 1: Jardinería básica' }, duration: 12 },
      { id: 'bt2', videoId: '4viKW6y5Gl0', title: { pt: 'Aula 2: Cultivo orgânico', es: 'Clase 2: Cultivo orgánico' }, duration: 15 }
    ]
  },
  {
    id: 'informatica-programacao',
    category: 'informatica',
    icon: '💻',
    title: { pt: 'Criação Web', es: 'Creación Web' },
    desc: { pt: 'HTML e CSS do zero.', es: 'HTML y CSS desde cero.' },
    lessons: [
      { id: 'in1', videoId: '0Pm6ex5HDGY', title: { pt: 'Aula 1: HTML básico', es: 'Clase 1: HTML básico' }, duration: 14 },
      { id: 'in2', videoId: 'ER2F3xJnWpg', title: { pt: 'Aula 2: Páginas web', es: 'Clase 2: Páginas web' }, duration: 16 }
    ]
  }
];
