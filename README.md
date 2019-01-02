## Inkdome node challenge app

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

#### rankings
- `province`: string
- `style`: ObjectId, style \_id
- `tattooers`: array of objects, a list of tattooers that use a specific style and work in a specific province
  - `tattooer`: ObjectId, tattooer \_id
  - `ranking`: integer, used to sort tattoers based on how good they are. #1 in ranking is the best for that province/style
  
 

## Task 1: create a basic REST api
Create a basic REST api to handle the three collections (tattooers, styles and rankings). It doesn't need to be strictly RESTfull but it should handle the basic create, update and fetch operations.
1. add the mongoose models
2. add the basic express routes

- stretch goal 1: add basic authentication so that a key is necessary to access the data

## Task 2: search a tattooer
Add an endpoint to search tattooers based on province, style and color (black&white -> `bw: true`, colored tattoo -> `color: true`). The endpoint should return a list of tattooers that work in that province, that do black&white or colored tattooes, and that do tattoo for that style (a tattooer does a specific tattoo style if s/he has a ranking for such style).

- stretch goal 1: return tattooers ordered by ranking
- stretch goal 2: do not return tattooers that are not currently working in the requested province (`worksIn.enabled: false`)

## Task 3: discussion on mongo schema (optional)
The query in Task 2 can be complicated because it needs information from multiple collections. Can you propose some changes in the mongo schema that would simplify such query?

### What we're looking for
The main things we're looking for is a reasonable working solution and clearity of coding style.

### How to submit your solution
1. Create a branch off of master in this repository
2. Commit new code to this branch, and push the branch to origin
3. Create a Pull Request on GitHub to merge your branch to master
4. For task 3 (which is optional) simply add your thoughts on the Pull Request description or as a comment
