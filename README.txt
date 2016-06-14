--NOTAS DEV--
1. El archivo package.json instala las librerias del proyecto
2. EL archivo server.js se corre cuando el demonio de mongo esta en ejecucion
3. El main es el archivo principal de index.html
4. La versio  de Angular es 1.0.2 
5. Para crear colecciones iniciales (configuracion del sistema), se debe usar un archivo json, el mismo debe ser cargado con el siguiente comando.
mongoimport --db bucon_db --collection bucon_ms --type json --file /Users/chelox/Desktop/BuCon/load_projects.json --jsonArray 

--GIT--
1.https://help.github.com/articles/adding-an-existing-project-to-github-using-the-command-line/
2.git init (Inicializa el repositorio GIT, previamente debe configurarse usuario, email, colors)
3.git add . (Adiciona al stage todos los archivos del directorio actual)
4.git commit -m "Primer commit " (Hace commit de los archivos del stage(index) al repositorio local)
5.git remote add origin <url_remote_repository> (Creamos una cuenta en GitHub (cheloxGit), copiamos la ruta para añadirla a la configuracion)
6.git push origin master (Hace un push de los cambios del repositorio local al repositorio remoto de Git)
