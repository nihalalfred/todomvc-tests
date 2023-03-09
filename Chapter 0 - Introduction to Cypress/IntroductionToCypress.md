# Introduction to Cypress

### **What is Cypress?**

It’s a test automation tool, similar to Selenium WebDriver, WebDriverIO, TestCafe, and others.

### ****But why is this tool generating so much interest?****

Because it’s different.

It’s different than the current king of the hill, which is Selenium. 

It’s not better, because it’s very difficult to be better than Selenium (or its derivatives, like WebdriverIO).

> ### **Test your code, not your patience**

_TODO: Add Image here_

### Why is it different?

1. **It’s JavaScript-only tool.**
    - very natural for frontend developers as frontend developers write only JavaScript.

2. **This tool is Chrome-only**
    - You can’t run your test in Firefox, or Safari. Definitely not in IE. *Chrome* only.

    - Again, natural for frontend developers, as they have long understood that all modern browsers today are mostly compatible. And from their point of view, you test in one browser, you test in all of them.

    - There are excepts but for that you write a small set of Selenium tests just to check the edge cases.

3. **This is not an automation tool - it’s a testing tool**
    - You can’t just write a script that automates things. It has to be a test.

    - And, by the way, the test runner is only Mocha.

    - It was built as a testing tool for frontend developers.
    
    - Not only comes with a test runner, but also with mocking capabilities, and lots of validation rules

4. **It’s fast!**
    - Developers don’t like test suites that take hours to run.

    - They want a tool that runs their tests, on their app, in a few minutes.

    - They made it fast it to make the test code itself run in the browser, just like the app code itself.

    - Once the test code runs in the browser, it can do automation things — like clicking, finding elements, and getting the text of an element — much faster than if they run out of process of the browser.

### It’s a wonderful tool to use, as long as you are aware of its limitations:

- Only JavaScript
- Only Chrome
- Only Mocha

### And like everything about Cypress, installation of it is also easy peasy!