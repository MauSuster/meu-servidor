document.getElementById('btnRequisicao').addEventListener('click', () => {
    // Faz a requisição para a rota do seu servidor
    fetch('/api/getUserId')
      .then(response => response.text()) // ou response.json() se você tiver certeza do formato
      .then(data => {

        const Resposta = JSON.parse(data);
        console.log("tudo:", Resposta);


        console.log(`iD: ${Resposta.userID}`);

        document.getElementById('resultado').innerText = `Seu usuário é: ${Resposta.userID}`;
      })
      .catch(error => {
        console.error('Erro na requisição:', error);
        document.getElementById('resultado').innerText = 'Erro: ' + error;
      });
  });