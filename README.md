# Entrelinhas — A jornada das palavras

Jogo offline de interpretação de texto com **200 casas em 40 fases**, cinco desafios por fase. O personagem avança quando a criança acerta a interpretação e marca as pistas que a sustentam.

## Abrir

Dê dois cliques em `index.html` no Edge ou Chrome. Mantenha `css`, `js` e `assets` ao lado do HTML. Não é necessário instalar nada para jogar. Música e efeitos iniciam após interação; o botão musical oferece controles separados.

## Como jogar

1. Clique na casa brilhante ou em **Jogar**.
2. Leia o documento, escolha uma resposta e marque as pistas. Em duas casas, organize as ações.
3. Teste a ideia. Erros recebem explicações; as dicas ajudam a revisar a leitura.
4. Confirme a conquista para seu personagem avançar à próxima casa.
5. A cada cinco casas, um portal libera a próxima fase e restaura uma construção. A casa 100 conclui o primeiro arco da aventura; a casa 200 pede uma recomendação integrada para concluir a campanha.

Casas futuras ficam bloqueadas. Câmera, teclado e arraste não movem o personagem. Casas conquistadas podem ser revisitadas sem repetir recompensas. Não há limite de tempo para ler nem penalidade por pedir dicas.

## Mapa e layout

Quarenta ilhas formam uma rota contínua em dez fileiras. O computador abre na fase atual; o celular abre ampliado na casa atual. **Tabuleiro inteiro** mostra as quarenta fases; clicar em uma ilha aproxima o mapa, sem liberar suas perguntas. **Minha casa** retorna ao desafio atual.

O menu hambúrguer aparece em todas as telas e reúne navegação, fases, música, perfil, câmera e tela cheia. Pode ser fechado pelo botão, por Escape ou pelo fundo externo. O cartão do desafio foi reduzido; o placar fica ao lado dele, antes do Nilo. No celular, desafio e placar continuam lado a lado, com Nilo abaixo. Os cadeados ficam fora dos números.

Cores vivas, salto do personagem, câmera suave, confetes, brilho, portais, construções restauradas e celebrações sonoras acompanham o avanço. A preferência do sistema por movimento reduzido é respeitada.

As 40 ilhas têm mini ovelhas, porquinhos, galinhas, coelhos ou vacas passeando, além de dois trabalhadores cuidando de pequenas hortas. Eles usam enxadas, regadores e cestos; as plantações passam por ciclos visuais de crescimento e colheita. São habitantes do cenário, sem alterar as respostas ou o progresso. As animações param com a preferência por movimento reduzido, e os detalhes são omitidos na visão distante para manter o mapa leve. O desenho está em `js/island-life.js`.

## Progressão

As fases trabalham, em ordem: localização, ideia central, sequência, causa e consequência, referências, inferências, revisão de hipóteses, vocabulário, condições, humor, poesia, fatos e opiniões, intenção, comparação de fontes, argumentos, limites de conclusões, perspectivas, cruzamento de registros, síntese e interpretação integrada.

São 200 desafios distintos, com documentos ficcionais, evidências, pistas e explicações. As fases 21 a 40 aprofundam coesão, narradores, gêneros, amostragem, pressupostos, contra-argumentos, verificação de mensagens e planejamento de investigações. As últimas casas exigem relacionar várias fontes e avaliar os limites das afirmações. As 18 atividades anteriores foram redistribuídas pela progressão; 182 novas foram escritas, incluindo a expansão das casas 101 a 200. O diário registra atividades e reflexões, sem inventar notas de domínio. A escrita final fica guardada sem avaliação automática.

Referência de concepção: [EEF — Reading comprehension strategies](https://educationendowmentfoundation.org.uk/education-evidence/teaching-learning-toolkit/reading-comprehension-strategies). O jogo ainda não foi avaliado em um estudo com crianças.

## Progresso em IndexedDB

Banco `entrelinhas`, versão 1; object store `saves`. A chave `campaign-200` guarda conquistas, tentativas, dicas, revisões, reflexões, nome e áudio. As gravações são enfileiradas e só mostram confirmação após a transação terminar. Ao conquistar uma casa, a gravação termina antes do avanço.

Um save da versão de 100 casas é lido de `campaign-100`, preservado nessa chave e atualizado para `campaign-200`. Os primeiros 100 IDs permanecem iguais, inclusive suas notas, fotos e personagem. Backups JSON das campanhas anteriores continuam aceitos.

O registro antigo `entrelinhas-v1` é preservado no localStorage e arquivado em `archive-campaign-18`. Atividades anteriores mantêm seus IDs e suas notas, mesmo quando há casas novas antes delas. A posição passa a ser a primeira casa ainda não conquistada.

Se IndexedDB estiver indisponível, o jogo usa localStorage (`entrelinhas-v2`). Se nem esse armazenamento funcionar, informa que o progresso está apenas na sessão. **Como jogar → Baixar meu progresso** exporta o JSON. O salvamento é local ao navegador; não sincroniza automaticamente entre dispositivos. O balão amarelo Meu personagem, fixo à direita em todas as telas, abre diretamente a escolha de menino ou menina, nome e foto. A mesma tela continua acessível por Meu explorador no menu. A foto é redimensionada para 256×256 e guardada como imagem JPEG local. Cartão de memória permite baixar JSON e carregar um arquivo depois de apagar dados do navegador ou em outro computador. A importação apresenta o perfil e a casa antes de aplicar, valida o formato e guarda o estado anterior em before-last-import. JSONs antigos também são aceitos. O arquivo inclui foto, personagem, conquistas, tentativas, dicas, anotações e som; baixe outro cartão para atualizar seu backup.

## Imagens e áudio

Nilo, Lia e Ravi foram gerados com ImageGen. Imagens e prompts estão em `assets/characters/`.

Duas músicas e onze efeitos locais estão em `assets/audio/`. `CREDITS.md`, `manifest.json` e licenças identificam autores e fontes CC0. A música baixa durante a leitura e pausa ao ocultar a aba. Preferências de som são salvas.

## Verificação

Para desenvolvimento, Node e Playwright são usados com Edge instalado:

```powershell
npm ci
npm test
npm run test:menu
npm run test:memory
npm run preview
```

Os testes percorrem as 200 casas e os 40 portais, verificam bloqueios, erros, ordenação, reflexão, revisitas, animação, IndexedDB real, recarga, migração, alternativa de armazenamento, 13 áudios, toque no celular e geometria do layout em 1364×635. O teste do menu verifica cinco larguras de tela, teclado, fechamento, navegação e o placar ao lado do desafio. O teste de cartão verifica nome e foto, escolha de personagem, download JSON, recuperação em navegador vazio, notas, som, persistência, validação de arquivos e versões antigas. Capturas ficam em `tmp/`.

`js/data.js` contém as primeiras 100 casas; `js/campaign-extension.js` contém as 100 casas adicionais; `js/legacy-data.js` preserva os textos anteriores. `js/storage.js` cuida do salvamento. `js/app.js` contém regras e telas, `js/world.js` desenha o tabuleiro e `js/audio.js` controla o som. `original/` e `revisions/island-v1/` preservam versões anteriores e não são carregadas pelo jogo.




## Para Ana Carla

Desenvolvido por **Carlos Antonio de Oliveira Piquet**, pai de **Ana Carla Saraiva Piquet**.

> Filha, seu pai te ama muito. Que você tenha muito sucesso na vida e que Deus te abençoe sempre.

A dedicatória completa está em **Menu → Para Ana Carla · créditos**.

## Licença e identificação da entrega

`LICENSE.txt` contém a licença proprietária, reservando os direitos próprios à titular indicada, Ana Carla Saraiva Piquet. Músicas, bibliotecas e componentes de terceiros mantêm suas licenças. `DIREITOS_E_CREDITOS.md` discrimina o alcance dos direitos e os componentes.

`TERMO_DE_CESSAO.md` é uma minuta para assinatura, destinada a formalizar a cessão de 100% dos direitos patrimoniais que Carlos efetivamente detém. Criar a licença não equivale a assinar essa cessão nem a registrar o software. Observe os requisitos de representação de menor e eventual conflito de interesses antes da assinatura.

`VERSION-MANIFEST.json` identifica a versão com hashes SHA-256 dos arquivos de execução, recursos e documentos. Ele pode acompanhar a cópia entregue, mas não é certificado oficial de registro.
