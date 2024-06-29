
function calcularImc() {

    // Variáveis que selecionam os elementos no formulário
    const form = document.querySelector('#formulario');
    const inputPeso = document.querySelector('#peso');
    const inputAltura = document.querySelector('#altura');

    //funçao para prevenir o envio do formulário
    form.addEventListener('submit', (evento) => {
        evento.preventDefault();
        mostraBotaoLimpar(); //Chama função que mostra o botão de limpar

        //Variáveis que recebem os valores do formulário e os convertem o Typeof para (Number) 
        const peso = Number(inputPeso.value);
        const altura = Number(inputAltura.value);

        /*
        Condições qe avaliam o que o usuário digitou e retorna (peso ou altura inválida) 
        caso nao sejam numeros ou um campo em branco.
        */
        if (!peso) {
            mostraResultado('Peso inválido!', 'corVermelha');
            return;
        }

        if (!altura) {
            mostraResultado('Altura inválida!', 'corVermelha');
            return;
        }
        rolarParaResultado();

        const imc = calculoImc(peso, altura); //Variável que recebe a funçao que calcula o imc.
        const grauIMC = grauImc(imc); //Variável que recebe a funçãos que retorna os graus de obesidade.
        const mensagemResultado = `Seu IMC é ${imc} - ${grauIMC}`; //Variável que recebe a mensagem de resultado com o valor do imc + o grau.
        mostraTextoNaTela(imc); //Chama função que mostra o resultado na tela

        //As condiçoes abaixo avaliam o valor do imc e conforme resultado definem uma cor de fundo para a mensagem de resultado.
        if (imc < 18.5) mostraResultado(mensagemResultado, 'corVermelha');

        if (imc >= 18.5 && imc < 24.9) mostraResultado(mensagemResultado, 'corVerde');

        if (imc >= 24.9 && imc < 29.0) mostraResultado(mensagemResultado, 'corAmarelo');

        if (imc >= 29.9 && imc < 34.9) mostraResultado(mensagemResultado, 'corLaranja');

        if (imc >= 34.9 && imc < 39.9) mostraResultado(mensagemResultado, 'corLaranjaEscuro');

        if (imc > 39.9) mostraResultado(mensagemResultado, 'corVermelha');
    });


    //Função que retorna os graus de obesidade
    function grauImc(imc) {
        const grausLista = [
            '"Abaixo do normal"',

            '"Normal"',

            '"Sobrepeso"',

            '"Obesidade grau I"',

            '"Obesidade grau II"',

            '"Obesidade grau III"'
        ];

        if (imc >= 39.9) return grausLista[5];

        if (imc >= 34.9) return grausLista[4];

        if (imc >= 29.9) return grausLista[3];

        if (imc >= 24.9) return grausLista[2];

        if (imc >= 18.5) return grausLista[1];

        if (imc < 18.5) return grausLista[0];
    }

    //função que calcula o IMC e retorna o valor
    function calculoImc(peso, altura) {
        const imc = peso / altura ** 2;
        return imc.toFixed(2);
    }

    //Função que avalia qual mensagem e sua respectiva cor de fundo
    function mostraResultado(mensagemResultado, cor) {
        const resultado = document.querySelector('#resultado');
        resultado.innerHTML = '';


        const p = criaParagrafo();


        if (cor == 'corVerde') {
            p.id = 'paragrafo-resultado-verde';
        }
        if (cor == 'corAmarelo') {
            p.id = 'paragrafo-amarelo';
        }
        if (cor == 'corLaranja') {
            p.id = 'paragrafo-laranja'
        }
        if (cor == 'corLaranjaEscuro') {
            p.id = 'paragrafo-laraEscuro'
        }
        if (cor == 'corVermelha') {
            p.id = 'paragrafo-vermelho';
        }




        p.innerHTML = mensagemResultado;
        resultado.appendChild(p);
    }

    //Função que cria um parágrafo
    function criaParagrafo() {
        const p = document.createElement('p');
        return p;
    }

    //Função que define um texto conforme os graus de obesidade
    function defineTexto(imc) {
        const mensagemTexto = [
            '<strong>(Abaixo do normal):</strong> Procure um médico. Algumas pessoas têm um baixo peso por características do seu organismo e tudo bem. Outras podem estar enfrentando problemas, como a desnutrição. É preciso saber qual é o caso.',

            '<strong>(Normal):</strong> Que bom que você está com o peso normal! E o melhor jeito de continuar assim é mantendo um estilo de vida ativo e uma alimentação equilibrada.',

            '<strong>(Sobrepeso):</strong> Ele é, na verdade, uma pré-obesidade e muitas pessoas nessa faixa já apresentam doenças associadas, como diabetes e hipertensão. Importante rever hábitos e buscar ajuda antes de, por uma série de fatores, entrar na faixa da obesidade pra valer.',

            '<strong>(Obesidade grau I):</strong> Sinal de alerta! Chegou na hora de se cuidar, mesmo que seus exames sejam normais. Vamos dar início a mudanças hoje! Cuide de sua alimentação. Você precisa iniciar um acompanhamento com nutricionista e/ou endocrinologista.',

            '<strong>(Obesidade grau II):</strong> Mesmo que seus exames aparentem estar normais, é hora de se cuidar, iniciando mudanças no estilo de vida com o acompanhamento próximo de profissionais de saúde.',

            '<strong>(Obesidade grau III):</strong> Aqui o sinal é vermelho, com forte probabilidade de já existirem doenças muito graves associadas. O tratamento deve ser ainda mais urgente.']

        if (imc >= 39.9) return mensagemTexto[5];

        if (imc >= 34.9) return mensagemTexto[4];

        if (imc >= 29.9) return mensagemTexto[3];

        if (imc >= 24.9) return mensagemTexto[2];

        if (imc >= 18.5) return mensagemTexto[1];

        if (imc < 18.5) return mensagemTexto[0];
    }

    //Função que mostra o texto na tela
    function mostraTextoNaTela(imc) {
        const texto = document.querySelector('#texto-resultado');
        texto.innerHTML = ''

        const p = criaParagrafo();
        p.id = 'paragrafo-txt'
        p.innerHTML = defineTexto(imc);
        texto.appendChild(p);
    }
}

//Função que mostra o botão de limpar.
function mostraBotaoLimpar() {
    const botaoOn = document.querySelector('.btn-back');
    botaoOn.style.display = 'block';
}

//Limpa o formulário, o resultado e o texto explicativo
function limpaTudo() {

    const inputPeso = document.querySelector('#peso');
    const inputAltura = document.querySelector('#altura');
    const areaResultado = document.querySelector('#resultado');
    const textoResultado = document.querySelector('#texto-resultado')
    const botaoOf = document.querySelector('.btn-back');

    const textoInicial = '<p id="paragrafo-txt">O Índice de Massa Corporal (IMC) é uma das principais ferramentas, adotada inclusive pela Organização Mundial de Saúde (OMS), para calcular o chamado “peso ideal”. Obtido a partir do peso e da altura do indivíduo, o IMC também aponta níveis de magreza e obesidade, que são usados para nortear o trabalho de profissionais de saúde e de educadores físicos.</p>';

    inputPeso.value = ''
    inputAltura.value = ''
    areaResultado.innerText = ''
    textoResultado.innerHTML = textoInicial
    rolarParaTopo();
    botaoOf.style.display = 'none';
}

function rolarParaResultado() {
    const elemento = document.querySelector('.calcular');
    elemento.scrollIntoView({ behavior: "smooth" });
}

function rolarParaTopo() {
    const elemento = document.querySelector('body');
    elemento.scrollIntoView({ behavior: "smooth" });
}