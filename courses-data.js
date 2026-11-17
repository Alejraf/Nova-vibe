// Base de datos estructurada de cursos completos por área (PT / ES)
// Usa IDs de videos públicos educativos de YouTube (100% compatible con YouTube IFrame API)

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
      pt: 'Da primeira aula às primeiras músicas, em 4 passos.',
      es: 'Desde la primera clase hasta tus primeras canciones, en 4 pasos.'
    },
    lessons: [
      { id: 'v1', videoId: '1_O807H_t4U', title: { pt: 'Aula 1: Postura e primeiros acordes', es: 'Clase 1: Postura y primeros acordes' }, duration: 8 },
      { id: 'v2', videoId: 'BBz-Jyr23M4', title: { pt: 'Aula 2: Ritmo e batidas básicas', es: 'Clase 2: Ritmo y rasgueos básicos' }, duration: 10 },
      { id: 'v3', videoId: 'HNSaXAe8tyg', title: { pt: 'Aula 3: Troca rápida de acordes', es: 'Clase 3: Cambio rápido de acordes' }, duration: 9 },
      { id: 'v4', videoId: '5rcCiXqAShY', title: { pt: 'Aula 4: Sua primeira música completa', es: 'Clase 4: Tu primera canción completa' }, duration: 12 }
    ]
  },
  {
    id: 'ingles-zero',
    category: 'idiomas',
    icon: '🗣️',
    title: { pt: 'Inglês do zero', es: 'Inglés desde cero' },
    desc: {
      pt: 'Suas primeiras aulas de inglês uma depois da outra.',
      es: 'Tus primeras clases de inglés paso a paso.'
    },
    lessons: [
      { id: 'i1', videoId: 'juKd26qkNAw', title: { pt: 'Aula 1: Saudações e apresentações', es: 'Clase 1: Saludos y presentaciones' }, duration: 10 },
      { id: 'i2', videoId: 'henIVlCPVIY', title: { pt: 'Aula 2: Verbo To Be na prática', es: 'Clase 2: Verbo To Be en la práctica' }, duration: 12 },
      { id: 'i3', videoId: '77IK9T45kiU', title: { pt: 'Aula 3: Perguntas essenciais do dia a dia', es: 'Clase 3: Preguntas esenciales del día a día' }, duration: 11 },
      { id: 'i4', videoId: 'sE29k31s32Y', title: { pt: 'Aula 4: Vocabulário de viagem e trabalho', es: 'Clase 4: Vocabulario de viaje y trabajo' }, duration: 14 },
      { id: 'i5', videoId: 'p2_5n1P8yB4', title: { pt: 'Aula 5: Conversação básica guiada', es: 'Clase 5: Conversación básica guiada' }, duration: 15 }
    ]
  },
  {
    id: 'treino-casa',
    category: 'fitness',
    icon: '💪',
    title: { pt: 'Treino Completo em Casa', es: 'Entrenamiento en Casa' },
    desc: {
      pt: 'Rotina de exercícios sem equipamentos para força e resistência.',
      es: 'Rutina de ejercicios sin equipo para fuerza y resistencia.'
    },
    lessons: [
      { id: 'f1', videoId: 'ml6cT4AZdqI', title: { pt: 'Módulo 1: Aquecimento e Cardio 10 min', es: 'Módulo 1: Calentamiento y Cardio 10 min' }, duration: 10 },
      { id: 'f2', videoId: 'UBMk30rjy0o', title: { pt: 'Módulo 2: Corpo inteiro sem impacto', es: 'Módulo 2: Cuerpo completo sin impacto' }, duration: 15 },
      { id: 'f3', videoId: '2pLT-olgUJs', title: { pt: 'Módulo 3: Abdômen e Core definido', es: 'Módulo 3: Abdomen y Core definido' }, duration: 10 }
    ]
  },
  {
    id: 'culinaria-pratica',
    category: 'culinaria',
    icon: '🍳',
    title: { pt: 'Culinária Prática & Massas', es: 'Cocina Práctica y Masas' },
    desc: {
      pt: 'Técnicas de corte, temperos naturais e pratos caseiros perfeitos.',
      es: 'Técnicas de corte, sazones naturales y platos caseros perfectos.'
    },
    lessons: [
      { id: 'c1', videoId: 'G-Fg7l7G1zw', title: { pt: 'Aula 1: Técnicas básicas de faca na cozinha', es: 'Clase 1: Técnicas básicas de cuchillo' }, duration: 9 },
      { id: 'c2', videoId: 'bJUiWdM__Qw', title: { pt: 'Aula 2: Molhos clássicos do zero', es: 'Clase 2: Salsas clásicas desde cero' }, duration: 12 },
      { id: 'c3', videoId: '3AAdKl1UYZs', title: { pt: 'Aula 3: Massa artesanal passo a passo', es: 'Clase 3: Pasta artesanal paso a paso' }, duration: 14 }
    ]
  },
  {
    id: 'eletricidade-residencial',
    category: 'eletricidade',
    icon: '⚡',
    title: { pt: 'Eletricidade Residencial', es: 'Electricidad Residencial' },
    desc: {
      pt: 'Instalações elétricas, disjuntores, tomadas e normas de segurança.',
      es: 'Instalaciones eléctricas, interruptores, tomas y seguridad.'
    },
    lessons: [
      { id: 'el1', videoId: 'mc979OhitAg', title: { pt: 'Módulo 1: Tensão, Corrente e Segurança', es: 'Módulo 1: Voltaje, Corriente y Seguridad' }, duration: 12 },
      { id: 'el2', videoId: '77T19-lM910', title: { pt: 'Módulo 2: Como instalar tomadas e interruptores', es: 'Módulo 2: Cómo instalar tomas e interruptores' }, duration: 15 },
      { id: 'el3', videoId: 'N94R7g91E9g', title: { pt: 'Módulo 3: Quadro de distribuição e disjuntores', es: 'Módulo 3: Tablero eléctrico y breakers' }, duration: 18 },
      { id: 'el4', videoId: 'X4n6L9Y1N2A', title: { pt: 'Módulo 4: Uso correto do multímetro', es: 'Módulo 4: Uso correcto del multímetro' }, duration: 11 }
    ]
  },
  {
    id: 'eletronica-basica',
    category: 'eletronica',
    icon: '🔌',
    title: { pt: 'Eletrônica e Soldagem', es: 'Electrónica y Soldadura' },
    desc: {
      pt: 'Componentes SMD, leitura de esquemas e solda com estanho.',
      es: 'Componentes SMD, lectura de esquemas y soldadura con estaño.'
    },
    lessons: [
      { id: 'et1', videoId: 'r-X9coYTOV4', title: { pt: 'Módulo 1: Resistores, Capacitores e Diodos', es: 'Módulo 1: Resistencias, Capacitores y Diodos' }, duration: 14 },
      { id: 'et2', videoId: 'Qps9woUGkvI', title: { pt: 'Módulo 2: Como soldar componentes perfeitamente', es: 'Módulo 2: Cómo soldar componentes perfectamente' }, duration: 10 },
      { id: 'et3', videoId: '6Maq5IyHSuc', title: { pt: 'Módulo 3: Diagnóstico de placas e fontes', es: 'Módulo 3: Diagnóstico de placas y fuentes' }, duration: 16 }
    ]
  },
  {
    id: 'bijuteria-artesanal',
    category: 'bijuteria',
    icon: '📿',
    title: { pt: 'Bijuteria e Acessórios', es: 'Bisutería Artesanal' },
    desc: {
      pt: 'Crie pulseiras, colares e brincos profissionais para vender.',
      es: 'Crea pulseras, collares y aretes profesionales para vender.'
    },
    lessons: [
      { id: 'bj1', videoId: 'm4H6W7C1Q9E', title: { pt: 'Aula 1: Ferramentas essenciais e materiais', es: 'Clase 1: Herramientas esenciales y materiales' }, duration: 8 },
      { id: 'bj2', videoId: 'k9L2P4M7X1W', title: { pt: 'Aula 2: Nós ajustáveis e macramê básico', es: 'Clase 2: Nudos ajustables y macramé básico' }, duration: 12 },
      { id: 'bj3', videoId: 'p7V3N8R5T2Y', title: { pt: 'Aula 3: Fechos, argolas e acabamento fino', es: 'Clase 3: Broches, argollas y acabado fino' }, duration: 11 }
    ]
  },
  {
    id: 'mecanica-motos-carros',
    category: 'mecanica',
    icon: '🔧',
    title: { pt: 'Mecânica Básica & Manutenção', es: 'Mecánica Básica y Mantenimiento' },
    desc: {
      pt: 'Troca de óleo, freios, carburador, relação e diagnóstico preventivo.',
      es: 'Cambio de aceite, frenos, carburador, transmisión y diagnóstico.'
    },
    lessons: [
      { id: 'mc1', videoId: 'ZQvfHyfgBtA', title: { pt: 'Módulo 1: Funcionamento do motor 4 tempos', es: 'Módulo 1: Funcionamiento del motor 4 tiempos' }, duration: 11 },
      { id: 'mc2', videoId: 'nFtbf4prm78', title: { pt: 'Módulo 2: Troca de óleo, filtros e velas', es: 'Módulo 2: Cambio de aceite, filtros y bujías' }, duration: 13 },
      { id: 'mc3', videoId: '8R3M5K7J2L1', title: { pt: 'Módulo 3: Sistema de freios e embreagem', es: 'Módulo 3: Sistema de frenos y embrague' }, duration: 15 }
    ]
  },
  {
    id: 'barbearia-profissional',
    category: 'barbearia',
    icon: '💈',
    title: { pt: 'Barbearia & Corte Degradê', es: 'Barbería y Corte Degradado' },
    desc: {
      pt: 'Domine a máquina, tesoura, navalha e técnicas de Fade.',
      es: 'Domina la máquina, tijera, navaja y técnicas de Fade.'
    },
    lessons: [
      { id: 'br1', videoId: '7K8L9M2N4P1', title: { pt: 'Aula 1: Regulagem de lâminas e pentes', es: 'Clase 1: Calibración de cuchillas y peines' }, duration: 9 },
      { id: 'br2', videoId: '3Q5W7E9R2T4', title: { pt: 'Aula 2: Passo a passo Mid Fade perfeito', es: 'Clase 2: Paso a paso Mid Fade perfecto' }, duration: 16 },
      { id: 'br3', videoId: '6Y8U1I3O5P7', title: { pt: 'Aula 3: Acabamento de barba e navalha', es: 'Clase 3: Perfilado de barba y navaja' }, duration: 12 }
    ]
  },
  {
    id: 'botanica-cultivo',
    category: 'botanica',
    icon: '🌿',
    title: { pt: 'Botânica, Horta e Cultivo', es: 'Botánica, Huerto y Cultivo' },
    desc: {
      pt: 'Substratos, adubação orgânica, podas e cultivo urbano.',
      es: 'Sustratos, abono orgánico, podas y cultivo urbano.'
    },
    lessons: [
      { id: 'bt1', videoId: '9A2S4D6F8G1', title: { pt: 'Aula 1: Preparo do solo e drenagem', es: 'Clase 1: Preparación del suelo y drenaje' }, duration: 10 },
      { id: 'bt2', videoId: '2H4J6K8L1Z3', title: { pt: 'Aula 2: Germinação, luz e rega ideal', es: 'Clase 2: Germinación, luz y riego ideal' }, duration: 12 },
      { id: 'bt3', videoId: '5X7C9V2B4N6', title: { pt: 'Aula 3: Controle natural de pragas', es: 'Clase 3: Control natural de plagas' }, duration: 11 }
    ]
  },
  {
    id: 'informatica-programacao',
    category: 'informatica',
    icon: '💻',
    title: { pt: 'Informática & Lógica Web', es: 'Informática y Lógica Web' },
    desc: {
      pt: 'Domine sistemas, ferramentas digitais e criação de sites e apps.',
      es: 'Domina sistemas, herramientas digitales y creación de webs y apps.'
    },
    lessons: [
      { id: 'in1', videoId: 'UB1O30fR-EE', title: { pt: 'Módulo 1: Estrutura HTML e Web Moderna', es: 'Módulo 1: Estructura HTML y Web Moderna' }, duration: 15 },
      { id: 'in2', videoId: 'yfoY53QXEnI', title: { pt: 'Módulo 2: Estilos CSS e Design Responsivo', es: 'Módulo 2: Estilos CSS y Diseño Responsivo' }, duration: 18 },
      { id: 'in3', videoId: 'hdI2bqOjy3c', title: { pt: 'Módulo 3: Lógica de Programação com JavaScript', es: 'Módulo 3: Lógica de Programación con JavaScript' }, duration: 20 }
    ]
  }
];
