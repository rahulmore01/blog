## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Note-- why we are using next-auth on login not on register, as register is normaly coded.
-- we know if for example we use google provider in our project, we dont need to create a register, google provide takes care of it as user is already there in the google database, we just have to varify if he is there.

        --same with normal register(not using any next-auth provider) as we used in this proj, we will have our registerd users in our mongodb databse like googles db, and when we login, user will be varified with mongodb database users and given entry.
