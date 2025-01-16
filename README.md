#English

```markdown
# ActuatorHealth - Health Check for Connections in JS Applications

This library provides a simple way to check the health of connections to common services, such as RabbitMQ, MySQL, Oracle, and MongoDB, in Node.js applications. It was created to facilitate the implementation of connectivity and integrity tests for these services.

## Installation

To install the library, use npm or yarn:

```bash
npm i actuatorhealth
```

or

```bash
yarn add actuatorhealth
```

## Features

`actuatorhealth` allows you to test connectivity with the following services:

- **RabbitMQ**: Checks if the RabbitMQ service is accessible and functioning correctly.
- **MySQL**: Tests the connection to a MySQL database.
- **Oracle**: Checks the connection to an Oracle database.
- **MongoDB**: Tests connectivity with a MongoDB instance.

Each test returns a status that can be used to implement monitoring logic or alerts in your application.

## Usage

### Basic Configuration Example

```javascript
const Actuator = require('actuatorhealth');

// Connection configuration
const config = {
  rabbitmq: {
    url: 'amqp://localhost',
  },
  mysql: {
    host: 'localhost',
    user: 'root',
    password: 'password',
    database: 'test_db',
  },
  oracle: {
    user: 'oracle_user',
    password: 'oracle_pass',
    connectString: 'localhost:1521/XE',
  },
  mongo: {
    uri: 'mongodb://localhost:27017/test_db',
  },
};

// Initialize Actuator
const actuator = new Actuator(config);

// Test connections
actuator.checkConnections()
  .then((results) => {
    console.log('Connection Status:', results);
  })
  .catch((error) => {
    console.error('Error testing connections:', error);
  });
```

### Available Methods

- `checkConnections()`: Performs all the connectivity tests defined in the configuration and returns an object with the status of each service.
- `checkRabbitMQ()`: Tests connectivity with RabbitMQ.
- `checkMySQL()`: Tests connectivity with MySQL.
- `checkOracle()`: Tests connectivity with Oracle.
- `checkMongo()`: Tests connectivity with MongoDB.

Each method returns a result object that contains information about the connection status (OK or error) and any additional details about the failure (if any).

## Configuration

Service configuration is done through a JavaScript object with the necessary credentials and information for each service. The configuration format is described below:

### RabbitMQ

```javascript
rabbitmq: {
  url: 'amqp://localhost',  // RabbitMQ connection URL
}
```

### MySQL

```javascript
mysql: {
  host: 'localhost',        // MySQL host
  user: 'root',             // MySQL user
  password: 'password',     // MySQL password
  database: 'test_db',      // Database name
}
```

### Oracle

```javascript
oracle: {
  user: 'oracle_user',      // Oracle user
  password: 'oracle_pass',  // Oracle password
  connectString: 'localhost:1521/XE',  // Oracle connection string
}
```

### MongoDB

```javascript
mongo: {
  uri: 'mongodb://localhost:27017/test_db',  // MongoDB connection URI
}
```

## Results

The `checkConnections()` method returns an object with the status of each service. An example response would look like this:

```javascript
{
  rabbitmq: { status: 'OK', message: 'Successfully connected to RabbitMQ' },
  mysql: { status: 'ERROR', message: 'Failed to connect to MySQL: [error]' },
  oracle: { status: 'OK', message: 'Successfully connected to Oracle' },
  mongo: { status: 'OK', message: 'Successfully connected to MongoDB' }
}
```

## Contributing

If you want to contribute to the project, feel free to fork it and submit a pull request. Before starting, make sure to follow standard development practices:

1. Create a branch (`git checkout -b my-branch`).
2. Make your changes.
3. Push your changes (`git push origin my-branch`).
4. Open a pull request.

## License

This project is licensed under the [diniz3003@gmail.com](LICENSE).

---

Thank you for using Node Actuator! If you have any questions, feel free to open an issue or contact us.

#Portuguese
# ActuatorHealth - Health Check para Conexões em aplicações em JS

Esta biblioteca oferece uma forma simples de verificar a saúde das conexões de serviços comuns, como RabbitMQ, MySQL, Oracle e MongoDB, em aplicações Node.js. Ela foi criada para facilitar a implementação de testes de conectividade e integridade desses serviços.
## Instalação

Para instalar a biblioteca, utilize o npm ou yarn:

```bash
npm i actuatorhealth
```

ou

```bash
yarn add actuatorhealth
```

## Funcionalidades

A `actuatorhealth` permite que você faça testes de conectividade com os seguintes serviços:

- **RabbitMQ**: Verifica se o serviço RabbitMQ está acessível e funcionando corretamente.
- **MySQL**: Testa a conexão com um banco de dados MySQL.
- **Oracle**: Verifica a conexão com um banco de dados Oracle.
- **MongoDB**: Testa a conectividade com uma instância do MongoDB.

Cada teste retorna um status que pode ser utilizado para implementar lógica de monitoramento ou alertas em sua aplicação.

## Uso

### Exemplo básico de configuração

```javascript
const Actuator = require('actuatorhealth');

// Configuração de conexões
const config = {
  rabbitmq: {
    url: 'amqp://localhost',
  },
  mysql: {
    host: 'localhost',
    user: 'root',
    password: 'password',
    database: 'test_db',
  },
  oracle: {
    user: 'oracle_user',
    password: 'oracle_pass',
    connectString: 'localhost:1521/XE',
  },
  mongo: {
    uri: 'mongodb://localhost:27017/test_db',
  },
};

// Inicializa o Actuator
const actuator = new Actuator(config);

// Teste as conexões
actuator.checkConnections()
  .then((results) => {
    console.log('Status das Conexões:', results);
  })
  .catch((error) => {
    console.error('Erro ao testar conexões:', error);
  });
```

### Métodos Disponíveis

- `checkConnections()`: Realiza todos os testes de conectividade definidos na configuração e retorna um objeto com o status de cada serviço.
- `checkRabbitMQ()`: Testa a conectividade com RabbitMQ.
- `checkMySQL()`: Testa a conectividade com MySQL.
- `checkOracle()`: Testa a conectividade com Oracle.
- `checkMongo()`: Testa a conectividade com MongoDB.

Cada método retorna um objeto de resultado que contém as informações sobre o status da conexão (OK ou erro) e quaisquer detalhes adicionais sobre a falha (se houver).

## Configuração

A configuração dos serviços é feita através de um objeto JavaScript com as credenciais e informações necessárias para cada serviço. O formato de configuração é descrito a seguir:

### RabbitMQ

```javascript
rabbitmq: {
  url: 'amqp://localhost',  // URL de conexão do RabbitMQ
}
```

### MySQL

```javascript
mysql: {
  host: 'localhost',        // Host do MySQL
  user: 'root',             // Usuário do MySQL
  password: 'password',     // Senha do MySQL
  database: 'test_db',      // Nome do banco de dados
}
```

### Oracle

```javascript
oracle: {
  user: 'oracle_user',      // Usuário Oracle
  password: 'oracle_pass',  // Senha Oracle
  connectString: 'localhost:1521/XE',  // String de conexão Oracle
}
```

### MongoDB

```javascript
mongo: {
  uri: 'mongodb://localhost:27017/test_db',  // URI de conexão do MongoDB
}
```

## Resultados

O método `checkConnections()` retorna um objeto com o status de cada serviço. Um exemplo de resposta seria:

```javascript
{
  rabbitmq: { status: 'OK', message: 'Conexão bem-sucedida com RabbitMQ' },
  mysql: { status: 'ERROR', message: 'Falha ao conectar ao MySQL: [erro]' },
  oracle: { status: 'OK', message: 'Conexão bem-sucedida com Oracle' },
  mongo: { status: 'OK', message: 'Conexão bem-sucedida com MongoDB' }
}
```

## Contribuindo

Se você deseja contribuir para o projeto, sinta-se à vontade para fazer um fork e enviar um pull request. Antes de começar, certifique-se de seguir as práticas padrão de desenvolvimento:

1. Crie uma branch (`git checkout -b minha-branch`).
2. Faça suas alterações.
3. Envie suas alterações (`git push origin minha-branch`).
4. Abra um pull request.

## Licença

Este projeto está licenciado sob a [diniz3003@gmail.com](LICENSE).

---

Obrigado por usar o Node Actuator! Se tiver dúvidas, abra uma issue ou entre em contato.

