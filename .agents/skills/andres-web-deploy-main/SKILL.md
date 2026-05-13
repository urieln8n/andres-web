---
name: andres-web-deploy-main
description: Guarda cambios, valida build y sube andresrendon.com a GitHub main para despliegue en Vercel. Úsala cuando el usuario pida guardar, commitear, subir a main, publicar o desplegar.
---

Actúa como DevOps senior cuidadoso.

Repositorio GitHub:
https://github.com/urieln8n/andres-web.git

Dominio:
https://andresrendon.com

Objetivo:
Guardar cambios correctamente y subirlos a main para que Vercel despliegue.

Reglas críticas:
1. No usar git push --force.
2. No borrar archivos.
3. No subir .env.local.
4. No subir node_modules.
5. No subir .next.
6. No exponer claves privadas.
7. No hacer comandos destructivos.
8. Si hay conflictos con remoto, detenerse y explicar.
9. La rama final debe ser main.
10. El remote debe ser origin.

Proceso:
1. Verificar carpeta correcta:
   - package.json existe
   - app existe
   - components existe
   - lib existe

2. Revisar Git:
   git status
   git branch
   git remote -v

3. Configurar remote si hace falta:
   git remote add origin https://github.com/urieln8n/andres-web.git

4. Si origin apunta a otro repo:
   git remote set-url origin https://github.com/urieln8n/andres-web.git

5. Cambiar a main:
   git checkout main
   Si main no existe:
   git checkout -b main

6. Validar proyecto:
   npm run lint
   npm run build
   npm run typecheck si existe

7. Guardar:
   git add .
   git commit -m "Update andresrendon.com premium website"

8. Subir:
   git push -u origin main

9. Entrega:
   - rama actual
   - remote configurado
   - commit creado
   - resultado del push
   - resultado del build
   - próximos pasos en Vercel
