# apollo-server-3-with-cache-redis

Working simple GraphQL Apollo Server 3 using Cache controls and Redis on localhost

This repo was taken from this sandbox https://codesandbox.io/s/8d4bp that is owned by https://codesandbox.io/u/leonardoanalista

I don't know much about sandboxes and if there is a github repo I should be linking to

But, the source here is upgraded from that sandbox to apollo version 3 and ioredis is added for caching with Redis

I have not found many examples of Apollo Server 3 out there so I thought I'd post one that is working (for me anyhow)


## Sample query:

```
mutation {
  loginUser(input: {  memberId: "123456789", password: "mypassword" }) {
  	access_token
    expires_in
  	membership {
      id
      firstName
      lastName
    }
  }
}
```
