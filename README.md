# Node test app

This is a skeleton of a node.js basic app using:
- Express
- Babel
- Babel ESLint
- ES6 syntax

### How to start

    # Start the mongo instance
    ./start-docker-compose.sh

    # Start the server
    npm start


### Database structure

The provided database has 3 collections with the following structure:

#### tattooers
- `fullName`: string
- `email`: string
- `description` string
- `igLink`: string
- `image`: string
- `phone`: string
- `bw`: boolean, stands for 'Black & White' and indicates if the tattoo artist does black tattooes
- `color`: boolean, stands for 'Color' and indicates if the tattoo artist does color tattooes
- `worksIn`: array of objects, is a list of locations where the artists works:
  - `province`: string, province where the studio is
  - `enabled`: boolean, indicates if the artists is currently available at this location
  - `secondaryProvinces`: array of strings, a list of nearby provinces reachable by the artist

#### styles
- `name`: string
- `image`: string
- `description`: string
- `showName`: string

#### ranking
- `province`: string
- `style`: ObjectId, style \_id
- `tattooers`: array of objects, a list of tattooers that use a specific style and work in a specific province
  - `tattooer`: ObjectId, tattooer \_id
  - `ranking`: integer, used to sort tattoers based on how good they are. #1 in ranking is the best for that province/style
