# Chapter 1 - Setting up Cypress

<img src="https://github.com/nihalalfred/todomvc-tests/blob/main/screenshots/SettingUpCypress1.png" height="600" width="1000" >

## ****Installation Prerequisites****

- **NodeJS** *(Any version ≥8+ should be good)*
    - Link to [download](https://nodejs.org/en/download/)
    - Already installed? Check in terminal using cmd
        
        `node --version`
        
- Editor or IDE → **Visual Studio Code** (has excellent support for JavaScript)

- **NPM**
    - Cypress is an NPM package
    - NPM packages are installed locally in the same folder as the test code itself.


### What is NPM?

It’s JavaScript’s package manager.

- If you come from Java, it’s the equivalent of Maven
- If you’re from Python, then it’s like PyPi
- Ruby has Gems
- C# has NuGet

> NPM comes built-in with NodeJS, so you don’t have to install it.

## Creating package.json

Open a terminal in VS Code and run the following command
    

    npm init -y

    
This will create a package.json which initialises the folder to be ready for `npm commands`.

<img src="https://github.com/nihalalfred/todomvc-tests/blob/main/screenshots/SettingUpCypress2.png" height="600" width="1000" >


## Installing Cypress

When we install cypress, NPM needs to register the fact that Cypress is installed in our test folder, and it does so inside our `package.json`. 

This is why we need the package.json, and which is why we ran `npm init -y`

- To install Cypress, run the following command in the terminal.

    ```
    npm install cypress@3	
    ```

- We use @3 to get the version 3 of cypress

- If you don’t mention any @. it will always install the latest version of cypress.

## Running Cypress

Use the following command in the terminal to open cypress


    npx cypress open
    
    
Once you run this command it should open the UI, and will  create a folder structure for us as below:

<img src="https://github.com/nihalalfred/todomvc-tests/blob/main/screenshots/SettingUpCypress3.png" height="600" width="1000" >

It will also create a folder called “cypress” with lots of subfolders inside it.

<img src="https://github.com/nihalalfred/todomvc-tests/blob/main/screenshots/SettingUpCypress4.png" height="600" width="1000" >

The most important folder is “integration” — this is where we would be writing out tests.

<img src="https://github.com/nihalalfred/todomvc-tests/blob/main/screenshots/SettingUpCypress5.png" height="600" width="1000" >

Please Note: We won't be needing the examples folder as we would be writing our own tests so we are going to delete this folder so it won't distract us.

