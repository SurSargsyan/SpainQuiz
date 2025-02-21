/* script.js */
let currentCityIndex = 0;
let currentQuestionIndex = 0;
let score = 0;
let timer;
let timeLeft = 30000;
let audio = new Audio();
let records = JSON.parse(localStorage.getItem("records")) || [];


const cities = [
    {
        name: "Madrid",
        questions: [
            {
                text: "¿En qué siglo se convirtió Madrid en la capital de España?",
                options: ["Siglo XVIII", "Siglo XVI", "Siglo XIV"],
                correct: 1
            },
            {
                text: "¿Cómo se llama el famoso parque en el centro de Madrid?",
                options: ["Parque del Retiro", "Parque Güell", "Bosque de Chapultepec"],
                correct: 0
            },
            {
                text: "¿Qué edificio es la residencia oficial del rey de España en Madrid?",
                options: ["Palacio Real de Madrid ", "Palacio de la Moncloa ", "Palacio de Versallesa"],
                correct: 0
            },
            {
                text: "¿Cuál de estos museos NO se encuentra en Madrid?",
                options: ["Museo Reina Sofía", "Museo Guggenheim", "Museo del Prado"],
                correct: 1
            },
            {
                text: "¿Cuál es el nombre del famoso mercado cubierto en Madrid donde se pueden probar tapas?",
                options: ["Mercado de la Boquería", "Mercado de San Miguel", "Mercado Central de Valencia"],
                correct: 1
            }
        ],
        image: "images/madrid.jpg",
        audio: "audio/madrid.mp3"
    },
    {
        name: "Barcelona",
        questions: [
            {
                text: "¿Quién fue el arquitecto de la Sagrada Familia?",
                options: [" Antoni Gaudí", "Santiago Calatrava", "Ricardo Bofill"],
                correct: 0
            },
            {
                text: "¿Qué equipo de fútbol representa a Barcelona en LaLiga?",
                options: ["FC Barcelona", "Real Madrid", " Atlético de Madrid"],
                correct: 0
            },
            {
                text: "¿Cómo se llama la famosa calle peatonal del centro de Barcelona?",
                options: ["La Rambla", "Gran Via", "Puerta del Sol"],
                correct: 0
            },
            {
                text: "¿Cuál de estos museos está en Barcelona?",
                options: [" Museo Picasso ", " Museo del Prado", "Museo Guggenheim"],
                correct: 0
            },
            {
                text: "¿Qué pintor surrealista nació en Figueres, cerca de Barcelona?",
                options: ["Salvador Dalí ", "Pablo Picasso", "Joan Miró"],
                correct: 0
            }
        ],
        image: "images/barcelona.jpg",
        audio: "audio/barcelona.mp3"
    },
    {
        name: "Valencia",
        questions: [
            {
                text: "¿En qué año se construyó la Ciudad de las Artes y las Ciencias en Valencia??",
                options: ["1999", "1998", "1997"],
                correct: 1
            },
            {
                text: "¿Cómo se llama el estadio del Valencia CF??",
                options: ["Mestalla", "Wanda Metropolitano", "Riazor"],
                correct: 0
            },
            {
                text: "¿Qué famosa fiesta se celebra en Valencia en marzo?",
                options: ["La Feria de Abril ", "San Fermín ", "Las Fallas"],
                correct: 2
            },
            {
                text: "¿Cuál es el museo más importante de Valencia?",
                options: ["Museo Reina Sofía", "Museo de Bellas Artes de Valencia ", "Museo del Prado"],
                correct: 1
            },
            {
                text: "¿Qué escritor valenciano del Siglo de Oro escribió <Tirant lo Blanch>?",
                options: [" Miguel de Cervantes", "Joanot Martorell", "Gustavo Adolfo Bécquer"],
                correct: 1
            }
        ],
        image: "images/valencia.jpg",
        audio: "audio/valencia.mp3"
    },
    {
        name: "Sevilla",
        questions: [
            {
                text: "¿En qué año se completó la Giralda de Sevilla?",
                options: ["Siglo XIII", "Siglo XII", "Siglo XIV"],
                correct: 0
            },
            {
                text: "¿Qué evento histórico tuvo lugar en Sevilla en 1992?",
                options: ["Sevilla FC", "Real Betis ", "Málaga CF"],
                correct: 0
            },
            {
                text: "¿Cuál es el equipo de fútbol más laureado de Sevilla en competiciones europeas?",
                options: ["Palacio Real de Madrid ", "Palacio de la Moncloa ", "Palacio de Versallesa"],
                correct: 0
            },
            {
                text: "¿Dónde se encuentra la tumba de Cristóbal Colón en Sevilla?",
                options: ["Alcázar de Sevilla", "Catedral de Sevilla", "Archivo de Indias "],
                correct: 1
            },
            {
                text: "¿Qué pintor sevillano es famoso por sus obras del Barroco?",
                options: ["Francisco de Goya ", "Diego Velázquez", "El Greco "],
                correct: 1
            }
        ],
        image: "images/sevilla.jpg",
        audio: "audio/sevilla.mp3"
    },
    {
        name: "Granada",
        questions: [
            {
                text: "¿Qué civilización construyó la Alhambra de Granada?",
                options: ["Los romanos ", "Los musulmanes", "Los visigodos"],
                correct: 1
            },
            {
                text: "¿Qué equipo de fútbol representa a Granada en LaLiga?",
                options: ["Granada CF", "Almería", "Real Oviedo"],
                correct: 0
            },
            {
                text: "¿Qué importante poeta granadino fue asesinado durante la Guerra Civil Española?",
                options: ["Antonio Machado", "Palacio de la Moncloa ", "Federico García Lorca"],
                correct: 2
            },
            {
                text: "¿Qué Sierra famosa rodea Granada?",
                options: ["Pirineos ", "Sierra Nevada", "Sierra de Gredos "],
                correct: 1
            },
            {
                text: "¿Qué barrio de Granada es famoso por sus casas cueva y el flamenco?",
                options: ["Sacromonte", "Triana", "Albaicín"],
                correct: 0
            }
        ],
        image: "images/granada.jpg",
        audio: "audio/granada.mp3"
    },
    {
        name: "Bilbao (Vizcaya)",
        questions: [
            {
                text: "¿Qué museo de arte moderno es uno de los símbolos de Bilbao?",
                options: ["Museo Reina Sofía", "Museo Guggenheim", "Museo Thyssen"],
                correct: 1
            },
            {
                text: "¿Cómo se llama el estadio del Athletic Club de Bilbao?",
                options: ["San Mamés", "Anoeta", "Mestalla"],
                correct: 0
            },
            {
                text: "¿Qué río atraviesa Bilbao?",
                options: ["Nervión ", " Guadalquivir", " Ebro"],
                correct: 0
            },
            {
                text: "¿Qué importante personaje histórico vasco lideró la resistencia contra los romanos en el siglo I?",
                options: ["Pelayo", "Viriato ", "El Cid"],
                correct: 1
            },
            {
                text: "¿Qué fiesta popular se celebra en Bilbao en agosto?",
                options: ["San Fermín", "Aste Nagusia", "Feria de Abril"],
                correct: 1
            }
        ],
        image: "images/bilbao.jpg",
        audio: "audio/bilbao.mp3"
    },
    {
        name: "Malaga",
        questions: [
            {
                text: "¿Qué pintor mundialmente famoso nació en Málaga en 1881?",
                options: ["Salvador Dalí", "Pablo Picasso", "Francisco de Goya"],
                correct: 1
            },
            {
                text: "¿Cómo se llama el estadio del Málaga CF?",
                options: ["La Rosaleda", "Benito Villamarín", "Riazor"],
                correct: 0
            },
            {
                text: "¿Qué monumento es una de las fortalezas más importantes de Málaga?",
                options: [" La Alcazaba", "La Alhambra", " El Castillo de Gibralfaro "],
                correct: 0
            },
            {
                text: "¿Cuál es el museo más importante de Málaga dedicado a un pintor?",
                options: ["Museo Dalí", "Museo Picasso Málaga", "Museo del Prado"],
                correct: 1
            },
            {
                text: "¿Qué famoso actor de cine nacido en Málaga ha protagonizado películas de Hollywood?",
                options: ["Javier Bardem", "Antonio Banderas", "Penélope Cruz"],
                correct: 1
            }
        ],
        image: "images/malaga.jpg",
        audio: "audio/malaga.mp3"
    },
    {
        name: "Zaragoza (Aragón)",
        questions: [
            {
                text: "¿Qué importante batalla tuvo lugar en Zaragoza durante la Guerra de la Independencia?",
                options: ["La Batalla de Bailén", "Los Sitios de Zaragoza", "La Batalla de Trafalgar"],
                correct: 1
            },
            {
                text: "¿Cómo se llama el equipo de fútbol más importante de Zaragoza?",
                options: [" Real Zaragoza", "Huesca", "Sporting de Gijón"],
                correct: 0
            },
            {
                text: "¿Qué río pasa por Zaragoza?",
                options: ["Ebro", "Tajo", " Duero"],
                correct: 0
            },
            {
                text: "¿Qué famosa basílica se encuentra en Zaragoza?",
                options: ["Catedral de Burgos", "Basílica del Pilar", "Monasterio de El Escorial"],
                correct: 1
            },
            {
                text: "¿Qué famoso pintor aragonés tiene un museo en Zaragoza?",
                options: ["Diego Velázquez", " Salvador Dalí", "Francisco de Goya "],
                correct: 2
            }
        ],
        image: "images/zaragoza.jpg",
        audio: "audio/zaragoza.mp3"
    },
    {
        name: "Córdoba",
        questions: [
            {
                text: "¿Qué civilización construyó la Mezquita de Córdoba?",
                options: ["Romanos", "Musulmanes", " Visigodos"],
                correct: 1
            },
            {
                text: "¿Qué equipo de fútbol representa a Córdoba?",
                options: ["Córdoba CF", "Cádiz CF", "Granada CF "],
                correct: 0
            },
            {
                text: "¿Cómo se llama el barrio judío más famoso de Córdoba?",
                options: ["Albaicín", " Santa Cruz", "La Judería"],
                correct: 2
            },
            {
                text: "¿Qué filósofo andalusí nació en Córdoba en el siglo XII?",
                options: ["Maimónides", "Averroes", "Séneca"],
                correct: 1
            },
            {
                text: "¿Qué famoso festival de Córdoba es conocido por sus patios llenos de flores?",
                options: [" Feria de Abril", "Festival de los Patios Cordobeses", " San Fermín "],
                correct: 1
            }
        ],
        image: "images/cordoba.jpg",
        audio: "audio/cordoba.mp3"
    },
    {
        name: "Toledo",
        questions: [
            {
                text: "¿Cómo se conoce a Toledo por su historia medieval?",
                options: ["La Ciudad de los Reyes", "La Ciudad de la Alhambra", "La Ciudad de las Tres Culturas"],
                correct: 2
            },
            {
                text: "¿Qué deporte era famoso en Toledo en la Edad Media?",
                options: ["Esgrima y fabricación de espadas", "Tiro con arco", "Polo"],
                correct: 0
            },
            {
                text: "¿Qué monumento es el símbolo más importante de Toledo?",
                options: ["El Alcázar de Toledo", "La Alhambra", "La Giralda"],
                correct: 0
            },
            {
                text: "¿Qué pintor renombrado vivió en Toledo y dejó muchas de sus obras en la ciudad?",
                options: ["Diego Velázquez", "El Greco", "Francisco de Goya"],
                correct: 1
            },
            {
                text: "¿Cómo se llama el río que rodea Toledo?",
                options: ["Tajo", "Duero", "Guadalquivir"],
                correct: 0
            }
        ],
        image: "images/toledo.jpg",
        audio: "audio/toledo.mp3"
    },
    {
        name: "Santiago de Compostela (La Coruña, Galicia)",
        questions: [
            {
                text: "¿Qué importante ruta termina en Santiago de Compostela?",
                options: ["La Ruta de la Plata", "El Camino de Santiago", "La Ruta del Cid"],
                correct: 1
            },
            {
                text: "¿Cuál es el estadio más importante de La Coruña?",
                options: ["Riazor", "Balaídos", "San Mamés"],
                correct: 0
            },
            {
                text: "¿Cómo se llama la catedral de Santiago de Compostela?",
                options: ["Catedral de León", "Basílica del Pilar", "Catedral de Santiago"],
                correct: 2
            },
            {
                text: "¿Qué museo en La Coruña está dedicado a la ciencia y la astronomía?",
                options: ["Museo Nacional del Prado", "Casa de las Ciencias", "Museo del Greco"],
                correct: 1
            },
            {
                text: "¿Qué escritor gallego fue una de las figuras clave del siglo XIX en la literatura en gallego?",
                options: ["Federico García Lorca", "Rosalía de Castro", "Antonio Machado"],
                correct: 1
            }
        ],
        image: "images/santiagod.jpg",
        audio: "audio/santiago.mp3"
    },
    {
        name: "Alicante",
        questions: [
            {
                text: "¿Qué castillo famoso se encuentra en Alicante?",
                options: ["Alcázar de Segovia", "Castillo de Belmonte", "Siglo XIV"],
                correct: 1
            },
            {
                text: "¿Qué equipo de fútbol representa a Alicante?",
                options: ["Hércules CF", " Elche CF", "Valencia CF"],
                correct: 0
            },
            {
                text: "¿Qué fiesta famosa se celebra en Alicante en junio?",
                options: ["Las Hogueras de San Juan", "La Tomatina", "Moros y Cristianos"],
                correct: 0
            },
            {
                text: "¿Qué isla pertenece a la provincia de Alicante?",
                options: ["Isla de La Palma", "Isla de Tabarca", " Isla de Menorca"],
                correct: 1
            },
            {
                text: "¿Qué escritor español, autor de <La Colmena>, nació en Alicante?",
                options: [" Camilo José Cela", "Miguel Hernández", "Vicente Blasco Ibáñez"],
                correct: 1
            }
        ],
        image: "images/alicante.jpg",
        audio: "audio/alicante.mp3"
    },
    {
        name: "Murcia",
        questions: [
            {
                text: "¿Cómo se llama la catedral más importante de Murcia?",
                options: ["Catedral de Burgos", "Catedral de Santa María", "Basílica del Pilar"],
                correct: 1
            },
            {
                text: "¿Qué equipo de fútbol representa a Murcia?",
                options: ["Real Murcia", "Cartagena", "Albacete"],
                correct: 0
            },
            {
                text: "¿Qué famoso festival de primavera se celebra en Murcia?",
                options: ["Bando de la Huerta ", "Las Fallas ", "San Fermín"],
                correct: 0
            },
            {
                text: "¿Qué pintor barroco murciano fue famoso por sus esculturas religiosas?",
                options: ["El Greco", "Francisco Salzillo", "Diego Velázquez"],
                correct: 1
            },
            {
                text: "¿Qué mar baña la costa de Murcia?",
                options: ["Mar Mediterráneo", "Mar Cantábricol", "Océano Atlántico"],
                correct: 0
            }
        ],
        image: "images/madrid.jpg",
        audio: "audio/madrid.mp3"
    },
    {
        name: "Madrid",
        questions: [
            {
                text: "¿En qué siglo se convirtió Madrid en la capital de España?",
                options: ["Siglo XVIII", "Siglo XVI", "Siglo XIV"],
                correct: 1
            },
            {
                text: "¿Cómo se llama el famoso parque en el centro de Madrid?",
                options: ["Parque del Retiro", "Parque Güell", "Bosque de Chapultepec"],
                correct: 0
            },
            {
                text: "¿Qué edificio es la residencia oficial del rey de España en Madrid?",
                options: ["Palacio Real de Madrid ", "Palacio de la Moncloa ", "Palacio de Versallesa"],
                correct: 0
            },
            {
                text: "¿Cuál de estos museos NO se encuentra en Madrid?",
                options: ["Museo Reina Sofía", "Museo Guggenheim", "Museo del Prado"],
                correct: 1
            },
            {
                text: "¿Cuál es el nombre del famoso mercado cubierto en Madrid donde se pueden probar tapas?",
                options: ["Mercado de la Boquería", "Mercado de San Miguel", "Mercado Central de Valencia"],
                correct: 1
            }
        ],
        image: "images/madrid.jpg",
        audio: "audio/madrid.mp3"
    },
    {
        name: "Madrid",
        questions: [
            {
                text: "¿En qué siglo se convirtió Madrid en la capital de España?",
                options: ["Siglo XVIII", "Siglo XVI", "Siglo XIV"],
                correct: 1
            },
            {
                text: "¿Cómo se llama el famoso parque en el centro de Madrid?",
                options: ["Parque del Retiro", "Parque Güell", "Bosque de Chapultepec"],
                correct: 0
            },
            {
                text: "¿Qué edificio es la residencia oficial del rey de España en Madrid?",
                options: ["Palacio Real de Madrid ", "Palacio de la Moncloa ", "Palacio de Versallesa"],
                correct: 0
            },
            {
                text: "¿Cuál de estos museos NO se encuentra en Madrid?",
                options: ["Museo Reina Sofía", "Museo Guggenheim", "Museo del Prado"],
                correct: 1
            },
            {
                text: "¿Cuál es el nombre del famoso mercado cubierto en Madrid donde se pueden probar tapas?",
                options: ["Mercado de la Boquería", "Mercado de San Miguel", "Mercado Central de Valencia"],
                correct: 1
            }
        ],
        image: "images/madrid.jpg",
        audio: "audio/madrid.mp3"
    },
    {
        name: "Madrid",
        questions: [
            {
                text: "¿En qué siglo se convirtió Madrid en la capital de España?",
                options: ["Siglo XVIII", "Siglo XVI", "Siglo XIV"],
                correct: 1
            },
            {
                text: "¿Cómo se llama el famoso parque en el centro de Madrid?",
                options: ["Parque del Retiro", "Parque Güell", "Bosque de Chapultepec"],
                correct: 0
            },
            {
                text: "¿Qué edificio es la residencia oficial del rey de España en Madrid?",
                options: ["Palacio Real de Madrid ", "Palacio de la Moncloa ", "Palacio de Versallesa"],
                correct: 0
            },
            {
                text: "¿Cuál de estos museos NO se encuentra en Madrid?",
                options: ["Museo Reina Sofía", "Museo Guggenheim", "Museo del Prado"],
                correct: 1
            },
            {
                text: "¿Cuál es el nombre del famoso mercado cubierto en Madrid donde se pueden probar tapas?",
                options: ["Mercado de la Boquería", "Mercado de San Miguel", "Mercado Central de Valencia"],
                correct: 1
            }
        ],
        image: "images/madrid.jpg",
        audio: "audio/madrid.mp3"
    },
    {
        name: "Madrid",
        questions: [
            {
                text: "¿En qué siglo se convirtió Madrid en la capital de España?",
                options: ["Siglo XVIII", "Siglo XVI", "Siglo XIV"],
                correct: 1
            },
            {
                text: "¿Cómo se llama el famoso parque en el centro de Madrid?",
                options: ["Parque del Retiro", "Parque Güell", "Bosque de Chapultepec"],
                correct: 0
            },
            {
                text: "¿Qué edificio es la residencia oficial del rey de España en Madrid?",
                options: ["Palacio Real de Madrid ", "Palacio de la Moncloa ", "Palacio de Versallesa"],
                correct: 0
            },
            {
                text: "¿Cuál de estos museos NO se encuentra en Madrid?",
                options: ["Museo Reina Sofía", "Museo Guggenheim", "Museo del Prado"],
                correct: 1
            },
            {
                text: "¿Cuál es el nombre del famoso mercado cubierto en Madrid donde se pueden probar tapas?",
                options: ["Mercado de la Boquería", "Mercado de San Miguel", "Mercado Central de Valencia"],
                correct: 1
            }
        ],
        image: "images/madrid.jpg",
        audio: "audio/madrid.mp3"
    },
    {
        name: "Madrid",
        questions: [
            {
                text: "¿En qué siglo se convirtió Madrid en la capital de España?",
                options: ["Siglo XVIII", "Siglo XVI", "Siglo XIV"],
                correct: 1
            },
            {
                text: "¿Cómo se llama el famoso parque en el centro de Madrid?",
                options: ["Parque del Retiro", "Parque Güell", "Bosque de Chapultepec"],
                correct: 0
            },
            {
                text: "¿Qué edificio es la residencia oficial del rey de España en Madrid?",
                options: ["Palacio Real de Madrid ", "Palacio de la Moncloa ", "Palacio de Versallesa"],
                correct: 0
            },
            {
                text: "¿Cuál de estos museos NO se encuentra en Madrid?",
                options: ["Museo Reina Sofía", "Museo Guggenheim", "Museo del Prado"],
                correct: 1
            },
            {
                text: "¿Cuál es el nombre del famoso mercado cubierto en Madrid donde se pueden probar tapas?",
                options: ["Mercado de la Boquería", "Mercado de San Miguel", "Mercado Central de Valencia"],
                correct: 1
            }
        ],
        image: "images/madrid.jpg",
        audio: "audio/madrid.mp3"
    },
    {
        name: "Madrid",
        questions: [
            {
                text: "¿En qué siglo se convirtió Madrid en la capital de España?",
                options: ["Siglo XVIII", "Siglo XVI", "Siglo XIV"],
                correct: 1
            },
            {
                text: "¿Cómo se llama el famoso parque en el centro de Madrid?",
                options: ["Parque del Retiro", "Parque Güell", "Bosque de Chapultepec"],
                correct: 0
            },
            {
                text: "¿Qué edificio es la residencia oficial del rey de España en Madrid?",
                options: ["Palacio Real de Madrid ", "Palacio de la Moncloa ", "Palacio de Versallesa"],
                correct: 0
            },
            {
                text: "¿Cuál es el nombre del famoso mercado cubierto en Madrid donde se pueden probar tapas?",
                options: ["Mercado de la Boquería", "Mercado de San Miguel", "Mercado Central de Valencia"],
                correct: 1
            }
        ],
        image: "images/madrid.jpg",
        audio: "audio/madrid.mp3"
    },
];

function startGame() {
    document.getElementById("menu").classList.add("hidden");
    document.getElementById("game").classList.remove("hidden");
    loadCity();
}

function loadCity() {
    let city = cities[currentCityIndex];
    currentQuestionIndex = 0;
    loadQuestion();
    document.body.style.backgroundImage = `url(${city.image})`;
    audio.src = city.audio;
    audio.play();
}

function loadQuestion() {
    let city = cities[currentCityIndex];
    let question = city.questions[currentQuestionIndex];
    document.getElementById("question").innerText = question.text;
    let optionsDiv = document.getElementById("options");
    optionsDiv.innerHTML = "";
    optionsDiv.style.display = "flex";
    optionsDiv.style.gap = "10px";
    
    question.options.forEach((option, index) => {
        let btn = document.createElement("button");
        btn.innerText = option;
        btn.onclick = () => checkAnswer(index, question.correct, btn);
        optionsDiv.appendChild(btn);
    });
    
    timeLeft = 30;
    document.getElementById("timer").innerText = timeLeft;
    clearInterval(timer);
    timer = setInterval(countdown, 1000);
}

function countdown() {
    timeLeft--;
    document.getElementById("timer").innerText = timeLeft;
    if (timeLeft <= 0) {
        gameOver();
    }
}

function checkAnswer(selected, correct, button) {
    clearInterval(timer);
    button.classList.add(selected === correct ? "correct" : "wrong");
    (selected === correct ? "correct" : "wrong");
    if (selected === correct) {
        setTimeout(() => {
            button.classList.remove("correct");
            nextQuestion();
        }, 1000);
        score += 50;
    } else {
        gameOver();
    }
    button.onclick = null;

}

function nextQuestion() {
    let city = cities[currentCityIndex];
    if (currentQuestionIndex < city.questions.length - 1) {
        currentQuestionIndex++;
        loadQuestion();
    } else {
        currentCityIndex = (currentCityIndex + 1) % cities.length;
        loadCity();
    }
}

function gameOver() {
    document.getElementById("game").classList.add("hidden");
    document.getElementById("game-over").classList.remove("hidden");
    document.getElementById("score").innerText = score;
    audio.pause();
    document.getElementById("name-input").classList.remove("hidden");
}

function saveScore() {
    let name = document.getElementById("playerName").value;
    if (name) {
        records.push({ name, score });
        localStorage.setItem("records", JSON.stringify(records));
        showRecords();
    }
}

function showRecords() {
    let recordsDiv = document.getElementById("records");
    recordsDiv.innerHTML = "<h3>records</h3>";
    console.log("recordsDiv", recordsDiv);
    records.forEach(record => {
        let p = document.createElement("p");
        p.innerText = `${record.name}: ${record.score}`;
        recordsDiv.appendChild(p);
        console.log(record.name, record.score)
    });
}

function restartGame() {
    location.reload();
}