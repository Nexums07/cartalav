document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('loginForm');
    const errorMessage = document.getElementById('errorMessage');

    // Elementos do Seletor de Beleza
    const beautySelectButton = document.getElementById('beautySelectButton');
    const beautyOptionsList = document.getElementById('beautyOptions');
    const selectedBeautyEmoji = document.getElementById('selectedBeautyEmoji');
    const selectedBeautyValue = document.getElementById('selectedBeautyValue');

    // Elementos do Seletor de Voz
    const voiceSelectButton = document.getElementById('voiceSelectButton');
    const voiceOptionsList = document.getElementById('voiceOptions');
    const selectedVoiceEmoji = document.getElementById('selectedVoiceEmoji');
    const selectedVoiceValue = document.getElementById('selectedVoiceValue');

    // Elementos dos NOVOS Campos de Input
    const ageInput = document.getElementById('age'); // NOVO
    const sistersInput = document.getElementById('sisters'); // NOVO
    const bestFriendInput = document.getElementById('bestFriend'); // NOVO

    const beautyOptionsData = [
        { value: 0, text: '0.Nem nos seus piores pesadelos... 😵‍💫' },
        { value: 1, text: '1.Nem tente escolher essa opção 🙄' },
        { value: 2, text: '2.Tira o dedo dessa opção Lavinia 😫' },
        { value: 3, text: '3.Você tem certeza disso??? 😐' },
        { value: 4, text: '4.Ofensivo até pensar nisso 😤' },
        { value: 5, text: '5.Isso aqui é pra quê? Pra ofender? 😑' },
        { value: 6, text: '6.Quase... 🤨' },
        { value: 7, text: '7.Não, ainda tá longe. Bem longe. 👎' },
        { value: 8, text: '8.;Hmmm... ainda não tô convencido(a) 🤷‍♂️' },
        { value: 9, text: '9.a perto, mais um pouco 😏' },
        { value: 10, text: '10x♾️ AGORAAA SIM! A mais linda de todas!👑' }
    ];

    const voiceOptionsData = [
        { value: 'lavinia', text: 'Lavinia👑' },
        { value: 'sosuavoz', text: 'Lavinia👑' },
        { value: 'amelhordomundo', text: 'Só tem você lavinia👑' }
    ];

    // Variáveis de estado para os valores selecionados
    let currentSelectedBeautyValue = null; 
    let currentSelectedVoiceValue = null; 

    // --- FUNÇÕES DE POPULAMENTO E LÓGICA DOS SELETORES ---

    const populateBeautyOptions = () => {
        beautyOptionsList.innerHTML = '';
        beautyOptionsData.forEach(optionData => {
            const li = document.createElement('li');
            li.className = 'relative cursor-default py-2 pr-9 pl-3 text-gray-900 select-none hover:bg-rose-100 hover:text-rose-900 transition-all duration-150 ease-in-out';
            li.id = `beauty-option-${optionData.value}`;
            li.setAttribute('role', 'option');
            li.dataset.value = optionData.value;

            const div = document.createElement('div');
            div.className = 'flex items-center';

            const emojiMatch = optionData.text.match(/[\u{1F000}-\u{1F9FF}\u{2600}-\u{26FF}\u{2700}-\u{27BF}]/gu);
            const displayEmoji = emojiMatch && emojiMatch.length > 0 ? emojiMatch[0] : '😊';
            const descriptiveText = optionData.text.replace(/^\d+\s*–\s*|\s*[\u{1F000}-\u{1F9FF}\u{2600}-\u{26FF}\u{2700}-\u{27BF}]+$/gu, '').trim();

            const emojiSpan = document.createElement('span');
            emojiSpan.className = 'size-6 shrink-0 rounded-full flex items-center justify-center text-2xl';
            emojiSpan.textContent = displayEmoji;

            const valueSpan = document.createElement('span');
            valueSpan.className = 'ml-3 block truncate font-normal';
            valueSpan.textContent = optionData.text;

            div.appendChild(emojiSpan);
            div.appendChild(valueSpan);
            li.appendChild(div);

            li.addEventListener('click', () => {
                selectedBeautyEmoji.textContent = displayEmoji;
                selectedBeautyValue.textContent = descriptiveText;
                currentSelectedBeautyValue = optionData.value;

                selectedBeautyEmoji.classList.add('animate-bounce-scale');
                setTimeout(() => {
                    selectedBeautyEmoji.classList.remove('animate-bounce-scale');
                }, 300);

                beautyOptionsList.classList.remove('select-options-visible');
                beautyOptionsList.classList.add('select-options-hidden');
                setTimeout(() => {
                    beautyOptionsList.classList.add('hidden');
                    beautySelectButton.setAttribute('aria-expanded', 'false');
                }, 300);
            });
            beautyOptionsList.appendChild(li);
        });
        selectedBeautyEmoji.textContent = '🤔'; 
        selectedBeautyValue.textContent = 'Escolhe bem, hein!';
        currentSelectedBeautyValue = null; 
    };

    const populateVoiceOptions = () => {
        voiceOptionsList.innerHTML = '';
        voiceOptionsData.forEach(optionData => {
            const li = document.createElement('li');
            li.className = 'relative cursor-default py-2 pr-9 pl-3 text-gray-900 select-none hover:bg-rose-100 hover:text-rose-900 transition-all duration-150 ease-in-out';
            li.id = `voice-option-${optionData.value}`;
            li.setAttribute('role', 'option');
            li.dataset.value = optionData.value;

            const div = document.createElement('div');
            div.className = 'flex items-center';

            const emojiMatch = optionData.text.match(/[\u{1F000}-\u{1F9FF}\u{2600}-\u{26FF}\u{2700}-\u{27BF}]/gu);
            const displayEmoji = emojiMatch && emojiMatch.length > 0 ? emojiMatch[0] : '💬';
            const descriptiveText = optionData.text.replace(/\s*[\u{1F000}-\u{1F9FF}\u{2600}-\u{26FF}\u{2700}-\u{27BF}]+$/gu, '').trim();

            const emojiSpan = document.createElement('span');
            emojiSpan.className = 'size-6 shrink-0 rounded-full flex items-center justify-center text-2xl';
            emojiSpan.textContent = displayEmoji;

            const valueSpan = document.createElement('span');
            valueSpan.className = 'ml-3 block truncate font-normal';
            valueSpan.textContent = optionData.text;

            div.appendChild(emojiSpan);
            div.appendChild(valueSpan);
            li.appendChild(div);

            li.addEventListener('click', () => {
                selectedVoiceEmoji.textContent = displayEmoji;
                selectedVoiceValue.textContent = descriptiveText;
                currentSelectedVoiceValue = optionData.value;

                selectedVoiceEmoji.classList.add('animate-bounce-scale');
                setTimeout(() => {
                    selectedVoiceEmoji.classList.remove('animate-bounce-scale');
                }, 300);

                voiceOptionsList.classList.remove('select-options-visible');
                voiceOptionsList.classList.add('select-options-hidden');
                setTimeout(() => {
                    voiceOptionsList.classList.add('hidden');
                    voiceSelectButton.setAttribute('aria-expanded', 'false');
                }, 300);
            });
            voiceOptionsList.appendChild(li);
        });
        selectedVoiceEmoji.textContent = '🎤';
        selectedVoiceValue.textContent = 'Escolha a resposta';
        currentSelectedVoiceValue = null; 
    };


    // --- INICIALIZAÇÃO DOS SELETORES ---
    populateBeautyOptions();
    populateVoiceOptions();

    beautyOptionsList.classList.add('hidden', 'select-options-hidden');
    voiceOptionsList.classList.add('hidden', 'select-options-hidden');


    // --- LÓGICA DE ABRIR/FECHAR SELETORES ---

    if (beautySelectButton) {
        beautySelectButton.addEventListener('click', () => {
            const isExpanded = beautySelectButton.getAttribute('aria-expanded') === 'true';
            voiceOptionsList.classList.add('hidden', 'select-options-hidden');
            voiceSelectButton.setAttribute('aria-expanded', 'false');

            if (!isExpanded) {
                beautyOptionsList.classList.remove('hidden');
                void beautyOptionsList.offsetWidth; 
                beautyOptionsList.classList.remove('select-options-hidden');
                beautyOptionsList.classList.add('select-options-visible');
                beautySelectButton.setAttribute('aria-expanded', 'true');
            } else {
                beautyOptionsList.classList.remove('select-options-visible');
                beautyOptionsList.classList.add('select-options-hidden');
                setTimeout(() => {
                    beautyOptionsList.classList.add('hidden');
                    beautySelectButton.setAttribute('aria-expanded', 'false');
                }, 300);
            }
        });
    }

    if (voiceSelectButton) {
        voiceSelectButton.addEventListener('click', () => {
            const isExpanded = voiceSelectButton.getAttribute('aria-expanded') === 'true';
            beautyOptionsList.classList.add('hidden', 'select-options-hidden');
            beautySelectButton.setAttribute('aria-expanded', 'false');

            if (!isExpanded) {
                voiceOptionsList.classList.remove('hidden');
                void voiceOptionsList.offsetWidth; 
                voiceOptionsList.classList.remove('select-options-hidden');
                voiceOptionsList.classList.add('select-options-visible');
                voiceSelectButton.setAttribute('aria-expanded', 'true');
            } else {
                voiceOptionsList.classList.remove('select-options-visible');
                voiceOptionsList.classList.add('select-options-hidden');
                setTimeout(() => {
                    voiceOptionsList.classList.add('hidden');
                    voiceSelectButton.setAttribute('aria-expanded', 'false');
                }, 300);
            }
        });
    }

    document.addEventListener('click', (event) => {
        const isClickOutsideBeauty = !beautySelectButton.contains(event.target) && !beautyOptionsList.contains(event.target);
        const isClickOutsideVoice = !voiceSelectButton.contains(event.target) && !voiceOptionsList.contains(event.target);

        if (isClickOutsideBeauty && isClickOutsideVoice) {
            if (!beautyOptionsList.classList.contains('hidden')) {
                beautyOptionsList.classList.remove('select-options-visible');
                beautyOptionsList.classList.add('select-options-hidden');
                setTimeout(() => {
                    beautyOptionsList.classList.add('hidden');
                    beautySelectButton.setAttribute('aria-expanded', 'false');
                }, 300);
            }
            if (!voiceOptionsList.classList.contains('hidden')) {
                voiceOptionsList.classList.remove('select-options-visible');
                voiceOptionsList.classList.add('select-options-hidden');
                setTimeout(() => {
                    voiceOptionsList.classList.add('hidden');
                    voiceSelectButton.setAttribute('aria-expanded', 'false');
                }, 300);
            }
        }
    });


    // --- LÓGICA DE LOGIN ---
    if (loginForm) {
        loginForm.addEventListener('submit', (event) => {
            event.preventDefault();

            const usernameInput = document.getElementById('username');
            const username = usernameInput.value.trim();
            
            const beautyValue = currentSelectedBeautyValue; 
            const voiceValue = currentSelectedVoiceValue; 

            // NOVO: Captura os valores dos novos campos
            const age = parseInt(ageInput.value); // Converte para número inteiro
            const sisters = parseInt(sistersInput.value); // Converte para número inteiro
            const bestFriend = bestFriendInput.value.trim().toLowerCase(); // Converte para minúsculas para comparação

            const correctVoiceValues = ['lavinia', 'sosuavoz', 'amelhordomundo'];

            // Condição para o login:
            // 1. Nome correto.
            // 2. Beleza selecionada é 10.
            // 3. Voz selecionada está entre as corretas e não é nula.
            // 4. Idade é 17.
            // 5. Quantidade de irmãs é 2.
            // 6. Melhor amiga é "luci".
            if (username.toLowerCase() === 'lavinia de oliveira gomes' && 
                beautyValue === 10 && 
                voiceValue !== null && correctVoiceValues.includes(voiceValue) &&
                age === 17 && // NOVO: Validação da idade
                sisters === 2 && // NOVO: Validação das irmãs
                bestFriend === 'luci' // NOVO: Validação da melhor amiga
            ) {
                window.location.href = 'home.html';
            } else {
                // Mensagens de erro específicas
                if (username.toLowerCase() !== 'lavinia de oliveira gomes') {
                    errorMessage.textContent = 'Nome incorreto. Tente novamente!';
                } else if (beautyValue === null) {
                    errorMessage.textContent = 'Por favor, selecione sua beleza na lista!';
                } else if (beautyValue !== 10) {
                    errorMessage.textContent = 'Essa beleza não é a que eu acho... Escolha a opção mais linda!';
                } else if (voiceValue === null || !correctVoiceValues.includes(voiceValue)) {
                    errorMessage.textContent = 'Por favor, escolha quem tem a voz mais linda!';
                } else if (age !== 17) { // NOVO: Mensagem de erro para idade
                    errorMessage.textContent = 'Idade incorreta. Tente novamente!';
                } else if (sisters !== 2) { // NOVO: Mensagem de erro para irmãs
                    errorMessage.textContent = 'Número de irmãs incorreto. Tente novamente!';
                } else if (bestFriend !== 'luci') { // NOVO: Mensagem de erro para melhor amiga
                    errorMessage.textContent = 'Nome da melhor amiga incorreto. Tente novamente!';
                }
                 else {
                    errorMessage.textContent = 'Ocorreu um erro inesperado. Verifique suas escolhas.';
                }
                usernameInput.value = ''; // Limpa o nome se o login falhar
            }
        });
    }
});