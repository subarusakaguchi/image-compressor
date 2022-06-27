# Image Compressor
Projeto com auxílio da biblioteca [Browser Image Compression](https://github.com/Donaldcwl/browser-image-compression), com a finalidade de melhorar e concretizar conhecimentos básicos de [React](https://pt-br.reactjs.org/).

# Quais tecnologias foram utilizadas?
O projeto foi feito em React (React, [React-dom](https://www.npmjs.com/package/react-dom) e [React-scripts](https://www.npmjs.com/package/react-scripts)) com auxílio da biblioteca Browser Image Compression, além disso para complementar o processo de elaboração de design foram utilizados o [SASS](https://github.com/sass/sass) (no formato .SCSS) e o[React-progress-bar](https://www.npmjs.com/package/@ramonak/react-progress-bar).

Para auxiliar no desenvolvimento também foi padronizado o código com ESLINT e Prettier, utilizando o StyleGuide Standard, ademais o projeto foi feito em Typescript, para assegurar um melhor controle sobre as variáveis e os valores a serem repassados.

# Qual foi a lógica?
O projeto basicamente gira em torno do hook ```useImageCompression()```, este que cria um contexto e gera um provider para toda a aplicação, nos níveis de componentes em que elas são necessárias.

O Contexto possui basicamente os dados que são importantes para a biblioteca compactar a imagem pelo browser, além das funções que preparam a imagem após o upload e outra que realmente realiza a compactação e geração do link de download pela URL API nativo do próprio javascript.

Por fim o processo mantem o dowload ativo por **1(Um) Minuto**, até o mesmo ser revogado pela função ```URL.revokeObjectURL()```, isto para evitar problemas de links ativos sem necessidade e prevenir problemas de segurança que podem vir a ocorrer por este dicuido.

O projeto inicialmente foi pensado num formato de arquivo único, e logo após foi melhorado para upload de multíplos arquivos.

# O que consegui aprender com este projeto?
Consegui experienciar melhor a forma de trabalhar com Componentes em React, com isto consegui vizualizar uma boa organização de código para torná-lo mais limpo e subdívidido, este processo foi exponencializado com o meu aprendizado de Contexto e Hooks, que ajudam a distribuir os dados ao longo de todo a aplicação, facilitando o processo de repasse de informações necessárias para as partes que realmente precisam.

Outros pontos mais técnicos estão em aprender a utilizar **Promises** em Loops, experienciar as várias forams que os dois prodem trabalhar juntos para gerar o resultado esperado, além de entender pontos mais específicos como diferença entre Listas de Arquivos (```File[]```) e ```FileList``` por exemplo, que variam basicamente na finalidade de uso de variáveis, além da própria interação desses formatos com o resto do código.

# Possibiliades de melhoria?
Para este projeto, penso que há muito a ser melhorado em termos de design, cores, UI e UX, e na parte de código mais técnica mesmo de como arquiteturar uma aplicação, que poderia vir a ser mais escalonável.

Outro ponto está também na melhoria do uso das **Progress Bar** que carregam ao mesmo tempo, apesar de em termos de código o processo ocorrer em série, imagéticamente o processo aparenta ser paralelo o que não condiz com a realidade (Mas como gosto pessoal, deixa uma sensação que o processo é bem mais rápido também, o que pode ser um ponto até positivo dependendo da finalidade).

Outras questões que podem ser melhoradas são em termos de funcionalidade, primeiro que o processo todo de compactação usa o modo multithead do navegador que não é aceito por todos (Ex: Internet Explorer e Opera Mini não aceitam), então poderia ser realizado um sistema para identificar o navegador e realizar o processo de forma diferentes, ou mesmo um simples *Try and Error* onde caso ocorra um erro em Multi Thread, o processo tente novamente em Single.

Outra melhoria é no controle de erros, que não foram bem definidos, poderia ser utilizado uma biblioteca como o React-toastify para gerar os alertas de problemas.

Por fim uma melhora funcional e importante está no controle de carregamento de arquivos, para definir um limite de tamanho por arquivo, ou de rodada de processamento. Isso de forma inicial não tem muito imnpacto, mas caso houver a necessidade de escalonar a aplicação e/ou refatorar o código para outro método de compacatação (por exemplo com backend separado), seria muito importante essa refatoração.
