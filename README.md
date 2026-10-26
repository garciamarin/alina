# Alina Salzer Website

This is the official website for Alina Salzer, a professional translator. The website is hosted at [alina-salzer.de](https://alina-salzer.de) and is built using Next.js and Tailwind CSS.

## Getting started

Node 24. Then:

```
yarn
```

Add the DatoCMS read token to `.env.local`:

```
NEXT_PUBLIC_DATOCMS_API_TOKEN=your-read-token
```

```
yarn codegen
yarn dev
```

Open http://localhost:3000. The page reads its copy from DatoCMS, and `yarn codegen` writes the GraphQL types the app imports.

## Features

- Showcase Alina Salzer's translation services
- Provide information about Alina Salzer's background and expertise
- Contact form for inquiries and collaboration opportunities

## License

This project is licensed under the [MIT License](LICENSE).
