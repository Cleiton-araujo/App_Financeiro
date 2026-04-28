# Deploy no Render

Guia para colocar o App Financeiro no ar usando Render (plano gratuito).

## Passo 1: Criar conta no Render

1. Acesse https://render.com
2. Clique em **Sign Up** e crie uma conta (pode usar GitHub)

## Passo 2: Criar um repositrio Git

O Render precisa que o cdigo esteja no GitHub. Se ainda no fez:

```bash
git init
git add .
git commit -m "App Financeiro pronto para deploy"
```

Crie um repositrio no GitHub e envie:
```bash
git remote add origin https://github.com/SEU-USUARIO/app-financeiro.git
git branch -M main
git push -u origin main
```

## Passo 3: Criar o Banco de Dados PostgreSQL

1. No dashboard do Render, clique em **New +**
2. Selecione **PostgreSQL**
3. Configure:
   - **Name**: `app-financeiro-db`
   - **Database**: `appfinanceiro`
   - **User**: `appfinanceiro`
   - **Region**: Escolha a mais prxima (Frankfurt para Europa, Ohio para Amrica)
   - **Plan**: **Free**
4. Clique em **Create Database**
5. Aguarde a criao (pode levar alguns minutos)
6. Anote a **Internal Database URL** (vamos usar no prximo passo)

## Passo 4: Criar o Web Service

1. No dashboard do Render, clique em **New +**
2. Selecione **Web Service**
3. Conecte seu repositrio do GitHub
4. Configure:
   - **Name**: `app-financeiro`
   - **Region**: Mesma do banco de dados
   - **Branch**: `main`
   - **Runtime**: `Node`
   - **Build Command**: `npm install && npm --prefix frontend install && npm run build`
   - **Start Command**: `node app.js`
   - **Plan**: **Free**
5. Em **Environment Variables**, adicione:
   - `DATABASE_URL`: Cole a Internal Database URL do banco criado no passo 3
6. Clique em **Create Web Service**

## Passo 5: Aguardar o Deploy

1. O Render vai fazer o build automaticamente
2. Aguarde os logs mostrarem `App rodando na porta 10000` (ou outra porta)
3. Acesse a URL fornecida pelo Render (ex: `https://app-financeiro.onrender.com`)

## Manuteno

- O plano gratuito do Render "dorme" aps 15 minutos de inatividade
- A primeira requisio aps inatividade pode levar 30-60 segundos para "acordar"
- O banco de dados gratuito expira em 90 dias (precisa recriar)

## Para atualizar

Sempre que fizer alteraes no cdigo:
```bash
git add .
git commit -m "Descrio da alterao"
git push origin main
```
O Render faz o deploy automaticamente!

