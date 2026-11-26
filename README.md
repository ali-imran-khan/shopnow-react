# shopnow-react

E-commerce front end in React, made for the Web Technologies course (CSC-336) at COMSATS Lahore. Product and user data come from [Fake Store API](https://fakestoreapi.com/).

- product grid, product detail page and a cart
- login against the Fake Store auth endpoint. The JWT is kept in `localStorage` and attached to requests by an axios instance
- user list / single user / add user pages (CRUD against the API)
- contact page, shared layout with navbar and footer, CSS modules per component
- React Router v6

```
npm install
npm start      # http://localhost:3000
```

## Notes

- Fake Store API doesn't persist writes. Adding a user returns a fake id, but nothing is saved.
- The `/dashboard` vs `/login` route is chosen once on load from `localStorage`, so you need a refresh after logging in.
- `package.json` still lists a few packages left over from experiments (`draft-js`, `recordrtc`, `react-beautiful-dnd`) that the app doesn't use.
