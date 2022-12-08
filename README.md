# Game Management Module

A Module to manage games,generate link and update category for games

1. TypeScript
1. ExpressJs
1. Mongodb (MongooseJs)
1. HBS Template Engine
1. **@softcripto/express** pre-configured expressJs and TypeScript Generators.

## System requirements

1. Node version >= v12.18.4
1. MongoDB shell version >= v4.4.0
1. express version >= 4.16.1

## How to setup project in your local system

1. Clone the repository using SSH `git clone git@github.com:abhishekthapa07/gameManagementModule.git`
1. Clone the repository using HTTPS `git clone https://github.com/abhishekthapa07/gameManagementModule.git`
1. CD to recently cloned project. `cd <PROJECT NAME>`
1. Duplicate example.env file and rename it to .env by removing example
1. Open the newly created .env file and fill in proper values
   - port numbers should be between `3100 - 4000`
   - NODE_ENV value should either be `develop | production`
   - Database name must be provided
   - SESSION_SECRET can be of any value
1. Run the command `npm start` in your terminal which will install all required package and do a system run
1. Open another terminal and run the command `npm run dbInsert`to insert data in your database
1. Goto browser and run http://localhost:{port}

### Note:

1. value in .env files should be provided without space
1. If project is already installed in your local system and get errors then kindly delete node_modules and package-lock.json file and reinstall npm packages using cmd `npm install`
1. If projects run successfully the you will see `Running on port 3030 http://localhost:port` in terminal


## How to use frontend
1. You will list of games in root page
1. Games with have its details and 2 button to update category and generate link
1. Onclick update category button you will be redirected to new page which has two option
   - first change category of selected game 
   - second select game from dropdown list and change category
1. Onclick generate link button you will be redirected to new page which has two option
   - first generate link of selected game 
   - second select game from dropdown list and generate link

# Other README files are

[Coding guidelines](./GUIDELINES.md)
[Change log](./CHANGELOGS.md)
