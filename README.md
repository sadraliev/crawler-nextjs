# О проекте

[DEMO](https://crawler-nextjs.vercel.app/)

В этом проекте, решил применить архитектурный стиль "[Feature Sliced Design](https://feature-sliced.design/)". 

Для создания приложения использовал NEXT.JS 13
с использованием [App Router](https://nextjs.org/docs/app).

Мой выбор пал на NEXT.JS по нескольким причинам:
- SSR
- Полноценный фреймворк
- CRA больше не поддерживается

Обработкой данных и ее фильтрацией занимается NextJS на стороне сервера. 
Для обработки endpointов используется [API Handlers](https://nextjs.org/docs/app/building-your-application/routing/router-handlers)

Для получения данных на стороне клиента используется [SWR](https://swr.vercel.app/)

Директория `crawler` служит для парсинга данных с [вебсайта](https://www.regfile.ru/okved2.html).

# Быстрый старт
подготовка
- node v18
- npm v9.26.4
- react v18
- nextjs v13.0.7
- typescript v5.0.4
- tailwindcss v3.3.3
- puppeteer-core v^20.9.0

склонируйте репозиторий 
`git clone https://github.com/sadraliev/crawler-nextjs.git`

создайте файл `.env` и укажите следующие данные:
```bash
# название файла для спарсенных данных
NEXT_PUBLIC_FILE_PATH=''
# URL адрес сервера
NEXT_PUBLIC_BASE_URL='http://localhost:3000'
# URL адрес сайта, с которого нужно спарсить данные.
SCRAPE_URL='https://www.regfile.ru/okved2.html'
```

После чего установите все независимости и запустите приложение в development режиме:

- npm install --force
- npm run dev

# Preview branch
