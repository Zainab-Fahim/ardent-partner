//$ npm install --save firebase-admin
var admin = require("firebase-admin");
var serviceAccount = require("../assets/ardent-partner-firebase-adminsdk-4ye2u-9191a9b66a.protected.json");
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});
const db= admin.firestore();

exports.handler = async (context, event, callback) => {
  // get customer number
  const memory = JSON.parse(event.Memory);
  const user = memory.twilio.chat
    ? memory.twilio.chat
    : memory.twilio["messaging.whatsapp"];
  let userId;  
  if(user.From!=''){
    userId = user.From.split(":")[1];
  } else{
    userId=user.From
  }

  // get product lists 
  const productRef = db.collection('product');
  let menuList=[];
  let shelfList=[];
  let allList=[]
  const productsnapshot = await productRef.get();
  productsnapshot.forEach(doc => {
    if(doc.data().status=='menu'){
      menuList.push(doc.data());
    }else{
      shelfList.push(doc.data());
    }
  });

  allList=menuList.concat(shelfList);
  // all list formatted
  const all_formatted=`Here are all the items you can order from EasyAsPie\n\n${allList.map((item, index)=> {if(index<menuList.length){return `*(${index+1})* -> ${item.name} : $${item.price} per ${item.measurement}\n`;}else if (index==menuList.length){return `\n\n_Please note that orders selected from the above menu list will be ready after *10-24 Hours*._\n_Orders selected from only the below list will be available for pickup *immediately*_\n\n*(${index+1})* -> ${item.name} : $${item.price} per ${item.measurement}\n`;}else{return (`*(${index+1})* ->  ${item.name} : $${item.price} per ${item.measurement}\n`);}})}`

  const response = {
    actions: [
      {
        say: `${all_formatted}`,

      },
      {
        collect: {
          name: "order_details",
          questions: [
            {
              question: "Please send the relavant item number, to choose the item.",
              name: "item_name",
              type: "Twilio.NUMBER",
            },
            {
              question:`How many of the item would you'd like to order?`,
              name: "item_quantity",
              type: "Twilio.NUMBER",
            },
          ],
          on_complete: {
            redirect: {
              method: "POST",
              uri: `https://${context.DOMAIN_NAME}/confirm`,
            },
          },
        },
      }
    ],
  };
  callback(null, response);
};