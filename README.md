# Ardent - Frontend (Dashboard)

## Project Description
Ardent is an all-you-need business partner, automating customer interaction while providing concise data related to your business in a simple dashboard. Aimed to help the management of small businesses, Ardent is both a culmination of a WhatsApp chat bot, and a business dashboard.

On one hand the chatbot intelligently communicates with your customers, answering queries as well as receives order and customer information. While on the other hand, the dashboard displays the received information regarding order details, and many other business related data, as well as perform many other functionalities. 

The application on the frontend is built using React.js which uses the CoreUI library to construct the dashboard, while integrating many Firebase products such as Firestore (database), Hosting (deployment), and Extensions (Twilio). Twilio (which is used to build the chatbot) itself is an incorporation of many services such as Autopilot (NLP), Functions and WhatsApp messaging API. Lastly the application also has a CI/CD pipeline which is handled by GitHub actions.

- [Watch Project Pitch]()
- [Watch Project Demo]()

> Note: The following installation focuses on running the frontend of the application. Click [here](https://github.com/Zainab-Fahim/ardent-partner/tree/main/ardent-chat-bot#readme) to checkout the process to run the chatbot.

## What you need

To run this repo you will need to have:

### Firebase Setup
1. Create a firebase project
2. Create a firestore database with three collections, namely: `customer`(1), `product`(2), `order`(3) 
3. Fill in with temparory values as you create a starting document for each collection with the following fields
- customer
   - contact
   - name
- product
    - description
    - measurement
    - name
    - price
    - status
- order
    - customer
      - contact
      - name
    - item [items field is an array of objects which contains the following keys]
      - measurement
      - name
      - price
      - quantity
    - status
    - timepoint
      - date
      - time
    - total
    - type
 
4. Get the firebase credentials for the specifics of your project from the project settings (you will find it at the end of the page, with npm selected as your SDK setup), and replace the contents of `ardent-partner/src/firebase.js` with that of your project credentials. 

## How to run

Clone the repo and change into the new directory:

```bash
git clone https://github.com/Zainab-Fahim/ardent-partner.git
cd ardent-partner
```

Install the dependencies:

```bash
npm install
```

With all that prepared, start the application with:

```bash
npm start
```
