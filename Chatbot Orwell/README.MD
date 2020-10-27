<div align="center">
  <h1>ORWELL | Chatbot</h1>
</div>

<div align="center">
  <strong>Chatbot para brindar soporte técnico básico de computadoras.</strong>
</div>

<h1 id="install" >Prerrequisitos</h1>
Antes de ejecutar este proyecto, necesitarás instalar en tu computadora software adicional.

## Python 3
El proyecto requiere de Python 3.6 o superior. Viene preinstalado una versión compatible con la mayoría de los sistemas Linux. Si no es el caso, consulte la documentación de su distribución y las instrucciones para la instalación de Python 3.6 o 3.7. 

## PostgreSQL
El proyecto necesita de PostgresSQL en la versión 9.4 o superior. Usa el siguiente link <a href="https://www.postgresql.org/download/">PostgreSQL download page</a> para seguir las instrucciones de instalación.


<h1 id="install" >Instalación</h1>

## Debian / Ubuntu
Debian 9.0 Stretch o superior, Ubuntu 16.04 Xenial o superior:

```sh
$ sudo apt-get install build-essential python3-dev python3-pip python3-cffi libcairo2 libpango-1.0-0 libpangocairo-1.0-0 libgdk-pixbuf2.0-0 libffi-dev shared-mime-info
```
#### 1. Clonamos el repositorio:

```sh
$ git clone https://github.com/osmarpb97/buro_django
```

#### 2. Entramos al directorio
```sh
 cd proyecto_is
```
#### 3. Instalar todas las dependencias:

Recomendamos altamente crear un entorno virtual antes de instalar cualquier paquete de Python.<br>
<b>Puede omitir este paso (no recomendado)</b>
```sh
 $ pip3 install virtualenv 
 $ virtualenv nombredelentorno
 $ source nombredelentorno/bin/activate
```

<b>Fin de creacion del entorno virtual.</b>

```sh
$ pip3 install -r requirements.txt
```
#### 4. Definir las variables de entorno. 
Intentamos de proporcionar valores predeterminados para todas las configuraciones. Hemos decidido no proporciona un valor predeterminado para SECRET_KEY ya que tememos que alguien inevitablemente envíe un proyecto con el valor predeterminado que queda en el código. 

Proporcionamos un script llamado variables.sh con el cual facilitamos la creación de las variables para realizar la configuración del proyecto, en dicho script asigne el valor de las variables de acuerdo a su configuración.

Ejemplo:
```sh

export SECRET_KEY='21jDSsa1221sadas'
export NAME='DB_NAME'
export USER='DB_USER'
export PASSWORD='DB_PASSWORD'
##Correo para envio de correos
export EMAIL_HOST_USER='Email'
export EMAIL_HOST_PASSWORD='Password email'

Finalmente guarda los cambios en el archivo y ejecuta el siguiente comando

```sh
$ ./variables.sh
```

## NOTA en caso de un reinicio de tu servidor deberas ejecutar nuevamente el script
#### 5. Instalar POSTGRES:

```sh
$ sudo apt-get install postgresql postgresql-contrib libpq-dev
$ libpq-dev
```
#### Crear la base de datos y usuario PostgreSQL :

```sh
$ sudo -u postgres createuser 'userDB' 
$ sudo -u postgres createdb 'nameDB'
$ sudo -u postgres psql
psql=# alter user 'userBD' with encrypted password '<SETPASSWORD>';
psql=# grant all privileges on database 'nameDB' to 'userDB' ;
```

#### 6. Asignar la misma contraseña que se asigno previamente en el paso anterior ##
```sh
$ sudo adduser uburo
$ python3 manage.py migrate
```
