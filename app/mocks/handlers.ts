import { rest } from 'msw'

export const handlers = [
  rest.post("https://frontend-take-home-service.fetch.com/auth/login", (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json('OK'),
    )
  }),
]