# lightbnb

LightBnB is a lightweight AirBnB clone. Designed to aid learning in database connections and queries, basic SQL Injection attack defenses as well as dynamic search queries to a database.

## Set up

### Initial Repo Set up

- Clone this repo and create a local directory to store it
  - `git clone https://github.com/JCPenne/lightbnb.git lightbnb`
- `cd` into the `lightbnb` folder

### Database Set up

- Initialize a postgreSQL session
  - Within the lightbnb root directory initialize PSQL by running the command `psql`
  - Run the `CREATE DATABASE lightbnb` command to initialize the database
  - Ensure you are connected to the lightbnb database by running `\c lightbnb`
  - Your terminal should now read something similar to `"lightbnb=#"`
- Create all of the tables needed to house our data
  - While still connected to the lightbnb database, run the migration file `\i migrations/01-schema.sql` to create all tables
  - Check the tables have all been created correctly by running `\dt`
- Seed the created tables
  - Run the seed file `\i seeds/02-seeds.sql`
  - Ensure no errors have occured and the command ran to completion
- Check queries if desired
  - You can run any of the 5 pre-built queries by running the command `\i 1-queries/0X-foo.sql`
    _(Query files can be found in the /1-queries folder to see which # and file name is needed.)_

### Running Application

- `cd` into the `lightbnb/app` folder
- install any dependencies with `npm i`
- run `npm run local` to initiate the server
  - terminal should print `"Listening on port 3000"`
- In your preferred browser, navigate to `localhost:3000`
- You can now create an account, login, view or search for properties or create your own listing.

## ERD Screenshot

![ERD](/screenshots/Lightbnb-ERD.png 'LightBnB ERD')

## Dependencies

- bcrypt
- body-parser
- cookie-session
- express
- nodemon
- pg
