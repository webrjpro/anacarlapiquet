# Entrelinhas — um mundo para decifrar

Aventura offline de interpretação de texto, exploração e construção em uma ilha de blocos, pensada para uma criança de aproximadamente 11 anos.

## Abrir e jogar

Abra `index.html` com dois cliques no Microsoft Edge ou Google Chrome. Não precisa de servidor, cadastro, instalação ou internet. Mantenha as pastas `css`, `js` e `assets` ao lado do HTML. O som começa após a primeira interação; o botão de nota musical controla música e efeitos separadamente.

O projeto anterior foi preservado na pasta `original/`. O novo jogo usa uma chave de salvamento própria e não apaga o progresso antigo.

## O que está implementado

- Mundo isométrico desenhado em Canvas, personagem controlável, companheiro Nilo, movimento por caminhos que evitam árvores, água e blocos construídos, zoom, neblina, partículas e seis estruturas restauráveis.
- Construção livre com madeira, pedra e cristal; até quatro blocos de altura por terreno; retirada devolve o recurso. Materiais iniciais: 8 madeiras e 4 pedras.
- 18 missões originais em seis regiões, desbloqueadas progressivamente. Cada missão concluída pela primeira vez entrega 6 madeiras, 4 pedras e 1 cristal. Repetir uma missão não duplica recursos.
- Duas interações por desafio: interpretar/ordenar e selecionar evidências. Alternativas embaralhadas; duas missões de ordenação; devolutiva específica para cada alternativa; pistas adicionais depois de dificuldades; revisão no diário; reflexão final escrita.
- Três companheiros originais gerados com ImageGen: Nilo, Lia e Ravi. Imagens em `assets/characters/`; instruções de geração em `PROMPTS.md` nessa pasta.
- Duas músicas e onze efeitos baixados e incluídos localmente. Trilha muda na gruta e na vila; volume baixa durante leitura; áudio pausa ao ocultar a aba; controles de volume e silêncio são salvos. Autores, licenças e origem de cada arquivo em `assets/audio/CREDITS.md` e `manifest.json`.
- Salvamento em localStorage; exportação do registro como JSON; nome/apelido opcional; leiaute para desktop e celular; diálogo nativo com foco; teclado e preferência de movimento reduzido.

## Progressão de leitura

1. **Bosque dos começos:** localizar informação explícita, identificar ideia principal, ordenar instruções.
2. **Vale das entrelinhas:** juntar pistas, interpretar ações e revisar hipóteses.
3. **Pontes do sentido:** distinguir causa e consequência, retomar referentes e interpretar condições.
4. **Gruta dos ecos:** interpretar ironia, metáfora e imagens poéticas.
5. **Vila das versões:** distinguir afirmação verificável de opinião, comparar fontes e reconhecer intenção persuasiva.
6. **Farol das ideias:** sintetizar perspectivas, reconhecer generalizações e formular uma recomendação sustentada por evidências.

Os textos e personagens são ficcionais e identificados como tal. Não há estatísticas de aprendizagem inventadas, usuários simulados, certificado oficial ou promessa de domínio. O diário registra somente ações realizadas. A reflexão escrita é armazenada, não corrigida automaticamente. As 18 missões são uma campanha inicial de prática, não uma avaliação abrangente da leitura ou garantia de evolução.

Referência de concepção: [Education Endowment Foundation — Reading comprehension strategies](https://educationendowmentfoundation.org.uk/education-evidence/teaching-learning-toolkit/reading-comprehension-strategies). A referência apoia o ensino explícito de estratégias, adaptação do desafio e orientação ao leitor. A eficácia deste jogo específico ainda não foi avaliada com crianças.

## Controles

- Clique/toque no chão para andar, ou use setas/WASD.
- Escolha uma região pelos marcadores ou pela lateral; use **Explorar** para a missão.
- **B** ativa construção; escolha o material e clique no chão livre. Setas + **Espaço** também constroem.
- **Enter** abre a missão selecionada. **Esc** fecha uma janela.
- No documento, selecione os trechos que sustentam sua conclusão. Não há cronômetro nem perda de vidas.

## Desenvolvimento e verificação

O jogo é HTML/CSS/JavaScript sem dependências de execução. Node e Playwright são usados apenas nos testes:

```powershell
npm ci
npm test
npm run preview
```

Os testes usam Microsoft Edge instalado. `tests/game.cjs` percorre as 18 missões, inclui respostas incorretas e evidências inadequadas, verifica bloqueios, ordenação, reflexão, persistência, revisitas, limite/devolução de blocos, decodificação dos 13 arquivos de áudio, preferência de silêncio, teclado, largura móvel e recuperação de salvamento inválido. Capturas de verificação ficam em `tmp/`.

Estrutura: `js/data.js` contém a campanha; `js/app.js`, interface e regras; `js/world.js`, mapa e movimento; `js/audio.js`, reprodução e mixagem. `original/` contém apenas a cópia do projeto anterior, sem uso pelo jogo atual.
