# Manual de Uso — App de Treino EEG (Sistema 10-20)

Aplicativo web interativo para treinar a localização, a função e a colocação dos eletrodos do Sistema Internacional 10-20 de eletroencefalografia (EEG).

## Como abrir

1. Baixe o arquivo `eeg_10_20_app.html`.
2. Dê duplo clique nele (abre no navegador) **ou** hospede no GitHub Pages e acesse pelo link.
3. Não precisa de instalação, servidor ou internet — funciona offline, direto no navegador (Chrome, Safari, Firefox, Edge).
4. Funciona em computador e celular.

## Estrutura do app (abas no topo)

### 🧠 Mapa
Mapa interativo do crânio com os eletrodos nas posições do Sistema 10-20.
- Toque/clique em um eletrodo para ver no painel ao lado: nome, região e função clínica.
- Use para consulta livre antes ou durante o treino.

### 🎯 Treino
Três modos de prática, cada um com 3 níveis de dificuldade (Linha Média → Regiões Principais → Mapa Completo, 21 eletrodos):

**Quiz de Localização**
- O app mostra o nome de um eletrodo; toque no ponto correto do crânio.
- Feedback imediato (certo/errado) e pontuação ao final da rodada.

**Quebra-cabeça de Posicionamento**
- Todos os pontos do nível aparecem em branco no crânio, e as etiquetas dos eletrodos ficam numa bandeja ao lado.
- Toque em uma etiqueta para selecioná-la (fica destacada em dourado) e depois toque no ponto certo do crânio para encaixar.
- Se errar o ponto, ele pisca em vermelho e a etiqueta continua selecionada para nova tentativa.
- Objetivo: montar o mapa completo com o menor número de erros — simula a colocação real dos eletrodos.

**Flashcards de Função**
- Mostra o eletrodo; a pessoa tenta lembrar região/função antes de virar a carta.
- Marque "Eu sabia" ou "Preciso revisar" para o app priorizar os cartões que você mais erra.

### 📖 Referências
Conteúdo didático em cards: o que é o Sistema 10-20, nomenclatura dos eletrodos, letras e regiões, numeração (pares/ímpares), e a diferença entre eletrodo de referência e eletrodo terra.

### 📋 Tabela de Eletrodos
Lista completa dos 21 eletrodos, pesquisável e filtrável por região.

### 📊 Meu Progresso
Estatísticas de acerto no Quiz e no Quebra-cabeça (eles compartilham a mesma pontuação), com barra de domínio por eletrodo — mostra em quais você mais erra. Tem botão para zerar o progresso.

## Observações para quem for testar

- **O progresso é salvo no próprio navegador do dispositivo** (não é uma conta na nuvem). Trocar de navegador, usar aba anônima ou limpar dados do site reseta o progresso.
- Cada pessoa que testar deve usar o mesmo navegador/dispositivo se quiser acompanhar sua evolução ao longo de várias sessões.
- Não requer login nem envia dados a nenhum servidor — tudo roda localmente.

## Publicando no GitHub Pages (opcional, para dar um link de acesso)

1. Suba o arquivo `eeg_10_20_app.html` para um repositório no GitHub.
2. Em **Settings → Pages**, selecione a branch (geralmente `main`) e a pasta raiz (`/`).
3. O GitHub gera um link público, algo como `https://seu-usuario.github.io/nome-do-repo/eeg_10_20_app.html`.
4. Compartilhe esse link com quem for testar — não precisa de instalação nenhuma do lado deles.
