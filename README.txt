--NOTAS DEV--
1. El archivo package.json instala las librerias del proyecto
2. EL archivo server.js se corre cuando el demonio de mongo esta en ejecucion
3. El main es el archivo principal de index.html
4. La versio  de Angular es 1.0.2 
5. Para crear colecciones iniciales (configuracion del sistema), se debe usar un archivo json, el mismo debe ser cargado con el siguiente comando.
mongoimport --db bucon_db --collection bucon_ms --type json --file /Users/chelox/Desktop/BuCon/load_projects.json --jsonArray 