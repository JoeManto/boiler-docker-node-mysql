### 🐳 Boiler-Docker-Node-Mysql
Basic boilerplate for creating a connection from a Node container to a MySql Container.

****

Opening a success TCP connection from a Node container to a MySQL container can be very frustrating if you are not experienced with docker networks or understand how they configure your containers to begin communications between each other.

Run with
```bash
docker-compose up --build
```

**Some Important Notes For Understanding**
- Docker Containers by default are completely isolated and have no idea of other Containers running via Docker.
- Docker Compose versions like *'3'* automatically define a default network and add it to each one of your services.
- Stop using *Localhost* or *127.0.0.1* as your hostname and address when making a connection within a container. Instead, use your docker service name. Docker uses the name of these services has the hostname in the docker host and maps that to the correct address assuming a network has been configured.
- The only time you should use localhost is when connecting to a container is via the host.
```bash
mysql -h 127.0.0.1 -u root -proot -P 3306
```
- MySQL needs a socket connection or a TCP connection.
the protocol option with correctly map localhost to 127.0.0.1.
```bash
mysql -h localhost --protocol=tcp -u root -proot -P 3306
```
- Avoid the mysql image 'mysql:latest' because of authentication changes and support is lacking.
- A 'Health Check' or a bash script that checks the status of mysql before starting your node application (dbwait-script.sh) is needed to insure your database is ready to start accepting connections. Read [here](https://docs.docker.com/compose/startup-order/ "here") for more infomation.

##### Example Node Connection.
```javascript
const db = mysql.createConnection({
    host: process.env.MYSQL_CONTAINER_NAME,
    port: process.env.MYSQL_PORT,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_ROOT_PASSWORD,
});
```
